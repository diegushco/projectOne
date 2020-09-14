import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  combineLatest,
  Subscription,
  Observable,
  of,
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  IHouse,
  IPolicy,
  IAmounts,
  IHomeCoverages,
  AditionalAccessoriesService,
  IPackage,
  ComissionService,
  DiscountService,
  IDiscount,
  PeriodMethodService,
  PaymentMethodService,
  IPayment,
  PaymentPlansService,
  IPaymentPlan,
  QuotingService,
  ICost,
  DefaultAssistanceService,
  IDefaultAssistance
} from '@sura-platform/features';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import * as fromQuote from '../../../quote/state';
import * as fromPolicy from '../../../../state/policy';
import { Store } from '@ngrx/store';
import { tap, switchMap } from 'rxjs/operators';
import { CoveragesAdapter } from '../../../../adapters/coverages.adapter';
import { HOME_CONF } from '../../home.config';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromProducerReducer from '../../../../../producer/state/producer.reducer';
import * as fromProducer from '../../../../../producer/state';
import { IProducer } from '@sura-platform/features/producer';
import { PolicyAdapter } from '../../../../adapters/policy.adapter';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
@Component({
  selector: 'sxf-homecoverage',
  templateUrl: 'coverage.component.html',
  styleUrls: ['coverage.component.scss']
})
export class HomeCoverageComponent implements OnInit, OnDestroy {
  quoteHomeSubscription: Subscription = new Subscription();

  policySubscription: Subscription = new Subscription();

  /**
   * Current house numberimport * as fromQuote from '../../../quote/state';
import * as fromPolicy from '../../../../state/policy';
   */
  currentHome: number | null = 0;

  /**
   * Home routes
   */
  routes: IRoutes[] = <IRoutes[]>{};

  /**
   * All houses
   */
  houses: IHouse[] = <IHouse[]>{};

  /**
   * Current House of houses vector
   */
  currentHouse: IHouse = <IHouse>{};

  /**
   * Current policy
   */
  policy: IPolicy = <IPolicy>{};

  /**
   * true loading List Coverages
   * false not loading List Coverages
   *
   * @memberof HomeCoverageComponent
   */
  loadingList = false;

  /**
   * true loading Packages CoveragesDiscountService
  /**
   * true loading Additionals
   * false not loading Additionals
   *
   * @memberof HomeCoverageComponent
   */
  loadingAdditionals = true;

  listCoverages: IAmounts = <IAmounts>{};
  listSumSuggests: IHomeCoverages[] = <IHomeCoverages[]>{};

  packages: any = <any>{};

  sumSuggestedSubscription: Subscription = new Subscription();

  showMessageIncendio = false;

  /**
   * Pass to blockcoverage to collapse Others coverages
   *
   * @memberof HomeCoverageComponent
   */
  showOthersStatus = false;

  /**
   * Pass to blockcoverage to collapse Premiums coverages
   *
   * @memberof HomeCoverageComponent
   */
  showPremiumsStatus = false;

  /**
   * Pass to blockcoverage to sync styles
   *
   * @memberof HomeCoverageComponent
   */
  checkUncheckCoverage: any[] = [];

  /**
   * variable for save defaultCommission in the store
   */
  defaultCommission: number | undefined;

  /**
   * variable for save defaultDiscount in the store
   */
  defaultDiscount: IDiscount[] = <IDiscount[]>{};

  /**
   * variable for save IPaymentMethod in the store
   */
  payment: IPayment = <IPayment>{};

  /**
   * variable for save IProducer in the store
   */
  currentProducer: IProducer = <IProducer>{};

  /**
   * Get payments plans from service and store it
   */
  paymentPlan$: Observable<IPaymentPlan[]> | undefined;

  defaultValues$: Observable<any> | undefined;

  resultCosts$ = new BehaviorSubject<any>(null);

  costsResponseSubscription: Subscription = new Subscription();

  loadingCost = true;

  getCosts$ = new Subject<void>();

  costsSubscription: Subscription = new Subscription();

  isAllLoad = false;

  isFormValid = false;

  currentCost: ICost[] = <ICost[]>{};

