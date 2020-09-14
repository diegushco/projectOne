import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  QueryList,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { BaseComponent } from '@sura-platform/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  IFiscalcondition,
  ICrudIncome,
  IPaymentMethod,
  FiscalConditionService,
  CrudIncomeService,
  PaymentMethodService,
  ICoverageResponse,
  IVehicle,
  ComissionService,
  DiscountService,
  CampaignService,
  PeriodMethodService,
  IPeriodMethod,
  IDiscount,
  PaymentPlansService,
  IPaymentPlan,
  IPolicy,
  IDocument,
  IdentificationService,
  ContactsService,
  IContactReq,
  IOfficialIds,
  QuotingService,
  IAccount,
  AccountService,
  IPayment,
  DocumentationService,
  ICampaign,
  ICost,
  IMotorError,
  IAddress
} from '@sura-platform/features';
import {
  Observable,
  of,
  combineLatest,
  Subject,
  throwError,
  Subscription
} from 'rxjs';
import { ModalComponent } from '@sura-platform/web';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../../state/policy';
import * as fromPolicyActions from '../../../../../state/policy/policy.actions';
import { IProducer } from '@sura-platform/features/producer';
import * as fromProducer from '../../../../../../producer/state';
import * as fromProducerReducer from '../../../../../../producer/state/producer.reducer';
import {
  tap,
  switchMap,
  filter,
  mergeMap,
  catchError,
  share,
  map,
  first,
  distinctUntilKeyChanged
} from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromQuote from '../../../../quote/state';
import * as fromQuoteActions from '../../../../quote/state/quote.actions';
import { SelectComponent } from '@sura-platform/web/features/ui/components/select/select.component';
import { IPackage } from '@sura-platform/features/package';
import { ApplicationError } from '@sura-platform/core/error/errors';
import * as fromEmission from '../../../../emission/state/index';
import * as fromEmissionActions from '../../../../emission/state/emission.actions';
import { AnimationOptions } from 'ngx-lottie';
import { viewsQuotes } from '../../../../../../queries/components/quotes/quotes.enum';
import { QuoteIssueAdapter } from '../../../../../adapters/quote-issue.adapter';
import { MOTOR_CONF } from '../../../motor.config';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { BACKEND_ERRORS } from '@sura-platform/core/error';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
export interface PaymentPlanReq {
  currency: string;
  payment: {
    method: string;
  };
  producer: {
    code: string;
  };
  period: {
    start: string;
    end: string;
  };
}

