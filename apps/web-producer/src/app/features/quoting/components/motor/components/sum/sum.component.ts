import {
  ISumInsured,
  IVehicle,
  SumInsuredService,
  IPolicy
} from '@sura-platform/features';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { BaseComponent, CurrencyPipe } from '@sura-platform/core';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { environment } from '@sura-platform/apps/web-producer/src/environments/environment';
import { Observable, combineLatest, Subscription, of } from 'rxjs';
import { IOption } from '@sura-platform/features/coverage';
import { Router } from '@angular/router';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { filter, switchMap, first } from 'rxjs/operators';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { AnimationOptions } from 'ngx-lottie';
import * as fromProducerReducer from '../../../../../producer/state/producer.reducer';
import * as fromProducer from '../../../../../producer/state';
import { IProducer } from '@sura-platform/features/producer';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { MOTOR_CONF } from '../../motor.config';
import * as fromEmission from '../../../emission/state';

@Component({
  selector: 'sxf-sum',
  templateUrl: 'sum.component.html',
  styleUrls: ['./sum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SumComponent extends BaseComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  /**
   * Numeric variable that manages the current value of the input range
   */
  sum?: number;
  /**
   * Minimum value of the input range
   */
  minRange$?: Observable<number>;
  /**
   * Maximum value of the input range
   */
  maxRange$?: Observable<number>;
  /**
   * Step of the input range, this value is amount of increase and decrease when moving the input range
   */
  step?: number;

  min = 1; //suma asegurada momentanea
  /**
   * Model from service
   */
  sumInsured$?: Observable<ISumInsured>;
  /**
   * Current motor
   */
  currentMotor?: IVehicle;

  vehicles: IVehicle[] = [];

  routes?: IRoutesMotor[] | null;

  form?: FormGroup;

  clauses$?: Observable<IOption[]> | null;

  amountControl: FormControl = new FormControl('');

  /**
   * variable for save IProducer in the store
   */
  currentProducer?: IProducer;

  amount$?: Observable<number>;

  isTechnicalPricing = false;

  //FIXME: JC: Es un parche para mostrar el tipo de input.
  inputType?: number;

  sumInsuredMask: any;
  sumInsuredSubscription?: Subscription;
  sumSubscription?: Subscription;
  initialSubscription?: Subscription;
  technicalPricingSubscription?: Subscription;
  listenVehicleAndCalllCoveragesSubscription?: Subscription;

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private storeEmission: Store<fromEmission.State>,
    private fb: FormBuilder,
    private sumInsuredService: SumInsuredService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private producerStore: Store<fromProducerReducer.ProducerState>,
    private flowRouteService: FlowRouteService
  ) {
    super();
  }

  /**
   *  Initialize values
   */
  ngOnInit(): void {
    // Si no existe la respuesta de coverages, debo cargarla
    this.listenCurrentVehicleAndCallCoverages();

    this.loadCurrentMotor();

    this.sumInsuredMask = createNumberMask({
      prefix: '$ ',
      thousandsSeparatorSymbol: '.'
    });

    this.form = this.fb.group({
      amount: [, Validators.required],
      clause: [, Validators.required]
    });
    this.form.controls['amount'].setValidators([
      Validators.min(this.min),
      Validators.required
    ]);
    this.technicalPricingSubscription = combineLatest([
      this.producerStore.select(fromProducer.getCurrentProducer),
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((x) => {
      this.currentProducer = <IProducer>x[0];
      const inPricingCatalog = [3, 47].includes(
        this.currentProducer.profile.catalogs.motor
      );
      const currentMotor = x[1].motor.vehicles.find(
        (v) => v.number === x[2].activeMotor
      );
      const canHaveTechnicalPricing = MOTOR_CONF.find((v) => {
        return v.vehicleType === currentMotor?.group;
      })?.technicalPricing.visible;

      if (inPricingCatalog && canHaveTechnicalPricing) {
        this.isTechnicalPricing = true;
      }
    });

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .subscribe((data) => {
        const valueAmount = this.currentMotor?.zerokm
          ? this.currentMotor?.model?.originalcostnew
          : this.currentMotor?.model?.statementamount;

        //FIXME: ML: consultar por esta parde del código con Diego
        // if (this.currentMotor.statedamount) {
        //   valueAmount = this.currentMotor.statedamount;
        // }

        this.form?.get('amount')?.setValue(valueAmount, {
          emitEvent: false
        });

        this.vehicles?.forEach((v) => {
          if (v.number === this.currentMotor?.number) {
            v.statedamount = valueAmount || null;
          }
        });

        this.inputType =
          (this.currentMotor?.model?.statementamount as number) > 0 ? 1 : 2;
        if (data[1].clauseSelected) {
          this.form
            ?.get('clause')
            ?.setValue(data[1].clauseSelected, { emitEvent: false });
        } else if (data[1].clauses) {
          this.form
            ?.get('clause')
            ?.setValue(data[1].clauses[1].code, { emitEvent: false });
        }
      })
      .unsubscribe();

    this.sumInsuredSubscription = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((policy: IPolicy) => {
        if (policy) {
          this.sumInsured$ = this.sumInsuredService.getSumInsured(
            policy.producer.code,
            policy.motor.vehicles.length <= 4 ? 'NonFleet' : 'Fleet',
            this.currentMotor?.model?.type as string,
            this.currentMotor?.zerokm
              ? (this.currentMotor?.model?.originalcostnew as number)
              : (this.currentMotor?.model?.statementamount as number)
          );

          this.step =
            (this.currentMotor?.model?.statementamount as number) *
            (environment.step / 100);
        }
      });

    this.clauses$ = this.storeQuote.select(fromQuote.getQuoteMotorData).pipe(
      switchMap((x) => {
        if (
          (this.currentMotor?.statedamount as number) <
          (this.currentMotor?.model?.statementamount as number)
        ) {
          this.form
            ?.get('clause')
            ?.setValue('SURA_CA7_ClausulaDeAjusteOpt1', { emitEvent: false });
          return of(
            x.clauses?.filter((p) => p.code === 'SURA_CA7_ClausulaDeAjusteOpt1')
          );
        } else {
          this.form
            ?.get('clause')
            ?.setValue(x.clauseSelected, { emitEvent: false });
          if (this.currentMotor?.zerokm) {
            return of(
              x.clauses?.filter(
                (p) => p.code === 'SURA_CA7_ClausulaDeAjusteOpt1'
              )
            );
          }
          return of(x.clauses);
        }
      })
    );

    this.form?.get('clause')?.valueChanges.subscribe((data) => {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetCurrentClauseMotor(data)
      );
    });

    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = data.routes;
    });

    this.amount$ = this.form?.get('amount')?.valueChanges;

    combineLatest([this.sumInsured$, this.amount$])
      .pipe(
        filter(
          () =>
            this.form?.get('amount')?.valid &&
            /^\d+$/.test(this.form?.get('amount')?.value)
        )
      )
      .subscribe(([sum, amount]) => {
        if (!this.currentMotor || !this.routes) return;
        if (!sum || !amount) return;

        this.sumInsuredSubscription?.unsubscribe();
        this.form?.controls['amount'].setValidators([
          Validators.min(sum.minimum),
          Validators.max(sum.maximum),
          Validators.required
        ]);

        // ML: si es 0km o valor inferior a infoauto entonces clausula pasa a
        // 0%, sino siempre que se modifique el valor vuelve a 10%
        if (
          this.currentMotor.zerokm ||
          (this.currentMotor.statedamount as number) <
            (this.currentMotor.model?.statementamount as number)
        ) {
          this.form
            ?.get('clause')
            ?.setValue('SURA_CA7_ClausulaDeAjusteOpt1', { emitEvent: false });
          this.storeQuote.dispatch(
            new fromQuoteActions.SetCurrentClauseMotor(
              this.form?.get('clause')?.value
            )
          );
        } else {
          if (!this.currentMotor.zerokm) {
            this.form?.get('clause')?.setValue('SURA_CA7_ClausulaDeAjusteOpt2');
            this.storeQuote.dispatch(
              new fromQuoteActions.SetCurrentClauseMotor(
                this.form?.get('clause')?.value
              )
            );
          }
        }

        //! no se debe modificar la suma asegurada original que viene de version
        //! porque es la utilizada para recalcular topes
        if (this.form?.get('amount')?.valid) {
          this.currentMotor.statedamount = Math.round(amount);

          this.vehicles?.forEach((v) => {
            if (v.number === this.currentMotor?.number) {
              //! no se debe modificar la suma asegurada original que viene de version
              //! porque es la utilizada para recalcular topes

              v.statedamount = Math.round(amount);
            }
          });

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(this.vehicles)
          );

          this.routes?.forEach((element) => {
            if (element.path === 'motor/' + this.currentMotor?.id + '/sum') {
              element.value = this.currencyPipe.transform(
                this.currentMotor?.statedamount as number
              );
            }
          });

          this.storeQuote.dispatch(
            new fromQuoteActions.SetRoutesMotor(this.routes)
          );
        }
      });
  }

  /**
   *
   * @param range event change (get current value)
   */
  changeRange(range: any) {
    this.sum = range.target.value;
  }

  /**
   * Action: add another auto - button
   */
  addAuto() {}

  continueQuoting() {
    if (!this.routes) throw new Error('Routes not defined');

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor?.id + '/sum') {
        element.value = this.currencyPipe.transform(
          this.currentMotor?.statedamount as number
        );
      }
    });

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));

    // ML: API Costs necesita definir siempre 'originalcostnew' como el precio base
    // y 'statementamount' como suma asegurada
    const currentMotor = this.vehicles?.find(
      (vehicle) => vehicle.number === this.currentMotor?.number
    );

    if (!currentMotor) throw Error('Current motor not found...');

    if (!this.currentMotor?.zerokm && currentMotor)
      currentMotor.model.originalcostnew = currentMotor.model?.statementamount;

    currentMotor.model.statementamount = currentMotor.statedamount;

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.router.navigateByUrl(
      '/quoting/coverage/' + this.currentMotor?.number + ''
    );
  }

  continue() {
    if (!this.routes || !this.currentMotor) return;

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor?.id + '/sum') {
        element.value = this.currencyPipe.transform(
          this.currentMotor?.statedamount as number
        );
      }
    });

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));

    if (!this.currentMotor?.zerokm)
      this.currentMotor.model.originalcostnew = this.currentMotor.model.statementamount;

    this.currentMotor.model.statementamount = this.currentMotor.statedamount;

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.flowRouteService.enableRoute(this.currentMotor, this.routes, 'age');
    this.directiveRef?.scrollToBottom(0, 300);
    this.clearNextsValues();
  }

  clearNextsValues() {
    this.routes?.forEach((element) => {
      if (
        element.path !== 'motor/' + this.currentMotor?.id + '/brand' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/model' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/year' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/version' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/location' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/use' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/sum' &&
        element.path !== 'motor/' + this.currentMotor?.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }

      if (element.path === 'motor/' + this.currentMotor?.id + '/sum') {
        element.disabled = false;
      }
    });
  }

  /**
   * Retorna 'true' sólo si la suma asegurada es inferior a la de Infoauto
   */
  get lowerThanInfoauto(): boolean {
    return (
      (this.currentMotor?.statedamount as number) <
      (this.currentMotor?.model.statementamount as number)
    );
  }

  /**
   * Method used only if emission is from retrieve and
   * coverages for this vehicle has not been called
   *
   * @memberof SumComponent
   */
  listenCurrentVehicleAndCallCoverages(): void {
    this.listenVehicleAndCalllCoveragesSubscription = this.storeQuote
      .select(fromQuote.getActiveMotor)
      .pipe(
        switchMap(() => {
          return combineLatest([
            this.storeEmission.select(fromEmission.getJobNumber),
            this.storeQuote.select(fromQuote.getQuoteMotorData),
            this.storePolicy.select(fromPolicy.getPolicyData)
          ]).pipe(first());
        })
      )
      .subscribe(([emissionJob, quote, policy]) => {
        // Verifico si vengo de retrieve
        if (emissionJob) {
          const successCoverage = quote.coverageResponse?.some((cr) =>
            cr.motor.vehicles?.some((v) => v.number === quote.activeMotor)
          );

          // Si no existe coverages, entonces lo llamo
          if (!successCoverage) {
            const currentMotor = policy.motor?.vehicles?.find(
              (v) => v.number === quote.activeMotor
            );

            if (!currentMotor) return;

            this.storeQuote.dispatch(
              new fromQuoteActions.LoadCoverageMotor(
                policy,
                currentMotor,
                'edit'
              )
            );
          }
        }
      });
  }

  /**
   * Function used to load vehicles and current vehicle
   */
  loadCurrentMotor(): void {
    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getActiveMotor)
    ]).subscribe(([policy, activeMotor]) => {
      this.currentMotor = policy.motor.vehicles.find(
        (c) => c.number === activeMotor
      );

      this.vehicles = policy.motor.vehicles;
    });
  }

  ngOnDestroy() {
    this.initialSubscription?.unsubscribe();
    this.sumInsuredSubscription?.unsubscribe();
    this.technicalPricingSubscription?.unsubscribe();
    this.listenVehicleAndCalllCoveragesSubscription?.unsubscribe();
  }
}
