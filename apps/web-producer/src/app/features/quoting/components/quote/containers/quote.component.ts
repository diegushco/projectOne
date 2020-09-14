import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IVehicle, UtilService } from '@sura-platform/features';
import { BaseComponent } from '@sura-platform/core';
import { IRoutes } from '../../../interfaces/routes.interface';
import { Store } from '@ngrx/store';
import { ModalComponent } from '@sura-platform/web';
import { ActivatedRoute } from '@angular/router';
import { lineGroup } from '../../../containers/line.enum';
import { combineLatest, Subscription } from 'rxjs';
import { switchMap, first, withLatestFrom } from 'rxjs/operators';
import { MOTOR_CONF } from '../../motor/motor.config';
import moment from 'moment';

import * as fromQuote from '../../quote/state';
import * as fromQuoteActions from '../../quote/state/quote.actions';
import * as fromPolicy from '../../../state/policy';
import * as fromPolicyActions from '../../../state/policy/policy.actions';
import * as fromProducer from '../../../../producer/state';

@Component({
  selector: 'sxf-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent extends BaseComponent implements OnInit, OnDestroy {
  /**
   * Error modal
   *
   * @type {ModalComponent}
   * @memberof QuoteComponent
   */
  @ViewChild('errorQuote') errorQuoteModal?: ModalComponent;

  /**
   * Current line
   */
  line?: string;

  /**
   * Current motor
   */
  currentMotor?: IVehicle;

  /**
   * Current quote routes
   */
  routes: IRoutes[] = [];

  /**
   * Active subscriptions
   */
  activeSubscriptions: Subscription[] = [];

  /**
   * Technical pricing status
   */
  technicalPricing = false;

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private storeProducer: Store<fromProducer.State>,
    private utilService: UtilService,
    private route: ActivatedRoute
  ) {
    super();
  }

  /**
   * Initialize the component
   *
   * @memberof QuoteComponent
   */
  ngOnInit(): void {
    // Verificar si posee o no technical pricing
    this.checkTechnicalPrice();

    // Cargar las rutas
    this.loadRoutes();

    this.loadPeriodAndDate();
  }

  /**
   * Destroy the component
   *
   * @memberof QuoteComponent
   */
  ngOnDestroy(): void {
    this.activeSubscriptions.forEach((subs) => subs?.unsubscribe());
  }

  /**
   * Function used to fill the policy period data
   *
   * @memberof QuoteComponent
   */
  loadPeriodAndDate(): void {
    const subscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPeriod),
      this.utilService.getCurrentServerDate()
    ]).subscribe(([policyPeriod, serverDate]) => {
      if (policyPeriod.start === null) {
        const currentDate = new Date(serverDate.datetime); // moment().add(9, 'month');
        const date = {
          start: currentDate,
          end: null,
          method: null,
          rate: currentDate
        };
        this.storePolicy.dispatch(new fromPolicyActions.SetPeriodData(date));
        this.storeQuote.dispatch(
          new fromQuoteActions.SetServerDateAction(currentDate)
        );
      }
    });

    this.activeSubscriptions.push(subscription);
  }

  /**
   * Listen producer data and enable or disable technical
   * pricing based on catalogs
   *
   * @memberof QuoteComponent
   */
  checkTechnicalPrice(): void {
    const subscription = combineLatest([
      this.storeProducer.select(fromProducer.getCurrentProducer),
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getActiveMotor)
    ]).subscribe(([producer, policy, activeMotor]) => {
      // TODO: CATALOGOS HARDCODEADOS - TECHNICAL PRICING
      const catalogHasTechnicalPricing = [3, 47].includes(
        producer?.profile?.catalogs?.motor
      );
      if (!catalogHasTechnicalPricing) {
        // Si no posee el catálogo necesario, deshabilito TP y salgo
        if (this.technicalPricing !== catalogHasTechnicalPricing) {
          this.technicalPricing = catalogHasTechnicalPricing;
          this.storeQuote.dispatch(
            new fromQuoteActions.SetTechnicalPricingAction(false)
          );
          this.loadRoutes();
        }
        return;
      }

      // Verificar si para el grupo de vehículo actual se debe
      // habilitar technical pricing
      const currentMotor = policy.motor.vehicles.find(
        (v) => v.number === activeMotor
      );

      if (currentMotor?.group) {
        const vehicleHasTechnicalPricing =
          MOTOR_CONF.find((group) => group.vehicleType === currentMotor.group)
            ?.technicalPricing.visible || false;

        if (this.technicalPricing !== vehicleHasTechnicalPricing) {
          this.technicalPricing = vehicleHasTechnicalPricing;
          this.storeQuote.dispatch(
            new fromQuoteActions.SetTechnicalPricingAction(
              vehicleHasTechnicalPricing
            )
          );
          this.loadRoutes();
        }
      }
    });

    this.activeSubscriptions.push(subscription);
  }

  /**
   * Define current line and load routes
   *
   * @memberof QuoteComponent
   */
  loadRoutes(): void {
    this.storeQuote
      .select(fromQuote.getCurrentLine)
      .pipe(
        first(),
        switchMap((currentLine) => {
          // Definir la línea de cotización actual (motor, hogar)
          // TODO: TIPADO INCORRECTO - VER QuoteReducer
          this.line = currentLine as string;

          // Según la línea, recuperar el ID actual
          if (currentLine === lineGroup.MOTOR) {
            return this.storeQuote
              .select(fromQuote.getActiveMotor)
              .pipe(first());
          } else {
            return this.storeQuote
              .select(fromQuote.getQuoteHomeActiveHome)
              .pipe(first());
          }
        })
      )
      // TODO: TIPADO INCORRECTO - Ver QuoteReducer
      .subscribe((active) => this.setRouteStore(active as number));
  }

  /**
   * Function used to load quote routes
   *
   * @param {number} currentId
   * @memberof QuoteComponent
   */
  setRouteStore(currentId: number): void {
    this.routes = [];

    const questionsRouteConfig = this.route.routeConfig?.children?.find(
      (r) => r.path === 'questions'
    );

    if (questionsRouteConfig) {
      questionsRouteConfig.children?.forEach((element) => {
        const path = String(element.path).replace(':id', String(currentId));

        if (path.length > 1 && this.line === element.data?.line) {
          const workRoute = {
            path: path,
            question: element.data?.question,
            show: element.data?.show,
            disabled: element.data?.disabled,
            car: currentId.toString(),
            value: element.data?.value,
            shortName: element.data?.shortName,
            visible: element.data?.visible,
            line: element.data?.line
          };

          // Visibilizo o oculto technical pricing
          if (path.includes('age')) {
            workRoute.visible = this.technicalPricing;
          }

          this.routes.push(workRoute);
        }
      });
    }

    // Cargar las rutas de MOTOR o HOME según corresponda
    if (this.line === lineGroup.MOTOR) {
      this.loadCurrentMotor();

      this.storeQuote.dispatch(
        new fromQuoteActions.SetRoutesMotor(this.routes)
      );
    } else if (this.line === lineGroup.HOME) {
      this.storeQuote.dispatch(new fromQuoteActions.SetRoutesHome(this.routes));
    }
  }

  /**
   * If current line is MOTOR, then load currentMotor
   *
   * @memberof QuoteComponent
   */
  loadCurrentMotor(): void {
    const subscription = this.storeQuote
      .select(fromQuote.getActiveMotor)
      .pipe(withLatestFrom(this.storePolicy.select(fromPolicy.getPolicyData)))
      .subscribe(([activeMotor, policy]) => {
        const currentMotor = policy.motor.vehicles.find(
          (v) => v.number === activeMotor
        );

        if (currentMotor) this.loadMotorRouteValues(currentMotor);
      });

    this.activeSubscriptions.push(subscription);
  }

  /**
   * Load all motor data in route values
   *
   * @param {IVehicle} vehicle
   * @memberof QuoteComponent
   */
  loadMotorRouteValues(vehicle: IVehicle): void {
    // Cálculo para technical pricing
    let age: string | undefined;
    if (vehicle.driver?.birth) {
      const birth = moment(vehicle.driver.birth);
      age = `${moment().diff(birth, 'years')} años`;
    }

    this.setValueQuestion('patent', vehicle.license || 'Pendiente');
    this.setValueQuestion('year', vehicle.year?.toString() || '');
    this.setValueQuestion('brand', vehicle.brand.description || '');
    this.setValueQuestion('model', vehicle.shortModel || '');
    this.setValueQuestion('version', vehicle.model.description || '');
    this.setValueQuestion('use', vehicle.useName || '');
    this.setValueQuestion('sum', vehicle.statedamount?.toString() || '');
    this.setValueQuestion('location', vehicle.zone.city || '');
    this.setValueQuestion('age', age || '');

    // Cargar rutas de MOTOR
    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));
  }

  /**
   * Update route values
   *
   * @param {string} step
   * @param {(string | null)} [value]
   * @param {boolean} [disabled]
   * @memberof QuoteComponent
   */
  setValueQuestion(step: string, value: string, disabled?: boolean): void {
    const route = this.routes.find((r) => r.path.includes(step) && r.visible);

    if (route) {
      route.value = value;
      route.disabled =
        disabled !== undefined ? disabled : value === '' ? true : false;
    }
  }

  closeModal() {
    this.errorQuoteModal?.closeModal();
    location.reload();
  }
}