  costsQuoteSubscription: Subscription = new Subscription();

  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/inside-inputs-loader.json'
  };

  paymentTermSubscription: Subscription = new Subscription();

  paymentTerm: IPaymentPlan = <IPaymentPlan>{};

  defaultAssistance: IDefaultAssistance = <IDefaultAssistance>{};

  hoverPackage = 0;

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private coveragesAdapter: CoveragesAdapter,
    private additionalService: AditionalAccessoriesService,
    private comissionService: ComissionService,
    private discountService: DiscountService,
    private periodsMethodService: PeriodMethodService,
    private paymentMethodService: PaymentMethodService,
    private paymentPlansService: PaymentPlansService,
    private producerStore: Store<fromProducerReducer.ProducerState>,
    private quotingService: QuotingService,
    private policyAdapter: PolicyAdapter,
    private defaultAssistanceService: DefaultAssistanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingList = true;
    this.policySubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.producerStore.select(fromProducer.getCurrentProducer)
    ]).subscribe((dat: any) => {
      this.currentProducer = <IProducer>dat[2];
      this.policy = dat[0];
      this.currentHome = dat[1];
      const housePolicy = dat[0].home.dwellings.find(
        (h: any) => h.number === this.currentHome
      );
      this.packages = housePolicy?.packages;
    });

    this.sumSuggestedSubscription = this.storePolicy
      .select(fromQuote.getsuggestedSums)
      .subscribe((sumSuggest) => {
        this.listSumSuggests = <IHomeCoverages[]>sumSuggest?.coverages;
        this.loadingList = false;
      });

    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.storePolicy.select(fromQuote.getQuoteHomeRoutes),
      this.storeQuote.select(fromPolicy.getHouses)
    ])
      .pipe(
        tap(([homeActive, homeRoutes, houses]) => {
          this.currentHome = homeActive;
          this.routes = <IRoutes[]>homeRoutes;
          this.houses = houses;
          this.currentHouse = <IHouse>(
            this.houses.find((h) => h.id === this.currentHome)
          );
        })
      )
      .subscribe(() => {
        this.loadingList = false;
      });

    this.loadDefaultValues();

    this.costsResponseSubscription = this.resultCosts$.subscribe((response) => {
      if (response) {
        this.storeQuote.dispatch(
          new fromQuoteActions.SetCostsHomeResponseAction(response)
        );

        this.houses
          ?.find((h) => h.id === this.currentHome)
          ?.packages?.forEach((pk) => {
            pk.premiums = response.home.dwellings
              .find((h: any) => h.number === this.currentHome)
              .packages.find((cpk: any) => cpk.code === pk.code)?.premiums;
          });
        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateHouseAction(this.houses)
        );
      }
    });

    this.costsSubscription = this.getCosts$
      .pipe(
        switchMap(() =>
          this.quotingService.getCosts(
            this.policyAdapter.adaptHome(this.policy as IPolicy)
          )
        )
      )
      .subscribe((policy: IPolicy) => {
        this.resultCosts$.next(policy);
        this.loadingCost = false;
      });

    this.costsQuoteSubscription = this.storeQuote
      .select(fromQuote.getHomeCosts)
      .subscribe((costs) => {
        this.currentCost = <ICost[]>costs;
      });

    this.paymentTermSubscription = this.storePolicy
      .select(fromPolicy.getPaymentTerm)
      .subscribe((data) => {
        this.paymentTerm = data;
      });
  }

  callCostFromList() {
    this.isFormValid = true;
    this.checkCall();
  }

  checkCall() {
    if (this.isAllLoad && this.isFormValid) {
      this.callCost();
    }
  }

  callCost() {
    this.loadingCost = true;
    this.resultCosts$.next(null);
    this.getCosts$.next();
  }

  loadDefaultValues() {
    const reqComisions = {
      job: { number: this.policy.job.number }
    };

    this.defaultValues$ = combineLatest([
      this.discountService.getAllDiscounts(reqComisions),
      this.comissionService.getAllComissions(reqComisions),
      this.periodsMethodService.getAllPeriodMethods(reqComisions),
      this.paymentMethodService.getAllPaymentMethods(this.policy.job),
      this.defaultAssistanceService.getDefaultAssistance(
        this.currentProducer.profile.channel,
        this.currentProducer.code
      )
    ]).pipe(
      tap(
        ([discount, commission, period, paymentMethod, defaultAssistance]) => {
          this.defaultAssistance = defaultAssistance;
          this.loadAdditionals(HOME_CONF.callCoveragePackage);
          this.defaultCommission = commission.default;
          this.defaultDiscount = discount;
          this.defaultDiscount[0].value = 0;

          const creditCardOption = paymentMethod.filter((x) =>
            x.code.toString().toLowerCase().includes('credit')
          );

          this.payment = {
            ...this.payment,
            method: creditCardOption[0].code.toString()
          };

          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentPaymentMethodAction(
              <IPayment>this.payment
            )
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentPeriodMethod(period[0])
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentDiscountAction(this.defaultDiscount)
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentCommissionAction(
              this.defaultCommission
            )
          );

          this.paymentPlan$ = this.paymentPlansService
            .getAllPaymentPlans(
              'ars',
              creditCardOption[0].code,
              this.currentProducer.code,
              <string>this.policy?.period?.start?.toString(),
              <string>this.policy?.period?.end?.toString()
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

                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentPaymentTermAction(
                    pm[pm.length - 1]
                  )
                );

                if (this.payment) {
                  this.payment = {
                    ...this.payment,
                    plan: {
                      ...this.payment.plan,
                      code: pm[pm.length - 1].code
                    }
                  };

                  this.storePolicy.dispatch(
                    new fromPolicyActions.SetCurrentPaymentMethodAction(
                      this.payment
                    )
                  );
                }

                return of(pm);
              }),
              tap(() => {
                this.isAllLoad = true;
                this.checkCall();
              })
            );
        }
      )
    );
  }

  loadAdditionals(pkg: IPackage) {
    this.loadingAdditionals = true;
    const policy: IPolicy = this.coveragesAdapter.adaptAdditionalHome(
      this.policy
    );
    if (policy.home.dwellings) {
      let housePolicy: IHouse = <IHouse>{};
      housePolicy = <IHouse>(
        policy.home.dwellings.find((dw: any) => dw.number === this.currentHome)
      );
      if (housePolicy) housePolicy.package = <IPackage>pkg;

      this.additionalService
        .getAdditionalAccessorios(policy)
        .subscribe((ad) => {
          const coverageAdditional = ad.home.dwellings.find(
            (dw: any) => dw.number === this.currentHome
          ).package.coverages;

          this.listSumSuggests.forEach((li) => {
            const toCheckCode = coverageAdditional.find(
              (cv: any) => cv.pattern.code === li.pattern.code
            );
            if (toCheckCode && toCheckCode?.terms[0]?.value?.max) {
              li.terms[0].value.max = toCheckCode?.terms[0]?.value?.max;
            } else {
              li.terms[0].value.max = null;
            }
            if (toCheckCode && toCheckCode?.terms[0]?.value?.min) {
              li.terms[0].value.min = toCheckCode?.terms[0]?.value?.min;
            } else {
              li.terms[0].value.min = null;
            }
          });

          this.listCoverages.coverages = this.listSumSuggests;

          this.storeQuote.dispatch(
            new fromQuoteActions.SetSuggestedSumsAction(this.listCoverages)
          );

          let assistanceHome = coverageAdditional.find(
            (cv: any) => cv.pattern.code === 'SURA_HOE_Asistencia'
          );
          const termsTemp: any[] = [];

          termsTemp.push({
            code: assistanceHome.terms[0].code,
            options: assistanceHome.terms[0].options,
            value: this.defaultAssistance.value
          });
          assistanceHome = {
            ...assistanceHome,
            terms: termsTemp
          };
          this.storeQuote.dispatch(
            new fromQuoteActions.SetHomeAssistanceAction(assistanceHome)
          );

          this.loadingAdditionals = false;
        });
    }
  }

  procesaPropagar(value: boolean) {
    this.showMessageIncendio = value;
  }

  processShowOthers(value: boolean) {
    this.showOthersStatus = value;
  }

  processShowPremiums(value: boolean) {
    this.showPremiumsStatus = value;
  }

  processCheckUncheckCoverage(value: any[]) {
    this.checkUncheckCoverage = value;
  }

  getCostPck(currentPck: any) {
    if (!this.loadingCost) {
      const priceInvoice = this.currentCost?.find((cost) =>
        cost.externalId
          .split('&')
          .includes(
            `${this.policy.productcode},${this.currentHome},${currentPck.code}`
          )
      );
      if (priceInvoice && priceInvoice.invoice) {
        return priceInvoice.invoice;
      }
    }
    return 0;
  }

  selected(pckSelected: IPackage) {
    pckSelected.selected = true;
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );

    this.router.navigateByUrl('/quoting/summary');
  }

  /**
   * Mouse over on button select
   *
   * @param {number} pkg
   * @memberof HomeCoverageComponent
   */
  overBtnSelect(pkg: number) {
    this.hoverPackage = pkg;
  }

  /**
   * Mouse out on button select
   *
   * @memberof HomeCoverageComponent
   */
  outBtnSelect() {
    this.hoverPackage = 0;
  }

  ngOnDestroy() {
    if (this.quoteHomeSubscription) this.quoteHomeSubscription.unsubscribe();
    if (this.policySubscription) this.policySubscription.unsubscribe();
    if (this.sumSuggestedSubscription)
      this.sumSuggestedSubscription.unsubscribe();
    if (this.costsSubscription) this.costsSubscription.unsubscribe();
    if (this.costsResponseSubscription)
      this.costsResponseSubscription.unsubscribe();
  }
}
