import {
  Component,
  OnInit,
  ViewChild,
  PipeTransform,
  OnDestroy
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { of, Subscription } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/es';

import {
  IQuotesRequest,
  IQuotesResponse,
  IQuotesUnderwritersRequest,
  IQuotesUnderwritersResponse,
  QuotesService,
  UtilService,
  DocumentationService
} from '@sura-platform/features';
import { NotificationService } from '@sura-platform/core/services/notification.service';
import { columnMode } from '@sura-platform/web';
import * as fromEmission from '../../../quoting/components/emission/state';
import * as fromEmissionActions from '../../../quoting/components/emission/state/emission.actions';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromProducer from '../../../producer/state';
import * as fromProducerActions from '../../../producer/state/producer.actions';
import * as fromPolicy from '../../../quoting/state/policy';
import * as fromPolicyActions from '../../../quoting/state/policy/policy.actions';
import * as fromQuote from '../../../quoting/components/quote/state';
import * as fromQuoteActions from '../../../quoting/components/quote/state/quote.actions';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CurrencyPipe, LogService } from '@sura-platform/core';
import { viewsQuotes } from './quotes.enum';
import { lineGroup } from './../../../quoting/containers/line.enum';
import { environment } from '@sura-platform/apps/web-producer/src/environments/environment';
import { DatatableComponent } from '@swimlane/ngx-datatable';

class DateFormat extends DatePipe {
  public transform(value: any): any {
    return super.transform(value, 'dd.MM.yyyy');
  }
}

class CurrencyFormat extends CurrencyPipe {
  public transform(value: any): string {
    return super.transform(value, '$', 0, '.');
  }
}

class DaysAgo implements PipeTransform {
  serverDate: any;
  constructor(private date: any) {
    this.serverDate = localStorage.getItem('date');
    if (this.serverDate === null) {
      this.serverDate = this.date;
    }
  }
  transform(date: string): string {
    moment.locale('es');
    return moment(date).from(
      moment(this.serverDate).subtract(15, 'days'),
      true
    );
  }
}