@Component({
  selector: 'sxf-summarycoverage',
  templateUrl: 'summarycoverage.component.html',
  styleUrls: ['summarycoverage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCoverageComponent extends BaseComponent
  implements OnInit, OnDestroy {
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  @ViewChild('fiscalConditionElement')
  fiscalConditionSelect?: SelectComponent;
  /**
   * view child for manage the modal for save quoting
   */
  @ViewChild('childComp') child_component?: ModalComponent;

  @Output() allowCost = new EventEmitter(false);

  @ViewChild('modalNoClient', { static: true }) modalNoClient?: ModalComponent;

  @ViewChildren('filterSelect') filterSelect?: QueryList<ElementRef>;

  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;

  @Input() loadingCost = false;
  /**
   * FormGroup for form identity
   */
  formClient: FormGroup = <FormGroup>{};

  /**
   * FormGroup for form summary
   */
  form: FormGroup = <FormGroup>{};

  /**
   * For call to get contacts
   */
  subject: Subject<any> = new Subject();

  /**
   * Variable Fiscal condition for get data from api
   */
  fiscalCondition$: Observable<IFiscalcondition[]> | undefined;

  /**
   * Variable Crud income for get data from api
   */
  crudIncome$: Observable<ICrudIncome[]> | undefined;

  /**
   * Variable paymentmethod for get data from api
   */
  paymentMethods$: Observable<IPaymentMethod[]> | undefined;

  /**
   * variable manage steps of modal save
   */
  currentStepOfSave = '';

  /**
   * variable for save Iperson in the store
   */
  currentPerson: IAccount | undefined;

  /**
   * variable with current policy
   */
  currentPolicy: IPolicy | undefined;

  /**
   * variable for save IFiscalcondition in the store
   */
  currentFiscalCondition = '';

  /**
   * variable for save ICrudIncome in the store
   */
  currentCrudIncome: ICrudIncome | null | undefined;

  driver: {
    firstname: string | null;
    lastname: string | null;
    birth: string | null;
    gender: string | null;
    clientIsDriver: boolean;
  } | null = null;

  /**
   * variable for save IPaymentMethod in the store
   */
  payment: IPayment | undefined;

  discounts: IDiscount[] | undefined;

  commission = 0;

  /**
   * variable for save IProducer in the store
   */
  currentProducer: IProducer | undefined;

  /**
   * variable for save ICoverageResponse in the store
   */
  currentMotorMethod: ICoverageResponse = <ICoverageResponse>{};

  /**
   * Current term selected for the producer
   */
  currentTerm: number | undefined;

  /**
   * Package selected async
   */
  summaryValuesPkgSelected$: Observable<IPackage> | null = null;

  /**
   * Save periodMethod from service
   */
  periodMethod$: Observable<IPeriodMethod[]> | undefined;

  /**
   * Save Commission from service
   */
  commissionProducer$: Observable<any> | undefined;

  /**
   * Save discount from service
   */
  discount$: Observable<any> | undefined;

  /**
   * Current percentage from de US-143
   */
  //TODO: DG preguntar a marcos, creo que esto es mejor meterlo en coverages.json
  currentPercentage = 0.05; //Percentage for step -> US-143

  /**
   * Get payments plans from service and store it
   */
  paymentPlan$: Observable<IPaymentPlan[]> | undefined;

  /**
   * Save default commission, for validations
   */
  defaultCommission: number | undefined;

  /**
   * Current contact selected for store quoting
   */
  currentContactSelected: any;

  /**
   * Save default discount, for validations only number
   */
  defaultDiscountNumber = 0;

  /**
   * Object any for pupulate the store
   */
  currentMotor: IVehicle = <IVehicle>{};

  currentCost: ICost | null = null;

  currentPackageSelected: IPackage | undefined;

  vehicles: IVehicle[] | undefined;

  isUW = false;

  uwSubscription: any;

  assignQuoteForm: FormGroup = <FormGroup>{};

  companyName = new FormControl('', [Validators.required]);

  listTypeIdentity: any[] = [];

  nameSavedQuoting: string | null = null;

  savingPolicy = false;

  responseQuote$: Observable<any> | undefined;

  contacts$: Observable<any> | undefined;

  existContact$: Observable<any> | undefined;

  searchingClient = false;

  foundClient = false;

  paymentTerm: IPayment | undefined;

  documentNumber = '';

  quoteIsSaved = false;

  isQuoteDonwload$: Subject<boolean> = new Subject();

  documents$: Observable<IDocument[]> | undefined;

  typeClient = '';

  patentInUse = false;

  expandedDetail = false;

  isTechnicalPricing = false;

  campaigns$: Observable<ICampaign[]> | undefined;

  campaigns: ICampaign[] | undefined;

  /**
   * Detect mobility route to enable save button and change
   * continue button
   */
  isMobilityRoute = false;

  /**
   * Detect mobility form status to enable continue button
   */
  mobilityFormValid = false;

  /**
   * True whether policy has mobility active
   *
   * @memberof SummaryCoverageComponent
   */
  hasMobility = false;

  fromRetrieve = false;

  MOBILITY_CODE = 'SURA_CA7_MobilityTheftDamageCov';

  @ViewChild('term') termChild?: SelectComponent;

  @ViewChild('discountTooltip') discountTooltip?: NgbTooltip;

  motorDataSubscription: Subscription | undefined;
  technicalPricingSubscription: Subscription | undefined;
  quoteSavedSubscription: Subscription | undefined;
  paymentDataSubscription: Subscription | undefined;
  discountsSubscription: Subscription | undefined;
  commissionSubscription: Subscription | undefined;
  documentNumberInputSubscription: Subscription | undefined;
  formChangesSubscription: Subscription | undefined;
  fiscalConditionInputSubscription: Subscription | undefined;
  crudeIncomeInputSubscription: Subscription | undefined;
  methodPayInputSubscription: Subscription | undefined;
  discountNumberInputSubscription: Subscription | undefined;
  commissionInputSubscription: Subscription | undefined;
  fiscalConditionSubscription: Subscription | undefined;
  crudIncomeSubscription: Subscription | undefined;
  coverageResponseSubscription: Subscription | undefined;
  termInputSubscription: Subscription | undefined;
  clientDataSubscription: Subscription | undefined;
  campaignInputSubscription: Subscription | undefined;
  updateCostSubscription: Subscription | undefined;
  costsSubscription: Subscription | undefined;
  currentMotorError: IMotorError | undefined;
  mobilityValiditySubscription: Subscription | undefined;
  emissionStoreSubscription: Subscription | undefined;
  costsResponseSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _fiscalService: FiscalConditionService,
    private _crudIncomeService: CrudIncomeService,
    private _paymentMethodService: PaymentMethodService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private producerStore: Store<fromProducerReducer.ProducerState>,
    private _commissionService: ComissionService,
    private _discountService: DiscountService,
    private _periodsMethodService: PeriodMethodService,
    private _paymentPlansService: PaymentPlansService,
    private router: Router,
    private identificationService: IdentificationService,
    private _contactService: ContactsService,
    private _quotingService: QuotingService,
    private accountService: AccountService,
    private storeEmission: Store<fromEmission.State>,
    private documentationService: DocumentationService,
    private quoteIssueAdapter: QuoteIssueAdapter,
    private campaignService: CampaignService,
    private changeDetector: ChangeDetectorRef
  ) {
    super();
  }

  private onFormValid() {
    this.allowCost.emit();
  }

  ngOnInit(): void {
    this.detectMobilityValidity();
    this.directiveRef?.update();
    this.isMobilityRoute = this.router.url.includes('mobility');

    this.emissionStoreSubscription = this.storeEmission
      .select(fromEmission.getEmission)
      .subscribe((store) => {
        this.fromRetrieve = store.jobNumberFromQuotes ? true : false;
      });
    this.motorDataSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((data) => {
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];

      this.vehicles = data[0].motor.vehicles;
      if (this.vehicles) {
        // Se busca si algún vehículo tiene movilidad
        this.vehicles.some((v) => {
          const currentPkg = v?.packages?.find((p) => p.selected);

          if (currentPkg) {
            if (currentPkg.coverages) {
              this.hasMobility = currentPkg.coverages.some(
                (c) => c.pattern.code === this.MOBILITY_CODE
              );
              // Si al menos un vehiculo tiene movilidad se sale
              if (this.hasMobility) {
                return true;
              }
            } else {
              return (this.hasMobility = false);
            }
          } else {
            return (this.hasMobility = false);
          }
        });
      }
      this.currentPolicy = data[0];
      if (this.currentMotor) {
        if (this.currentMotor.patentInUse) {
          this.patentInUse = this.currentMotor.patentInUse;
        }
      }
    });

    //! Verify if the producer belong technical pricing.
    this.technicalPricingSubscription = combineLatest([
      this.producerStore.select(fromProducer.getCurrentProducer),
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((x) => {
      this.currentProducer = <IProducer>x[0];
      const inPricingCatalog = [3, 47].includes(
        this.currentProducer?.profile?.catalogs?.motor
      );
      const currentMotor = x[1]?.motor?.vehicles.find(
        (v) => v?.number === x[2]?.activeMotor
      );

      if (currentMotor && currentMotor?.group !== null && MOTOR_CONF) {
        const canHaveTechnicalPricing = MOTOR_CONF?.find((v) => {
          return v.vehicleType === currentMotor.group;
        })?.technicalPricing?.visible;

        if (inPricingCatalog && canHaveTechnicalPricing)
          this.isTechnicalPricing = true;
      }
    });

    this.isQuoteDonwload$.next(false);

    this.quoteSavedSubscription = this.storeQuote
      .select(fromQuote.getQuoteIsSaved)
      .subscribe((data) => {
        this.quoteIsSaved = <boolean>data;
      });

    this.paymentDataSubscription = this.storePolicy
      .select(fromPolicy.getPaymentData)
      .subscribe((data) => {
        this.payment = data;
      });

    this.discountsSubscription = this.storePolicy
      .select(fromPolicy.getDiscounts)
      .subscribe((data) => {
        this.discounts = data;
      });

    this.commissionSubscription = this.storePolicy
      .select(fromPolicy.getCommission)
      .subscribe((data) => {
        this.commission = data;
      });

    this.assignQuoteForm = this.fb.group({
      document: [, Validators.required],
      documentNumber: [, [Validators.required, Validators.minLength(6)]]
    });

    this.form = this.fb.group({
      fiscalcondition: [, Validators.required],
      crudeincome: [, Validators.required], //ingresos brutos
      methodpay: [, Validators.required],
      term: [, Validators.required], //plazo
      discountnumber: [, Validators.required], //descuento comercial
      commission: [, Validators.required],
      campaign: ['']
    });

    this.documentNumberInputSubscription = this.assignQuoteForm
      .get('documentNumber')
      ?.valueChanges.subscribe((data) => {
        this.formClient.get('documentNumber')?.setValue(data);
        this.contacts$ = undefined;
        this.foundClient = false;
        this.documentNumber = data;
        this.currentContactSelected = null;
      });

    this.initFormNewClient();

    this.documents$ = this.identificationService.getDocumentTypes().pipe(
      switchMap((x) => {
        return of(x);
      }),
      tap(() => {
        this.formClient
          .get('document')
          ?.setValue(this.assignQuoteForm.get('document')?.value, {
            emitEvent: true
          });
      })
    );

    this.campaigns$ = this.storePolicy.select(fromPolicy.getPolicyData).pipe(
      distinctUntilKeyChanged('job'),
      switchMap((policy) =>
        this.campaignService.getCampaigns({
          job: {
            number: policy.job.number,
            type: 'Submission'
          }
        })
      ),
      map((campaigns) => {
        if (campaigns?.length) {
          campaigns.unshift({
            id: '',
            code: '',
            description: 'Ninguna'
          });
        } else {
          campaigns = [];
          //campaigns = null as ICampaign[];
        }

        return campaigns;
      }),
      tap((campaigns) => {
        this.campaigns = campaigns;
        if (campaigns?.length) {
          const id = this.currentPolicy?.campaign
            ? this.currentPolicy?.campaign.id
            : '';

          this.form.get('campaign')?.setValue(id, { emitEvent: false });
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCampaignAction(
              <ICampaign>(this.currentPolicy?.campaign || null)
            )
          );
        }
      }),
      first()
    );

    this.campaignInputSubscription = this.form
      .get('campaign')
      ?.valueChanges.subscribe((id: string) => {
        if (this.campaigns) {
          if (this.campaigns?.length === 0) return;

          if (id !== '') {
            this.storePolicy.dispatch(
              new fromPolicyActions.SetCampaignAction(
                <ICampaign>this.campaigns.find((c) => c.id === id)
              )
            );
          } else {
            this.storePolicy.dispatch(
              new fromPolicyActions.SetCampaignAction(null)
            );
          }
        }
      });

    this.formChangesSubscription = this.form.statusChanges
      .pipe(filter(() => this.form.valid))
      .subscribe(() => {
        //this.isUW = false;
        this.onFormValid();
      });

    //TODO: DG agregar al segundo parametro la descripcion de la condicion seleccionada
    this.fiscalConditionInputSubscription = this.form
      .get('fiscalcondition')
      ?.valueChanges.subscribe((data: string) => {
        this.storePolicy.dispatch(
          new fromPolicyActions.SetCurrentFiscalConditionAction(data)
        );
      });

    this.crudeIncomeInputSubscription = this.form
      .get('crudeincome')
      ?.valueChanges.subscribe((data: string | null) => {
        if (data === '-1') {
          data = null;
        } else {
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentCrudIncomeTypeAction(String(data))
          );
        }
      });

    this.methodPayInputSubscription = this.form
      .get('methodpay')
      ?.valueChanges.subscribe((data: string) => {
        if (this.payment) {
          this.payment.method = data;
          this.payment.id = null;
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
          );
        }
      });

    this.discountNumberInputSubscription = this.form
      .get('discountnumber')
      ?.valueChanges.subscribe((data) => {
        if (this.discounts) {
          this.discounts[0].value = parseInt(data, 0);
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentDiscountAction(this.discounts)
          );
        }

        //this.discountTooltip.autoClose = false;

        //if (!this.discountTooltip.isOpen()) {
        //this.discountTooltip.open();
        //}
      });

    this.commissionInputSubscription = this.form
      .get('commission')
      ?.valueChanges.pipe(
        switchMap((comision) => {
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentCommissionAction(comision)
          );

          return of(comision);
        })
      )
      .subscribe();

    this.fiscalConditionSubscription = this.storePolicy
      .select(fromPolicy.getFiscalCondition)
      .subscribe((data: string) => {
        this.currentFiscalCondition = data;
      });

    this.crudIncomeSubscription = this.storePolicy
      .select(fromPolicy.getCrudIncome)
      .subscribe((crudI: any) => {
        this.currentCrudIncome = crudI;
      });

    this.summaryValuesPkgSelected$ = <Observable<IPackage>>(
      this.storePolicy.select(fromPolicy.getPolicyData).pipe(
        mergeMap((x: IPolicy) => {
          if (this.currentMotor) {
            return of(
              x?.motor?.vehicles
                ?.filter((p) => p?.number === this.currentMotor?.number)[0]
                ?.packages?.filter((pk) => pk?.selected)[0]
            );
          }
          return of(null);
        })
      )
    );

    this.coverageResponseSubscription = this.storeQuote
      .select(fromQuote.getCoverageResponseMotorData)
      .subscribe((ICovRe: any) => {
        this.currentMotorMethod = ICovRe;
        if (this.currentMotorMethod) {
          this.discount$ = combineLatest([
            this._discountService.getAllDiscounts({
              job: { number: this.currentMotorMethod.job.number }
            })
            //this._discountService.getAvailableDiscounts({
            //job: { number: this.currentMotorMethod.job.number }
            //})
          ]).pipe(
            tap((x) => {
              const discounts = x[0];
              discounts[0].value = 0;
              // this.defaultDiscount = x; //segun US-143
              // this.defaultDiscountNumber = x[0].value;
              // Valido que sea la primera vez que entra.
              if (!this.currentPolicy?.motor.discounts) {
                this.form.get('discountnumber')?.setValue(discounts[0].value, {
                  onlySelf: true,
                  emitEvent: false
                });
                this.form.updateValueAndValidity();
                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentDiscountAction(discounts)
                );
              } else {
                // Dejo el valor que el usuario edito..
                this.form
                  .get('discountnumber')
                  ?.setValue(this.currentPolicy?.motor.discounts[0].value, {
                    onlySelf: true,
                    emitEvent: true
                  });
                this.form.updateValueAndValidity();
              }
            }),
            switchMap((x) =>
              of({
                discounts: x[0]
                //availableDiscounts: {
                //...x[1],
                //available: x[1].total - x[1].applied
                //}
              })
            ),
            share()
          );

          this.periodMethod$ = this._periodsMethodService
            .getAllPeriodMethods({
              job: { number: this.currentMotorMethod.job.number }
            })
            .pipe(
              tap((period) => {
                //TODO: JC
                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentPeriodMethod(period[0])
                );
              })
            );

          this.commissionProducer$ = this._commissionService
            .getAllComissions({
              job: { number: this.currentMotorMethod.job.number }
            })
            .pipe(
              tap((xc) => {
                this.defaultCommission = xc.default;
                if (!this.currentPolicy?.motor.commission.producer) {
                  this.form
                    .get('commission')
                    ?.setValue(xc.default, { onlySelf: true, emitEvent: true });
                  this.form.updateValueAndValidity();
                  this.storePolicy.dispatch(
                    new fromPolicyActions.SetCurrentCommissionAction(
                      this.defaultCommission
                    )
                  );
                } else {
                  this.form
                    .get('commission')
                    ?.setValue(this.currentPolicy?.motor.commission.producer, {
                      onlySelf: true,
                      emitEvent: true
                    });
                  this.form.updateValueAndValidity();
                }
              })
            );
        }
      });

    this.fiscalCondition$ = this._fiscalService.getAllFiscalCondition().pipe(
      switchMap((x) => {
        if (this.currentPolicy?.fiscalcondition === null) {
          this.form
            .get('fiscalcondition')
            ?.setValue(x[0].code, { emitEvent: false });
          this.form.updateValueAndValidity();
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentFiscalConditionAction(x[0].code)
          );
        } else {
          this.form
            .get('fiscalcondition')
            ?.setValue(this.currentPolicy?.fiscalcondition, {
              emitEvent: false
            });
          this.form.updateValueAndValidity();
        }
        return of(x);
      })
    );

    if (this.currentMotorMethod) {
      this.paymentMethods$ = this._paymentMethodService
        .getAllPaymentMethods(this.currentMotorMethod.job)
        .pipe(
          switchMap((ph) => {
            const creditCardOption = ph.filter((x) =>
              x.code.toString().toLowerCase().includes('credit')
            );

            if (
              this.currentPolicy?.payment.method !== null &&
              this.currentPolicy?.payment.method !== creditCardOption[0].code
            ) {
              this.form
                .get('methodpay')
                ?.setValue(this.currentPolicy?.payment.method, {
                  emitEvent: true
                });
              this.form.updateValueAndValidity();
            } else {
              this.form
                .get('methodpay')
                ?.setValue(creditCardOption[0].code, { emitEvent: true });
              this.form.updateValueAndValidity();
              if (this.payment) {
                this.payment.method = creditCardOption[0].code.toString();
                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentPaymentMethodAction(
                    this.payment
                  )
                );
              }
            }
            if (this.currentProducer) {
              this.paymentPlan$ = this._paymentPlansService
                .getAllPaymentPlans(
                  'ars',
                  this.form.get('methodpay')?.value,
                  this.currentProducer.code,
                  this.currentMotorMethod.period.start.toString(),
                  this.currentMotorMethod.period.end.toString()
                )
                .pipe(
                  switchMap((pm) => {
                    pm.map((pkg) => {
                      const cuotas = pkg?.description
                        ?.replace('Cuotas - ARS', '')
                        ?.replace('Pago Total - ARS', '1')
                        .trim();

                      if (pkg !== null) {
                        pkg.description = <string>cuotas;
                      }
                      return pkg;
                    });
                    if (
                      !this.currentPolicy?.paymentTerm ||
                      this.currentPolicy?.paymentTerm
                        .maximumnumberofinstallments === null
                    ) {
                      if (this.payment) {
                        if (
                          this.fromRetrieve &&
                          this.currentPolicy?.paymentTerm
                            .maximumnumberofinstallments === null
                        ) {
                          const cuotas = pm.find(
                            (p) =>
                              p.code === this.currentPolicy?.payment.plan.code
                          );
                          if (
                            cuotas.maximumnumberofinstallments === 0 &&
                            cuotas.description === '1'
                          ) {
                            cuotas.maximumnumberofinstallments = 1;
                          }
                          this.storePolicy.dispatch(
                            new fromPolicyActions.SetCurrentPaymentTermAction(
                              cuotas
                            )
                          );
                          this.form
                            .get('term')
                            ?.setValue(this.currentPolicy?.payment.plan.code, {
                              emitEvent: false
                            });
                        } else {
                          this.storePolicy.dispatch(
                            new fromPolicyActions.SetCurrentPaymentTermAction(
                              pm[pm.length - 1]
                            )
                          );
                          this.payment.plan.code = pm[pm.length - 1].code;
                          this.form
                            .get('term')
                            ?.setValue(pm[pm.length - 1].code, {
                              emitEvent: false
                            });
                        }

                        this.storePolicy.dispatch(
                          new fromPolicyActions.SetCurrentPaymentMethodAction(
                            this.payment
                          )
                        );
                      }
                    } else {
                      this.form
                        .get('term')
                        ?.setValue(this.currentPolicy?.payment.plan.code, {
                          emitEvent: false
                        });
                    }
                    return of(pm);
                  }),
                  tap(() => this.form.updateValueAndValidity())
                );
            }
            return of(ph);
          })
        );
    }

    //agrego opcion ninguno, porque guidewire no trae por defecto esta opcion
    //ya se hablo esto con carlitos

    this.crudIncome$ = this._crudIncomeService.getAllCrudIncome().pipe(
      switchMap((ci) => {
        const _crudIncomes = ci;
        _crudIncomes.push({
          code: '-1',
          description: 'Ninguno',
          type: '',
          number: ''
        });

        const _crudIncome = _crudIncomes.filter((x) =>
          x.description.toString().toLowerCase().includes('ninguno')
        )[0];
        if (this.currentPolicy?.iibb) {
          if (this.currentPolicy?.iibb.type === null) {
            this.form
              .get('crudeincome')
              ?.setValue(_crudIncome.code, { emitEvent: true });
            this.form.updateValueAndValidity();
            this.currentCrudIncome = _crudIncome;
            if (this.currentCrudIncome) {
              this.currentCrudIncome.type = _crudIncome.code;

              this.storePolicy.dispatch(
                new fromPolicyActions.SetCurrentCrudIncomeTypeAction(
                  <string>(
                    (this.currentCrudIncome.type === '-1'
                      ? null
                      : this.currentCrudIncome.type)
                  )
                )
              );
            }
          } else {
            this.form
              .get('crudeincome')
              ?.setValue(this.currentPolicy?.iibb.type, { emitEvent: true });
            this.form.updateValueAndValidity();
          }
        }

        return of(_crudIncomes);
      })
    );

    this.termInputSubscription = this.form
      .get('term')
      ?.valueChanges.subscribe((code: any) => {
        this.termChild?.getValue().subscribe((data: IPaymentPlan) => {
          if (data.maximumnumberofinstallments === 0) {
            data.maximumnumberofinstallments = 1;
          }
          if (data.maximumnumberofinstallments) {
            this.currentTerm = data.maximumnumberofinstallments;
          }
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentPaymentTermAction(data)
          );
        });
        if (this.payment) {
          this.payment.plan.code = code;
          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
          );
        }
      });

    this.clientDataSubscription = this.storePolicy
      .select(fromPolicy.getClientData)
      .subscribe((data: IAccount) => {
        this.currentPerson = data;
      });

    this.uwSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getMotorErrors)
    ]).subscribe(([policy, errors]) => {
      if (this.currentMotor) {
        // Obtengo información del paquete seleccionado
        this.currentPackageSelected = policy?.motor.vehicles
          ?.find((v) => v.number === this.currentMotor?.number)
          ?.packages?.find((p) => p.selected);

        if (!this.currentPackageSelected) return;

        // Busco si hay un error en motor
        this.currentMotorError = errors?.find((err) =>
          err.externalId
            .split('&')
            .includes(
              `${this.currentPolicy?.productcode},${this.currentMotor?.number},${this.currentPackageSelected?.code}`
            )
        );

        //validacion para habilitar o deshabilitar botones segun si es UW
        if (this.currentMotorError?.code === BACKEND_ERRORS.UNDERWRITER) {
          this.isUW = true;
        } else {
          this.isUW = false;
        }

        if (policy.motor.vehicles.length > 1) {
          policy.motor.vehicles.forEach((v) => {
            const autoPckSelected = v?.packages?.find((p) => p?.selected);
            if (!autoPckSelected) return;
            const autoErrorSelected = errors?.find((err) =>
              err.externalId
                .split('&')
                .includes(
                  `${this.currentPolicy?.productcode},${v?.number},${autoPckSelected?.code}`
                )
            );
            if (autoErrorSelected?.code === BACKEND_ERRORS.UNDERWRITER) {
              //this.isUW = true;
            }
          });
        }
      }
    });
    //esto esta hecho solo para las cotizaciones guardadas
    if (this.fromRetrieve) {
      this.costsResponseSubscription = combineLatest([
        this.storeQuote.select(fromQuote.getCosts),
        this.storeQuote.select(fromQuote.getMotorErrors)
      ]).subscribe(([costs, errors]) => {
        this.currentCost = <ICost>(
          costs?.find((cost) =>
            cost.externalId
              .split('&')
              .includes(
                `${this.currentPolicy.productcode},${this.currentMotor.number},${this.currentPackageSelected.code}`
              )
          )
        );
        this.currentMotorError = <IMotorError>(
          errors?.find((error) =>
            error.externalId
              .split('&')
              .includes(
                `${this.currentPolicy.productcode},${this.currentMotor.number},${this.currentPackageSelected.code}`
              )
          )
        );
      });
      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateCostsAction([this.currentCost])
      );
    }
    this.costsSubscription = this.storePolicy
      .select(fromPolicy.getCosts)
      .subscribe((costs) => {
        this.currentCost = costs ? costs[0] : null;
      });

    this.updateCostSubscription = this.storeQuote
      .select(fromQuote.getCosts)
      .subscribe((costs) => {
        if (this.currentCost) {
          const newCost = costs?.filter(
            (c) => c?.externalId === this.currentCost?.externalId
          );

          if (newCost && newCost?.length > 0) {
            this.storePolicy.dispatch(
              new fromPolicyActions.UpdateCostsAction(<ICost[]>newCost)
            );
          }
        }
      });
  }
  onReachEnd() {
    this.directiveRef?.update();
    document
      ?.getElementById('title')
      ?.setAttribute('style', 'box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.18);');
    document?.getElementById('footer')?.removeAttribute('style');
  }
  onReachStart() {
    this.directiveRef?.update();
    document
      ?.getElementById('footer')
      ?.setAttribute('style', 'box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.18);');
    document?.getElementById('title')?.removeAttribute('style');
  }
  centercondition() {
    this.directiveRef?.scrollToElement('.condition', 0, 200);
  }

  centerPayment() {
    this.directiveRef?.scrollToElement('.payment', 0, 200);
  }
  centerDues() {
    this.directiveRef?.scrollToElement('.dues', 0, 200);
  }
  centerCrudI() {
    this.directiveRef?.scrollToElement('.crud', 0, 200);
  }
  initFormNewClient() {
    this.formClient = this.fb.group({
      document: [, Validators.required],
      documentNumber: [
        this.documentNumber !== null && this.documentNumber !== undefined
          ? this.documentNumber
          : [],
        Validators.required
      ],
      firstname: [],
      lastname: [],
      companyname: [],
      email: [
        ,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ]
    });
  }

  onOpen() {
    this.directiveRef?.scrollToElement('.campaign', 0, 200);
    if (this.filterSelect) {
      this.filterSelect.changes.subscribe((res) => {
        this.filterSelect?.first?.nativeElement.focus();
        return res;
      });
    }
  }
  centerTotalPrize() {
    this.directiveRef?.scrollToElement('.totalPrize', 0, 200);
    this.expandedDetail = !this.expandedDetail;
  }

  authorizeAsk() {
    this.isUW = true;
    this.openModalClient();
  }

  /**
   * Function used to restore tooltips to
   * the automatic state after leaving the
   * focus of the discount range box.
   * @memberof SummaryCoverageComponent
   */
  autoDiscountTooltip() {
    if (this.discountTooltip) {
      this.discountTooltip.autoClose = true;
      if (this.discountTooltip.isOpen()) {
        this.discountTooltip.close();
      }
    }
  }

  /**
   * Contact selected to store quoting
   * @param data data of contact
   */
  contactSelected(data: any) {
    this.currentContactSelected = data;
  }

  /**
   * OnSearch service contact GW
   */
  onSearch() {
    this.currentContactSelected = null;
    this.searchingClient = true;
    // this.subject.next();
    if (
      this.assignQuoteForm.get('document') !== null &&
      this.assignQuoteForm.get('documentNumber') !== null
    ) {
      if (
        this.assignQuoteForm.get('document')?.value === 'FEIN' &&
        parseInt(
          this.assignQuoteForm.get('documentNumber')?.value.substring(0, 2),
          0
        ) >= 30
      ) {
        this.typeClient = 'Company';
      } else {
        this.typeClient = 'Person';
      }
    }
    const requestContact: IContactReq = {
      type: this.typeClient,
      officialid: this.assignQuoteForm.get('documentNumber')?.value
    };

    const data: any = {
      officialid: {
        type: this.assignQuoteForm.get('document')?.value,
        value: this.assignQuoteForm.get('documentNumber')?.value
      }
    };

    this.contacts$ = this.accountService.getAccounts(data).pipe(
      switchMap((bn) => {
        this.searchingClient = false;
        if (bn === null) {
          return this._contactService.getContacts(requestContact).pipe(
            switchMap((xc) => {
              this.foundClient = false;
              if (xc !== null) {
                this.foundClient = true;
                return of(xc);
              }
              return of([]);
            })
          );
        } else {
          this.foundClient = true;
          return of([bn]);
        }
      }),
      share(),
      catchError((err: ApplicationError) => {
        this.searchingClient = false;
        //si no pertenece el cliente a ese grupo comercial
        if (parseInt(err.code, 0) === -1) {
          //this.openModalNoClient();
        }
        return of([]);
      })
    );
  }

  /**
   * filter for array of officialId and return dni primary
   */
  filterOfficialId(arr: any) {
    return arr.filter((ids: { primary: number }) => ids.primary)[0].value;
  }

  /**
   * Method to open modal and show form to save a quoting and initialize form
   */
  openModalClient() {
    this.assignQuoteForm
      .get('documentNumber')
      ?.setValue('', { onlySelf: true, emitEvent: false });

    this.contacts$ = undefined;

    this.currentContactSelected = undefined;
    this.currentStepOfSave = 'screenOne';

    this.responseQuote$ = undefined;

    this.child_component?.openModal();
  }

  /**
   * Method to close modal
   */
  closeModal() {
    this.child_component?.closeModal();
  }

  /**
   *
   * @param range Method to receive range of input range...
   */

  /*changeRange(range) {
    //this.valueRange = range.target.value;
    //this.form.get('discount').setValue(range.target.value);
  }*/

  /**
   * Method save in the store
   */
  saveDataUser() {
    this.savingPolicy = true;
    const official: IOfficialIds[] = [
      {
        type: this.assignQuoteForm.get('document')?.value,
        value: this.currentContactSelected.officialid
          ? this.currentContactSelected.officialid
          : this.currentContactSelected.officialids.filter(
              (ids: { primary: number }) => ids.primary
            )[0].value,
        primary: true
      }
    ];
    if (this.currentPolicy) {
      this.currentPolicy.insured = {
        consortium: this.typeClient === 'Person' ? undefined : null,
        officialorganism: this.typeClient === 'Person' ? undefined : null,
        politicallyexposed: this.typeClient === 'Person' ? null : undefined,
        contactid: this.currentContactSelected.id
          ? this.currentContactSelected.id
          : this.currentContactSelected.contactid,
        companyname: this.typeClient === 'Person' ? undefined : null,
        email: null,
        type: this.typeClient,
        officialids: official,
        firstname:
          this.typeClient === 'Person'
            ? this.currentContactSelected.firstname
            : undefined,
        lastname:
          this.typeClient === 'Person'
            ? this.currentContactSelected.lastname
            : undefined,
        accountnumber: null,
        address: {
          ...this.currentPolicy.address,
          city: this.currentMotor.zone.city,
          state: this.currentMotor.zone.state
        },
        addresses: null,
        birth: this.typeClient === 'Person' ? null : undefined,
        cellphone: this.typeClient === 'Person' ? null : undefined,
        workphone: this.typeClient === 'Company' ? null : undefined,
        documentNumber: null,
        documentType: null,
        fiscalcondition: null,
        gender: this.typeClient === 'Person' ? null : undefined,
        homephone: null,
        iibb: null,
        maritalstatus: this.typeClient === 'Person' ? null : undefined,
        primaryaddress: null,
        nationality: this.typeClient === 'Person' ? null : undefined,
        certificate: {
          start: null,
          end: null
        },
        blacklist: false,
        editable: null
      };

      this.currentPolicy.client = {
        ...this.currentPolicy.insured
      };

      //! if the producer belong technical pricing, then...
      if (this.isTechnicalPricing) {
        if (this.currentPolicy) {
          this.driver = {
            ...this.currentPolicy?.motor.vehicles.filter(
              (x) => x.number === this.currentMotor.number
            )[0].driver
          };
          if (this.driver) {
            this.driver.firstname = this.currentContactSelected.firstname;
            this.driver.lastname = this.currentContactSelected.lastname;
          }
          this.currentPolicy.motor.vehicles.filter(
            (x) => x.number === this.currentMotor.number
          )[0].driver = this.driver;
        }
      }
      const adapted = this.quoteIssueAdapter.adapt(this.currentPolicy);
      this.responseQuote$ = this._quotingService.saveQuoting(adapted).pipe(
        tap(() => {
          this.storeQuote.dispatch(
            new fromQuoteActions.SetQuoteIsSavedMotor(true)
          );
          this.currentStepOfSave = 'lastStep';
          this.savingPolicy = false;
        }),
        catchError(() => {
          this.savingPolicy = false;
          this.currentStepOfSave = '';
          this.closeModal();
          return throwError({
            code: -1,
            description: 'Error al intentar guardar la cotización.'
          });
        })
      );
    }
  }

  saveDataNewUser() {
    this.savingPolicy = true;
    const official: IOfficialIds[] = [
      {
        type: this.assignQuoteForm.get('document')?.value,
        value: this.assignQuoteForm.get('documentNumber')?.value,
        primary: true
      }
    ];
    if (this.currentPolicy) {
      if (this.currentMotor) {
        this.currentPolicy.insured = {
          consortium: this.typeClient === 'Person' ? undefined : null,
          officialorganism: this.typeClient === 'Person' ? undefined : null,
          politicallyexposed: this.typeClient === 'Person' ? null : undefined,
          contactid: null,
          companyname:
            this.typeClient === 'Person'
              ? undefined
              : this.formClient.get('companyname')?.value,
          email: this.formClient.get('email')?.value,
          type: this.typeClient,
          officialids: official,
          firstname:
            this.typeClient === 'Person'
              ? this.formClient.get('firstname')?.value
              : undefined,
          lastname:
            this.typeClient === 'Person'
              ? this.formClient.get('lastname')?.value
              : undefined,
          accountnumber: null,
          address: <IAddress>{
            ...this.currentPolicy.address,
            city: this.currentMotor.zone.city,
            state: this.currentMotor.zone.state
          },
          addresses: null,
          birth: this.typeClient === 'Person' ? null : undefined,
          cellphone: this.typeClient === 'Person' ? null : undefined,
          workphone: this.typeClient === 'Company' ? null : undefined,
          documentNumber: this.formClient.get('documentNumber')?.value,
          documentType: this.formClient.get('document')?.value,
          fiscalcondition: null,
          gender: this.typeClient === 'Person' ? null : undefined,
          homephone: null,
          iibb: null,
          maritalstatus: this.typeClient === 'Person' ? null : undefined,
          primaryaddress: null,
          nationality: this.typeClient === 'Person' ? null : undefined,
          certificate: {
            start: null,
            end: null
          },
          blacklist: false,
          editable: null
        };
      }
      this.currentPolicy.client = {
        ...this.currentPolicy.insured
      };

      //! if the producer belong technical pricing, then...
      if (this.isTechnicalPricing) {
        this.driver = {
          ...this.currentPolicy.motor.vehicles.filter(
            (x) => x.number === this.currentMotor.number
          )[0].driver
        };
        if (this.driver) {
          if (this.driver.firstname) {
            this.driver.firstname = this.formClient.get('firstname')?.value;
          }
          if (this.driver.lastname) {
            this.driver.lastname = this.formClient.get('lastname')?.value;
          }
        }

        this.currentPolicy.motor.vehicles.filter(
          (x) => x.number === this.currentMotor.number
        )[0].driver = this.driver;
      }
      const adapted = this.quoteIssueAdapter.adapt(this.currentPolicy);
      this.responseQuote$ = this._quotingService.saveQuoting(adapted).pipe(
        tap(() => {
          this.storeQuote.dispatch(
            new fromQuoteActions.SetQuoteIsSavedMotor(true)
          );
          this.currentStepOfSave = 'lastStep';
          this.savingPolicy = false;
        }),
        catchError(() => {
          this.savingPolicy = false;
          this.currentStepOfSave = '';
          return of({
            code: -1
          });
        })
      );
    }
  }

  newClientToSave() {
    this.currentStepOfSave = 'newClient';
    this.initFormNewClient();
  }

  continue() {
    // En caso de no estar en movilidad, entonces ir
    if (!this.isMobilityRoute) {
      this.router.navigateByUrl('/quoting/mobility');
      return;
    }

    // Sino, vamos a emisión
    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('client')
    );
    this.router.navigateByUrl('/quoting/emission/questions/client');
  }

  goHome() {
    this.child_component?.closeModal();
    let url: string;
    if (this.isUW === true) {
      url = '/queries/quotes/' + viewsQuotes.COTIZACIONPENDIENTE;
    } else {
      url = '/queries/quotes';
    }

    this.router.navigateByUrl(url);
  }

  /**
   * This method is used to go to emission.
   *
   * @memberof SummaryCoverageComponent
   */
  goToEmission() {
    this.child_component?.closeModal();
    this.router.navigateByUrl('/quoting/emission/questions/client');
  }

  downloadQuote() {
    if (this.quoteIsSaved) {
      if (this.currentPolicy) {
        this.isQuoteDonwload$.next(true);
        this.documentationService
          .getVehicleQuote(this.currentPolicy.job.number)
          .subscribe((data) => {
            this.isQuoteDonwload$.next(false);
            const linkSource =
              'data:application/pdf;base64,' + data.streambase64;
            const downloadLink = document.createElement('a');
            const fileName = data.name;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          });

        this.documentationService
          .getVehicleProducerQuote(this.currentPolicy.job.number)
          .subscribe((data) => {
            this.isQuoteDonwload$.next(false);
            const linkSource =
              'data:application/pdf;base64,' + data.streambase64;
            const downloadLink = document.createElement('a');
            const fileName = data.name;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          });
      } else {
        this.openModalClient();
      }
    }
  }

  closeModalNoClient() {
    this.modalNoClient?.closeModal();
  }

  openModalNoClient() {
    this.modalNoClient?.openModal();
  }

  detectMobilityValidity() {
    this.mobilityValiditySubscription = this.storeQuote
      .select(fromQuote.getMobilityFormValidity)
      .subscribe((status) => {
        this.mobilityFormValid = <boolean>status;

        if (this.isMobilityRoute) this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    if (this.uwSubscription) {
      this.isUW = false;
      this.uwSubscription.unsubscribe();
    }
    this.currentPackageSelected = undefined;

    if (this.emissionStoreSubscription) {
      this.emissionStoreSubscription.unsubscribe();
    }

    if (this.costsResponseSubscription) {
      this.costsResponseSubscription.unsubscribe();
    }

    if (this.motorDataSubscription) {
      this.motorDataSubscription.unsubscribe();
    }
    if (this.technicalPricingSubscription) {
      this.technicalPricingSubscription.unsubscribe();
    }
    if (this.quoteSavedSubscription) {
      this.quoteSavedSubscription.unsubscribe();
    }
    if (this.paymentDataSubscription) {
      this.paymentDataSubscription.unsubscribe();
    }
    if (this.discountsSubscription) {
      this.discountsSubscription.unsubscribe();
    }
    if (this.commissionSubscription) {
      this.commissionSubscription.unsubscribe();
    }
    if (this.documentNumberInputSubscription) {
      this.documentNumberInputSubscription.unsubscribe();
    }
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
    if (this.fiscalConditionInputSubscription) {
      this.fiscalConditionInputSubscription.unsubscribe();
    }
    if (this.crudeIncomeInputSubscription) {
      this.crudeIncomeInputSubscription.unsubscribe();
    }
    if (this.methodPayInputSubscription) {
      this.methodPayInputSubscription.unsubscribe();
    }
    if (this.discountNumberInputSubscription) {
      this.discountNumberInputSubscription.unsubscribe();
    }
    if (this.commissionInputSubscription) {
      this.commissionInputSubscription.unsubscribe();
    }
    if (this.fiscalConditionSubscription) {
      this.fiscalConditionSubscription.unsubscribe();
    }
    if (this.crudIncomeSubscription) {
      this.crudIncomeSubscription.unsubscribe();
    }
    if (this.coverageResponseSubscription) {
      this.coverageResponseSubscription.unsubscribe();
    }
    if (this.termInputSubscription) {
      this.termInputSubscription.unsubscribe();
    }
    if (this.clientDataSubscription) {
      this.clientDataSubscription.unsubscribe();
    }
    if (this.campaignInputSubscription) {
      this.campaignInputSubscription.unsubscribe();
    }
    this.costsSubscription?.unsubscribe();
    this.updateCostSubscription?.unsubscribe();
    if (this.mobilityValiditySubscription) {
      this.mobilityValiditySubscription.unsubscribe();
    }
  }
}
