import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromEmission from '../../../emission/state';
import * as fromEmissionActions from '../../../emission/state/emission.actions';
import { Store } from '@ngrx/store';
import {
  IPolicy,
  QuotingService,
  FiscalConditionService,
  IVehicle,
  PaymentValidations,
  ICampaign,
  PaymentMethodService,
  PaymentPlansService,
  IPaymentPlan
} from '@sura-platform/features';
import { IPackage } from '@sura-platform/features/package';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  combineLatest,
  of,
  Subscription,
  EMPTY
} from 'rxjs';
import { ModalComponent } from '@sura-platform/web';
import * as fromQuote from '../../../quote/state';
import {
  switchMap,
  map,
  share,
  tap,
  first,
  distinctUntilKeyChanged
} from 'rxjs/operators';
import { AnimationOptions } from 'ngx-lottie';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@sura-platform/core/services/notification.service';
import { QuoteIssueAdapter } from '../../../../adapters/quote-issue.adapter';
import { FormControl } from '@angular/forms';
import { BACKEND_ERRORS } from '@sura-platform/core/error/error.enum';

@Component({
  selector: 'sxf-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  @ViewChild('childComp') child_component: ModalComponent = <ModalComponent>{};
  @ViewChild('uwEmision') uwEmision: ModalComponent = <ModalComponent>{};
  @ViewChild('vehicleDetails') vehicleDetails: ModalComponent = <
    ModalComponent
  >{};
  @ViewChild('modalEditCoverage') modalEditCoverage: ModalComponent = <
    ModalComponent
  >{};
  /**
   * variable to get policy from store
   */
  currentPolicy: IPolicy = <IPolicy>{};
  currentMotor: IVehicle = <IVehicle>{};
  packageSelected: IPackage = <IPackage>{};

  /**
   * Variable to get mechanicalAssistance
   */
  mechanicalAssistance: string | null = null;

  isFromRetrieve: boolean | null = null;
  issueError$: Observable<any> = new Observable();
  subject: Subject<any> = new Subject();
  loadingIssue$: Subject<boolean> = new Subject();
  loadingFromRetrieve$: Observable<boolean> | null = null;
  additionals: any;

  /**
   * All vehicles
   *
   * @type {Observable<IVehicle[]>}
   * @memberof DetailsComponent
   */
  vehicles$: Observable<IVehicle[]> = new Observable();
  packageSelectedWithAssistance$: Observable<any> = new Observable();
  brandModelPrizeCar$: Observable<any> = new Observable();
  rebillingPeriod$: Observable<any> = new Observable();
  fiscalCondition$: Observable<any> = new Observable();
  additionals$: Observable<any> = new Observable();
  discountAndCommission$: Observable<any> = new Observable();
  campaign$: Observable<ICampaign[]> = new Observable();
  installments$: Observable<any> = new Observable();
  payment$: Observable<any> = new Observable();
  formsValid$: Observable<any> = new Observable();
  expandedDetail: boolean | null = null;
  getQuoteApproved = false;
  /**
   *  Payment Methods on Emission
   *
   * @type {Observable<any>}
   * @memberof DetailsComponent
   */
  paymentMethod$: Observable<any> = new Observable();

  /**
   * Payment Plan on Emission
   *
   * @type {Observable<any>}
   * @memberof DetailsComponent
   */
  paymentPlan$: Observable<any> = new Observable();

  /**
   * Subscription to emission store
   *
   * @type {Subscription}
   * @memberof DetailsComponent
   */
  emissionStoreSubscription: Subscription = new Subscription();

  /**
   * If true then when 'Contratar' is pressed,
   * quotes/issues/bind is called else issues is called
   *
   * @memberof DetailsComponent
   */
  isApprovedEmission = false;

  /**
   * If true, then we cannot change the coverage type
   *
   * @type {boolean}
   * @memberof DetailsComponent
   */
  disabledByRetrieve: boolean | null = null;

  /**
   * FormControl for campaign
   *
   * @memberof DetailsComponent
   */
  formCampaign = new FormControl({ value: '', disabled: true });
  updateCostSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private storePolicy: Store<fromPolicy.State>,
    private storeEmission: Store<fromEmission.State>,
    private quotingService: QuotingService,
    private storeQuote: Store<fromQuote.State>,
    private fiscalConditionService: FiscalConditionService,
    private notificationService: NotificationService,
    private quoteIssueAdapter: QuoteIssueAdapter,
    private paymentMethodService: PaymentMethodService,
    private paymentPlansService: PaymentPlansService
  ) {}

  ngOnInit() {
    this.loadingIssue$.next(false);

    this.loadingFromRetrieve$ = combineLatest([
      this.storeEmission.select(fromEmission.getJobNumber),
      this.storePolicy.select(fromPolicy.getClientData)
    ]).pipe(
      switchMap((x) => {
        const job = x[0];
        const client = x[1];

        this.isFromRetrieve = job ? true : false;

        if (job && !client.documentNumber) {
          return of(false);
        }

        return of(true);
      })
    );

    this.formsValid$ = combineLatest([
      this.storeEmission.select(fromEmission.getFormClientIsValid),
      this.storeEmission.select(fromEmission.getFormResidenceIsValid),
      this.storeEmission.select(fromEmission.getFormTaxIsValid),
      this.storeEmission.select(fromEmission.getFormValidityIsValid),
      this.storeEmission.select(fromEmission.getFormOtherIsValid)
    ]).pipe(
      switchMap((x) => {
        if (x[0] && x[1] && x[2] && x[3] && x[4]) {
          return of(false);
        } else {
          return of(true);
        }
      })
    );

    this.payment$ = this.storePolicy.select(fromPolicy.getPolicyData).pipe(
      switchMap((x) => {
        if (x.payment.id !== null) {
          return of(false);
        } else {
          const paymentValidation = new PaymentValidations(x.payment);
          if (
            paymentValidation.completeModel() &&
            paymentValidation.validatePayment()
          )
            return of(false);
        }
        return of(true);
      })
    );

    this.vehicles$ = this.storePolicy.select(fromPolicy.getPolicyData).pipe(
      switchMap((x) => {
        const vehicles = x.motor.vehicles;
        return of(vehicles);
      })
    );

    this.packageSelectedWithAssistance$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.storeEmission.select(fromEmission.getJobNumber),
      this.storeQuote.select(fromQuote.getQuoteApproved)
    ]).pipe(
      switchMap((x) => {
        // Se usa para el boton contratar.
        this.currentPolicy = x[0];
        this.currentMotor = x[0].motor.vehicles.find(
          (c) => c.number === x[1].activeMotor
        ) as IVehicle;

        const currentMotor = x[0].motor.vehicles.find(
          (c) => c.number === x[1].activeMotor
        );
        this.getQuoteApproved = x[3];
        // SI NO TENGO AUTO
        if (currentMotor?.year === null) {
          return of({});
        }

        const packageSelected = currentMotor?.packages?.find(
          (pk) => pk.selected
        );

        const assistance = packageSelected?.coverages?.find(
          (cov) => cov.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov'
        );

        const currentCost = this.currentPolicy?.costs[0];

        return of({
          package: packageSelected,
          assistance: assistance
            ? assistance.terms[0]?.value?.current
            : 'NoAssistance',
          cost: currentCost
        });
      })
    );

    //FIXME: Habilitar esto cuando se suba emisión
    // this.updateCostSubscription = combineLatest([
    //   this.storeQuote.select(fromQuote.getCosts),
    //   this.storePolicy.select(fromPolicy.getCosts).pipe(
    //     switchMap((c) => of(c[0]?.externalId)),
    //     distinctUntilChanged()
    //   )
    // ]).subscribe(([newCosts, currentCost]) => {
    //   if (currentCost) {
    //     const newCost = newCosts.filter((c) => c.externalId === currentCost);

    //     if (newCost.length > 0) {
    //       this.storePolicy.dispatch(
    //         new fromPolicyActions.UpdateCostsAction(newCost)
    //       );
    //     }
    //   }
    // });

    this.additionals$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap((x) => {
        const currentMotor = x[0].motor.vehicles.filter(
          (c) => c.number === x[1].activeMotor
        )[0];

        // SI NO TENGO AUTO
        if (currentMotor.year === null) {
          return of({
            additionalsLenght: 0,
            additionals: []
          });
        }

        const additionalsList = currentMotor?.packages
          ?.find((pk) => pk.selected)
          ?.coverages?.filter(
            (cov) =>
              cov.pattern.code !== 'SURA_CA7_ClausulaDeAjusteCov' &&
              cov.pattern.code !== 'SURA_CA7_AsistenciaMecanicaCov' &&
              !cov.pattern.code.startsWith('SURA_CA7_Mobility')
          )
          .filter(
            (cov: any) =>
              cov.category.code === 'SURA_CA7_CobAdicionalesGrp' ||
              cov.category.code === 'SURA_CA7_AccesoriosGrp'
          );

        return of({
          additionalsLenght: additionalsList?.length,
          additionals: additionalsList
        });
      })
    );

    this.brandModelPrizeCar$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap((x) => {
        const currentMotor = x[0].motor.vehicles.filter(
          (c) => c.number === x[1].activeMotor
        )[0];

        // SI NO TENGO AUTO
        if (currentMotor.year === null) {
          return of({});
        }

        return of({
          type: currentMotor.group,
          brand: currentMotor?.brand?.description,
          model: currentMotor?.model?.description,
          //! ML: Esto hay que verificarlo
          prize:
            currentMotor.statedamount || currentMotor?.model?.statementamount
        });
      })
    );

    this.rebillingPeriod$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(
        switchMap((x) => {
          let periodMethod = '';
          switch (x.period.method) {
            case 'Sura_ThreeMonths':
              periodMethod = 'Trimestral';
              break;
            case 'HalfYear':
              periodMethod = 'Semestral';
              break;
            case 'Sura_OneMonth':
              periodMethod = 'Mensual';
              break;
            case 'Annual':
              periodMethod = 'Anual';
              break;
            default:
              break;
          }
          return of(periodMethod);
        })
      );

    this.fiscalCondition$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.fiscalConditionService.getAllFiscalCondition()
    ]).pipe(
      switchMap((x) => {
        const fiscalCondition = x[1].filter(
          (f) => f.code === x[0].fiscalcondition
        )[0].description;
        return of(fiscalCondition);
      })
    );

    this.discountAndCommission$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(
        switchMap((x) => {
          const discount = x?.motor?.discounts.find(
            (d) => d.code === 'SuraCA7_ExternalComercialDiscount'
          )?.value;

          return of({
            discount,
            commission: x.motor.commission.producer
          });
        })
      );

    this.campaign$ = this.storePolicy.select(fromPolicy.getPolicyData).pipe(
      distinctUntilKeyChanged('campaign'),
      switchMap((policy: IPolicy) => {
        if (policy?.campaign) {
          return of([policy.campaign]);
        }

        return of((null as unknown) as ICampaign[]);
      }),
      tap((campaign: ICampaign[]) => {
        if (campaign !== null) this.formCampaign.setValue(campaign[0].id);
      })
    );

    this.installments$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(map((x: IPolicy) => x.paymentTerm.maximumnumberofinstallments));

    this.issueError$ = this.subject.pipe(share());

    this.emissionStoreSubscription = this.storeEmission
      .select(fromEmission.getEmission)
      .subscribe((emission) => {
        this.isApprovedEmission = emission.approvedEmission;
        this.disabledByRetrieve = emission.jobNumberFromQuotes ? true : false;
      });

    this.paymentMethod$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(
        distinctUntilKeyChanged('payment'),
        switchMap((policy) => {
          if (policy.payment) {
            return this.paymentMethodService
              .getAllPaymentMethods(policy.job)
              .pipe(
                switchMap((ps) => {
                  return of(
                    ps.filter((c) => {
                      return c.code === policy.payment.method;
                    })[0]
                  );
                })
              );
          } else {
            return of(EMPTY);
          }
        })
      );

    this.paymentPlan$ = this.storePolicy.select(fromPolicy.getPolicyData).pipe(
      first(),
      switchMap((policy) => {
        if (policy) {
          return this.paymentPlansService
            .getAllPaymentPlans(
              'ars',
              policy.payment.method as string,
              policy.producer.code,
              new Date(policy.period.start).toISOString(),
              new Date(policy.period.end).toISOString()
            )
            .pipe(
              switchMap((pp) => {
                const currentPlan = pp.find(
                  (plan) => plan.code === policy.payment.plan.code
                ) as IPaymentPlan;

                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentPaymentTermAction(currentPlan)
                );

                return of(currentPlan);
              })
            );
        } else {
          return of(EMPTY);
        }
      })
    );
  }

  ngOnDestroy() {
    this.emissionStoreSubscription?.unsubscribe();
    this.updateCostSubscription?.unsubscribe();
  }

  checkUW() {
    // ML: Según la US-5866 no debe saltar un modal en esta instancia
    // ya que en la instancia de DNI y PATENTE ya se avisa que existe UW
    this.issuePolicy();
  }

  issuePolicy() {
    this.loadingIssue$.next(true);

    if (this.isApprovedEmission) {
      this.quotingService.emitPolicy(this.currentPolicy).subscribe(
        (data) => this.issueSuccess(data),
        (err) => this.issueError(err)
      );
      return;
    }

    const adapted = this.quoteIssueAdapter.adapt(this.currentPolicy);
    this.quotingService.issuePolicy(adapted).subscribe(
      (data) => this.issueSuccess(data),
      (err) => this.issueError(err)
    );
  }

  closeModal() {
    this.child_component.closeModal();
  }

  goThankYouPage() {
    this.child_component.closeModal();
    this.storeEmission.dispatch(new fromEmissionActions.SetUWIssueAction(true));
    this.router.navigateByUrl('quoting/thankyou');
  }

  closeUWModal(reasonClose = null) {
    if (reasonClose === 'continue') {
      this.issuePolicy();
    }
    this.uwEmision.closeModal();
  }

  getAssistanceDescription(code: string): Observable<string> {
    const currentCode: any = code;
    //FIXME: ML - En el momento de RETRIEVE no cuento con los datos de asistencias
    const assistance = [
      { code: 'SOSBasic', description: 'SOS Básica' },
      { code: 'SOSPremium', description: 'SOS Premium' },
      { code: 'NoAssistance', description: 'Sin Asistencia' }
    ];

    return of(
      assistance.find((a) => a.code === currentCode)?.description ||
        'Sin Asistencia'
    );
    // return this.storePolicy.select(fromQuote.getQuoteMotorData).pipe(
    //   switchMap((x) => {
    //     return of(
    //       x.mechanicalAssists.filter((ass) => ass.code === code)[0].description
    //     );
    //   })
    // );
  }

  goCoverage() {
    this.router.navigateByUrl(
      'quoting/coverage/' + this.currentMotor.number + ''
    );
  }
  goQuote() {
    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor(
        'motor/' + this.currentMotor.number + '/sum'
      )
    );
    this.storeQuote.dispatch(new fromQuoteActions.SetCurrentLine('motor'));
    this.router.navigateByUrl(
      '/quoting/quote/questions/motor/' + this.currentMotor.number + '/sum'
    );
    this.modalEditCoverage.closeModal();
  }
  openModal() {
    this.modalEditCoverage.openModal();
  }

  goCoverageVehicles(VehicleNumber: any) {
    this.storeQuote.dispatch(
      new fromQuoteActions.SetCurrentMotorAction(VehicleNumber)
    );
    this.closeVehicleDetails();
    this.router.navigateByUrl('quoting/coverage/' + VehicleNumber + '');
  }
  issueSuccess(data: any) {
    this.loadingIssue$.next(false);
    if (data.inspection) {
      this.storePolicy.dispatch(
        new fromPolicyActions.SetInspectionStatusAction(data.inspection.status)
      );
    }
    if (data.policynumber) {
      this.storePolicy.dispatch(
        new fromPolicyActions.SetPolicyNumberAction(data.policynumber)
      );
      this.storeEmission.dispatch(
        new fromEmissionActions.SetUWIssueAction(false)
      );

      if (!data.inspection) {
        this.router.navigateByUrl('quoting/thankyou');
      } else {
        if (this.currentMotor.zerokm) {
          this.router.navigateByUrl('quoting/thankyou');
        } else {
          this.router.navigateByUrl('quoting/inspection');
        }
      }
    } else if (data.inspection?.status) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetUWIssueAction(false)
      );
      if (this.currentMotor.zerokm) {
        this.router.navigateByUrl('quoting/thankyou');
      } else {
        this.router.navigateByUrl('quoting/inspection');
      }
    } else if (data.error?.code === BACKEND_ERRORS.UNDERWRITER) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetUWIssueAction(true)
      );
      this.router.navigateByUrl('quoting/thankyou');
    } else {
      this.subject.next(data.error);
      // this.issueError = data.error.description;
      this.child_component.openModal();
    }
  }

  issueError(err: HttpErrorResponse | any) {
    //FIXME: JC: Parche para evaluar errores ante un status 500 cuando sea una validacion de negocio. (UW)
    this.loadingIssue$.next(false);
    if (err.code === BACKEND_ERRORS.UNDERWRITER) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetUWIssueAction(true)
      );
      this.router.navigateByUrl('quoting/thankyou');
    } else if (err.message.includes('Bad Request')) {
      this.notificationService.notify({
        code: -2,
        description: 'Ha ocurrido un error, por favor intentelo mas tarde'
      });
    } else {
      this.notificationService.notify({
        code: -2,
        description: err.message.replace(/^[^:]+: */, '')
      });
    }
  }

  openVehicleDetails() {
    this.vehicleDetails.openModal();
  }

  closeVehicleDetails() {
    this.vehicleDetails.closeModal();
  }

  /**
   * Function to get package description of current vehicle
   *
   * @param {IVehicle} vehicle
   * @returns
   * @memberof DetailsComponent
   */
  getSelectedPackage(vehicle: IVehicle) {
    return (
      vehicle.packages?.find((p) => p.selected)?.description ||
      vehicle.package?.description
    );
  }

  /**
   * Function to get currente mechanical assistance of
   * current vehicle
   *
   * @param {IVehicle} vehicle
   * @returns
   * @memberof DetailsComponent
   */
  getSelectedMechanicalAssistance(vehicle: IVehicle) {
    const currentAssistance =
      vehicle?.packages
        ?.find((p) => p.selected)
        ?.coverages?.find(
          (c) => c.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov'
        )?.terms[0] ||
      vehicle.package?.coverages?.find(
        (c) => c.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov'
      )?.terms[0];

    const descriptions = [
      { value: 'SOSBasic', description: 'SOS Básica' },
      { value: 'SOSPremium', description: 'SOS Premium' },
      { value: 'NoAssistance', description: 'Sin Asistencia' }
    ];

    return (
      descriptions.find((d) => d.value === currentAssistance?.value?.current)
        ?.description || 'Sin Asistencia'
    );
  }

  /**
   * Function to filter additionals of selected vehicle
   *
   * @param {IVehicle} vehicle
   * @returns
   * @memberof DetailsComponent
   */
  getSelectedAdditionals(vehicle: IVehicle) {
    const additionals =
      vehicle.packages?.find((p) => p.selected)?.coverages ||
      vehicle.package?.coverages;

    const additionalsGroups = [
      'SURA_CA7_CobAdicionalesGrp',
      'SURA_CA7_AccesoriosGrp'
    ];

    const additionalExcludeCodes = [
      'SURA_CA7_AsistenciaMecanicaCov',
      'SURA_CA7_ClausulaDeAjusteCov',
      'SURA_CA7_MobilityTheftDamageCov',
      'SURA_CA7_MobilityDeathCov',
      'SURA_CA7_MobilityIncapacityCov',
      'SURA_CA7_MobilityBoneFractureCov',
      'SURA_CA7_MobilityInterIncomeCov',
      'SURA_CA7_MobilityDamageToThirdCov',
      'SURA_CA7_MobilityTheftPersonalEffectsCov',
      'SURA_CA7_MobilityTheftPersonalDocCov',
      'SURA_CA7_MobilityTheftElectronicEquipCov'
    ];

    return (
      additionals?.filter(
        (ad) =>
          additionalsGroups.includes(ad?.category?.code as string) &&
          !additionalExcludeCodes.includes(ad?.pattern?.code as string)
      ) || []
    );
  }
}