@Component({
  selector: 'sxf-queries-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  @ViewChild('quotesTable', { static: false }) table?: DatatableComponent;

  datatable_header?: HTMLDivElement;

  datatable_body?: HTMLDivElement;

  datatable_footer?: HTMLDivElement;

  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    autoplay: true,
    loop: true
  };

  suraLoaderConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  inputLoaderConfig: AnimationOptions = {
    path: '/assets/loadings/inside-inputs-loader.json'
  };

  animation: AnimationItem = {} as AnimationItem;

  lineEnumGroup = lineGroup;
  ACTIVE = 1;
  PENDING = 2;
  REJECTED = 3;
  COTIZACIONES = 'cotizaciones';
  SOLICITUDES = 'solicitudes';
  loadingIndicator = false;
  loadingDetails = false;
  selectedQuote: any;
  quotesRequest: IQuotesRequest = {} as IQuotesRequest;
  uwRequest: IQuotesUnderwritersRequest = {} as IQuotesUnderwritersRequest;
  uwResponse: IQuotesUnderwritersResponse[] = [];
  rows: IQuotesResponse[] = [];
  statusTranslate = {
    withoutUWissues: 'Guardada',
    approved: 'Aprobada',
    pendingApproval: 'Pendiente',
    rejected: 'Rechazada'
  };

  rActive: any[] = [];
  rPending: any[] = [];
  rRejected: any[] = [];

  quotesStatus = [
    {
      name: 'Activas',
      code: this.ACTIVE,
      qty: 0
    },
    {
      name: 'Pendientes',
      code: this.PENDING,
      qty: 0
    },
    {
      name: 'Rechazadas',
      code: this.REJECTED,
      qty: 0
    }
  ];

  type: FormControl = new FormControl();
  typeOptions = [
    {
      code: this.COTIZACIONES,
      description: 'Cotizaciones'
    },
    {
      code: this.SOLICITUDES,
      description: 'Solicitudes'
    }
  ];

  // Quotes `Activas` by default
  quoteStatusActive: any = this.ACTIVE;

  temp: any[] = [];

  columns = [
    {
      name: 'Fecha',
      prop: 'updatetime',
      sortable: true,
      // TODO: LA: Provisional mientras se soluciona tomar el serverDate desde el storage
      // pipe: new DateFormat('en-US')
      pipe: null
    },
    {
      name: 'Vto',
      prop: 'updatetime',
      sortable: true,
      // TODO: LA: Provisional mientras se soluciona tomar el serverDate desde el storage
      // pipe: new DaysAgo(sDate)
      pipe: null
    },
    { name: 'Nombre', sortable: false, prop: 'client.displayname' },
    { name: 'DNI', sortable: false, prop: 'client.primaryofficialid.value' },
    { name: 'N° Transaction', sortable: false, prop: 'job.number' },
    { name: 'Cod Productor', sortable: false, prop: 'producer.code' },
    // { name: 'Productor', sortable: false, prop: 'producer.description' },
    {
      name: 'Premio Total',
      sortable: false,
      prop: 'costs.total',
      pipe: new CurrencyFormat()
    }
  ];

  ColumnMode = columnMode;

  // Producer seleted from sxf-select
  codeProducer = '';
  quotesResponse: any;

  /**
   * Subscription to notification service
   *
   * @type {Subscription}
   * @memberof QuotesComponent
   */
  notificationSubscription: Subscription = new Subscription();

  /**
   * Indicates if the quote is being downloaded
   *
   * @memberof QuotesComponent
   */
  isQuoteDownload = false;

  /**
   * Indicates if continue to emision is active
   *
   * @memberof QuotesComponent
   */
  isGoToEmision = false;

  /**
   * Indicates if the quote donwload ok
   *
   * @memberof QuotesComponent
   */
  isQuoteDownloadOk = false;

  // TODO: LA solo para habilitar botón de Hogar mientras
  // no esté preparado para producción
  env = environment.env;

  constructor(
    private quotesService: QuotesService,
    private storeEmission: Store<fromEmission.State>,
    private storeProducer: Store<fromProducer.State>,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private utilService: UtilService,
    private notifyService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private documentationService: DocumentationService,
    private logService: LogService
  ) {}

  ngOnInit() {
    const defaultView = this.route.snapshot.paramMap.get('view');
    let typeValue = this.COTIZACIONES; // Se establece por defecto cotizaciones

    this.storeQuote.dispatch(new fromQuoteActions.ResetQuoteAction());
    this.storePolicy.dispatch(new fromPolicyActions.ResetPolicyAction());
    this.storeEmission.dispatch(new fromEmissionActions.ResetEmissionAction());

    if (
      defaultView !== null &&
      +defaultView === viewsQuotes.COTIZACIONPENDIENTE
    ) {
      typeValue = this.COTIZACIONES;
      this.quoteStatusActive = this.PENDING;
    } else if (
      defaultView !== null &&
      +defaultView === viewsQuotes.SOLOCITUDPENDIENTE
    ) {
      typeValue = this.SOLICITUDES;
      this.quoteStatusActive = this.PENDING;
    }

    this.type = new FormControl('');
    this.type.valueChanges.subscribe(() => {
      this.getQuotes(this.quoteStatusActive);
    });
    this.type.setValue(typeValue, { emitEvent: true });

    this.notificationSubscription = this.notifyService.notification$.subscribe(
      () => {
        if (this.selectedQuote) {
          this.selectedQuote.loading = false;
          this.selectedQuote = undefined;
          this.isGoToEmision = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.notificationSubscription)
      this.notificationSubscription.unsubscribe();
  }

  getQuotes(statusCode: number) {
    this.rows = [];
    this.loadingIndicator = true;
    const serverDate = localStorage.getItem('date');
    if (serverDate === null) {
      this.utilService.getCurrentServerDate().subscribe((data) => {
        const sDate = data.datetime;

        // Guardo en el store la fecha
        this.storeQuote.dispatch(
          new fromQuoteActions.SetServerDateAction(new Date(sDate))
        );

        // TODO: LA: Provisional mientras se soluciona tomar el serverDate desde el storage
        this.columns.splice(
          0,
          2,
          {
            name: 'Fecha',
            prop: 'updatetime',
            sortable: true,
            pipe: new DateFormat('en-US')
          },
          {
            name: 'Vto',
            prop: 'updatetime',
            sortable: true,
            pipe: new DaysAgo(sDate)
          }
        );
        this._getQuotes(statusCode, sDate);
      });
    } else {
      // Guardo en el store la fecha
      this.storeQuote.dispatch(
        new fromQuoteActions.SetServerDateAction(new Date(serverDate))
      );

      // TODO: LA: Provisional mientras se soluciona tomar el serverDate desde el storage
      this.columns.splice(
        0,
        2,
        {
          name: 'Fecha',
          prop: 'updatetime',
          sortable: true,
          pipe: new DateFormat('en-US')
        },
        {
          name: 'Vto',
          prop: 'updatetime',
          sortable: true,
          pipe: new DaysAgo(serverDate)
        }
      );
      this._getQuotes(statusCode, serverDate);
    }
  }

  private _getQuotes(statusCode: number, serverDate: any) {
    this.quoteStatusActive = +statusCode;
    const active = ['withoutUWissues', 'approved'];
    const pending = ['pendingApproval'];
    const rejected = ['rejected'];
    this.rows = [];

    this.quotesRequest = {
      policytype: 'Submission',
      uwstatus: null,
      datesince: moment(serverDate).subtract(15, 'days').toISOString(),
      dateuntil: serverDate,
      productcode: null,
      producer: {
        code: null
      },
      client: {
        primaryofficialid: {
          type: null,
          value: null
        },
        firstname: null,
        lastname: null,
        companyname: null
      }
    };

    // this.loadingIndicator = true;

    this.quotesService
      .getQuotes(this.quotesRequest)
      .pipe(
        switchMap((quotes) => {
          if (quotes) {
            return of(
              quotes.filter((quote) => {
                // Filtrando por productor
                // TODO: Descomentar cuando se active el select de productor
                // if (Number(quote.producer.code) === Number(this.codeProducer)) {
                //TABLA PARA FILTROS
                // Estado Job     Estado UW          Descripcion
                // =============================================================
                // Borrador       withoutUWissues    No mostrar
                // Borrador       pendingApproval    Cotizacion con UW pendiente
                // Borrador       approved           Cotizacion con UW aprobada
                // Borrador       rejected           Cotizacion con UW rechazada
                // Cotizado       withoutUWissues    Cotizacion guardada
                // Cotizado       pendingApproval    Solicitud con UW pendiente
                // Cotizado       approved           Solicitud con UW aprobada
                // Cotizado       rejected           Solicitud con UW rechadaza
                // Contratada                        Poliza
                // Si tiene FLAG 'solicitud' === true entonces es Poliza

                // Es una cotización
                if (this.type.value === this.COTIZACIONES) {
                  // Es borrador (no se debe mostrar)
                  const borrador =
                    quote.job.status === 'Borrador' &&
                    quote.uwstatus === 'withoutUWissues'
                      ? true
                      : false;

                  return !quote.solicitud && !quote.policynumber && !borrador;
                }

                // Es una solicitud
                if (this.type.value === this.SOLICITUDES) {
                  return quote.solicitud && !quote.policynumber;
                }
              })
            );
          } else {
            this.loadingIndicator = false;
            return of(null);
          }
        }),
        filter((i: any) => i !== null),
        map((quotes: any[]) => {
          // Por issue en ngx-datatables se debe hacer este workaround
          this.rActive = [];
          this.rPending = [];
          this.rRejected = [];

          quotes.forEach((quote: any) => {
            // Si es una solicitud y tiene inspección pendiente va a Pendientes
            if (
              this.type.value === this.SOLICITUDES &&
              quote.hasOwnProperty('inspection') &&
              quote.inspection.pending === true
            ) {
              this.rPending.push(quote);
            } else if (active.includes(quote.uwstatus)) {
              this.rActive.push(quote);
            } else if (pending.includes(quote.uwstatus)) {
              this.rPending.push(quote);
            } else if (rejected.includes(quote.uwstatus)) {
              this.rRejected.push(quote);
            }
          });
          // Por issue en ngx-datatables se debe hacer este workaround
          if (this.quoteStatusActive === this.ACTIVE) {
            this.rows = [...this.rActive];
          }
          if (this.quoteStatusActive === this.PENDING) {
            this.rows = [...this.rPending];
          }
          if (this.quoteStatusActive === this.REJECTED) {
            this.rows = [...this.rRejected];
          }

          this.quotesStatus[0].qty = this.rActive.length;
          this.quotesStatus[1].qty = this.rPending.length;
          this.quotesStatus[2].qty = this.rRejected.length;
          this.temp = this.rows;
          this.loadingIndicator = false;

          // MANEJAR EL SOMBREADO DEL FOOTER Y HEADER UNA VEZ CARGADO LOS DATOS
          setTimeout(() => {
            this.handleShadowInDatatable();
          }, 100);
        })
      )
      .subscribe();
  }

  onContactUsClick() {
    this.logService.feedback();
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (
        (d.client.displayname !== undefined &&
          d.client.displayname.toLowerCase().indexOf(val) !== -1) ||
        (d.client.primaryofficialid.value !== undefined &&
          d.client.primaryofficialid.value.indexOf(val) !== -1) ||
        !val
      );
    });

    // update the rows
    this.rows = temp;
  }

  toggleExpandRow(row: any, expand: boolean) {
    if (!expand) {
      this.table?.rowDetail.collapseAllRows();
      this.getUW(row.job.number);
    }

    this.table?.rowDetail.toggleExpandRow(row);
  }

  getSelectedProducer($event: any) {
    this.codeProducer = $event;
    this.getQuotes(this.quoteStatusActive);
  }

  getUW(job: string) {
    const uwJob: IQuotesUnderwritersRequest = {
      job: {
        number: job
      }
    };
    this.loadingDetails = true;
    this.quotesService.getQuotesUnderwriters(uwJob).subscribe((data) => {
      this.uwResponse = data;
      this.loadingDetails = false;
    });
  }

  setCurrentProducer(producer: any) {
    this.storeProducer.dispatch(
      new fromProducerActions.SetCurrentProducerAction(producer)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentProducerAction(producer)
    );
  }

  setCurrentProducerProfile(profile: any) {
    this.storeProducer.dispatch(
      new fromProducerActions.SetCurrentProducerProfile(profile)
    );
  }

  goToEmission(policy: any) {
    this.selectedQuote = policy;
    policy.loading = true;
    this.isGoToEmision = true;

    this.storePolicy.dispatch(new fromPolicyActions.ResetPolicyAction());
    this.storeEmission.dispatch(new fromEmissionActions.ResetEmissionAction());

    this.storeEmission.dispatch(
      new fromEmissionActions.SetJobNumberFromQuotesAction(policy.job.number)
    );

    this.storeQuote.dispatch(new fromQuoteActions.SetCurrentLine('motor'));

    if (policy.solicitud && policy.uwstatus === 'approved') {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetApprovedEmissionAction(true)
      );
    } else if (policy.uwstatus === 'approved') {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetApprovedQuoteAction(true)
      );
    }
    this.router.navigateByUrl('/quoting/emission/questions/client');
  }

  goToQuote(line: any) {
    if (line === this.lineEnumGroup.MOTOR) {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetActiveRouteMotor('motor/1/patent')
      );
      this.storeQuote.dispatch(new fromQuoteActions.SetCurrentLine('motor'));
      this.router.navigateByUrl('/quoting/quote/questions/motor/1/patent');
    } else if (line === this.lineEnumGroup.HOME) {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetActiveRouteHomeAction('home/1/zones')
      );
      this.storeQuote.dispatch(new fromQuoteActions.SetCurrentLine('home'));
      this.router.navigateByUrl('/quoting/quote/questions/home/1/zones');
    }
  }

  animationHandler(e: AnimationItem) {
    e.playSegments([[0, 119]]);
  }

  downloadQuote(policy: any) {
    policy.loading = true;
    this.isQuoteDownload = true;

    this.documentationService
      .getVehicleQuote(policy.job.number)
      .subscribe((data) => {
        const linkSource = 'data:application/pdf;base64,' + data.streambase64;
        const downloadLink = document.createElement('a');
        const fileName = data.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });

    this.documentationService
      .getVehicleProducerQuote(policy.job.number)
      .subscribe((data) => {
        const linkSource = 'data:application/pdf;base64,' + data.streambase64;
        const downloadLink = document.createElement('a');
        const fileName = data.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        this.isQuoteDownloadOk = true;
        setTimeout(() => {
          this.isQuoteDownloadOk = false;
          policy.loading = false;
        }, 3000);
        this.isQuoteDownload = false;
      });
  }

  /**
   * On datatable scroll event
   *
   * @memberof QuotesComponent
   */
  onDatatableScroll(): void {
    this.handleShadowInDatatable();
  }

  /**
   * Handle shadow in datatable
   *
   * @memberof QuotesComponent
   */
  handleShadowInDatatable(): void {
    if (!this.datatable_footer)
      this.datatable_footer = document.querySelector(
        '.datatable-footer'
      ) as HTMLDivElement;

    if (!this.datatable_body)
      this.datatable_body = document.querySelector(
        '.datatable-body'
      ) as HTMLDivElement;

    if (!this.datatable_header)
      this.datatable_header = document.querySelector(
        '.datatable-header'
      ) as HTMLDivElement;

    // Sombra superior
    if (this.datatable_body.scrollTop === 0) {
      this.datatable_header.classList.remove('shadow');
    } else {
      this.datatable_header.classList.add('shadow');
    }

    // Sombra inferior
    if (
      this.datatable_body.scrollTop + this.datatable_body.clientHeight ===
      this.datatable_body.scrollHeight
    ) {
      this.datatable_footer.classList.remove('shadow');
    } else {
      this.datatable_footer.classList.add('shadow');
    }
  }
}
