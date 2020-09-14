import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as fromQuote from '../../../quote/state';
import * as fromPolicy from '../../../../state/policy';
//import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import {
  IHouse,
  AmountsService,
  QuotingService,
  IPolicy,
  IAmounts,
  IPackage,
  IPayment
} from '@sura-platform/features';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ProducerService } from '@sura-platform/features/producer';
import { tap } from 'rxjs/operators';
import * as fromProducer from '../../../../../producer/state';
import * as fromProducerActions from '../../../../../producer/state/producer.actions';
import { CoveragesAdapter } from '../../../../adapters/coverages.adapter';
import { HOME_CONF } from '../../home.config';
import { blockTypeCoverages } from '../coverage/listcoverages.enum';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { ITerm, IPattern } from '@sura-platform/features/coverage';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';

export enum KEY_CODE {
  ENTER = 'Enter'
}

@Component({
  selector: 'sxf-home-m2',
  templateUrl: './m2.component.html',
  styleUrls: ['./m2.component.scss']
})
export class M2Component implements OnInit, OnDestroy {
  /**
   * Current house number
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

  quoteHomeSubscription: Subscription = new Subscription();

  /**
   * Current House of houses vector
   */
  currentHouse: IHouse = <IHouse>{};

  /**
   * Home m2 form
   *
   * @type {FormGroup}
   * @memberof M2Component
   */
  form: FormGroup = <FormGroup>{};

  m2Mask: any;

  producersSubscription: Subscription = new Subscription();

  disabledBtnProducer = false;

  policySubscription: Subscription = new Subscription();

  /**
   * Current policy
   */
  policy: IPolicy = <IPolicy>{};

  loadingCoverage = false;

  listCoverages: IAmounts = <IAmounts>{};

  packages: any = <any>{};

  /**
   * Lottie animations.
   */
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  payment: IPayment = <IPayment>{};

  profileSubscription: Subscription = new Subscription();

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private flowRouteService: FlowRouteService,
    private fb: FormBuilder,
    private producerService: ProducerService,
    private storeProducer: Store<fromProducer.State>,
    private amountService: AmountsService,
    private quotingService: QuotingService,
    private coveragesAdapter: CoveragesAdapter,
    private router: Router
  ) {}

  ngOnInit() {
    this.producersSubscription = this.producerService
      .getAllProducers()
      .pipe(
        tap((pro) => {
          const producer = pro[0].code;
          this.storeProducer.dispatch(
            new fromProducerActions.SetCurrentProducerAction(producer)
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.SetCurrentProducerAction(producer)
          );
        })
      )
      .subscribe((prod) => {
        this.loadProfileProducer(prod[0].code);
      });

    this.policySubscription = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((policy: IPolicy) => {
        this.policy = policy;
      });

    this.m2Mask = createNumberMask({
      prefix: '',
      thousandsSeparatorSymbol: '.'
    });

    this.form = this.fb.group({
      m2: [null, [Validators.required]]
    });

    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeData),
      this.storeQuote.select(fromPolicy.getHouses)
    ]).subscribe(([homeData, houses]) => {
      this.currentHome = homeData.activeHome;
      this.routes = <IRoutes[]>homeData.routes;
      this.houses = houses;
      this.currentHouse = <IHouse>(
        this.houses.find((h) => h.id === this.currentHome)
      );
    });

    // this.form.get('m2').valueChanges.subscribe((m2) => {
    //   console.log('M2', m2);
    // });
  }

  //FIXME: DG esto es temporal mientras se agrega stepper
  loadProfileProducer(code: any) {
    this.profileSubscription = this.producerService
      .getProfile(code)
      .subscribe((profile) => {
        this.disabledBtnProducer = true;
        this.storeProducer.dispatch(
          new fromProducerActions.SetCurrentProducerProfile(profile)
        );
      });
  }

  /**
   * Method use to go to the next question
   *
   * @memberof HomeUseComponent
   */
  continue() {
    const house = this.houses.find(
      (data: any) => data.id === this.currentHome
    ) as IHouse;
    house.m2 = this.form.get('m2')?.value;
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );
    this.flowRouteService.enableHomeRoute(
      this.currentHome as number,
      this.routes,
      'm2',
      'm2',
      this.form.get('m2')?.value
    );

    this.loadCoverages();
  }

  //us-8124
  setDefaultValues(fiscalCondition: any, paymentMethod: any, productCode: any) {
    this.payment = {
      ...this.payment,
      method: paymentMethod
    };

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentFiscalConditionAction(fiscalCondition)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrenProductCodeAction(productCode)
    );
  }

  loadCoverages() {
    this.loadingCoverage = true;
    const policy: IPolicy = this.coveragesAdapter.adaptHome(this.policy);
    //valores por defecto, segun US-8124
    //luego se cambiaran al poner el sidebar de resumen
    policy.fiscalcondition = 'consumidorFinal';
    policy.payment.method = 'CreditCard';
    policy.productcode = 'Homeowners';

    this.setDefaultValues(
      policy.fiscalcondition,
      policy.payment.method,
      policy.productcode
    );

    const coverages$ = this.quotingService.getCoverages(policy);

    const amounts$ = this.amountService.getAmounts(
      this.currentHouse.type as string,
      this.currentHouse.m2 as number,
      this.currentHouse.zone.city as string,
      `${this.currentHouse.zone.postalcode}`
    );

    forkJoin([coverages$, amounts$])
      .pipe(
        tap(([coverages, amounts]) => {
          const resultCoverage: any = coverages;
          this.listCoverages.coverages = [];

          HOME_CONF.orderCoverage.forEach((codeCoverage) => {
            const filterCoverage = amounts.coverages.find(
              (lc) => lc.pattern.code === codeCoverage
            );
            if (filterCoverage) {
              if (
                HOME_CONF.codesBenefitsCoverages.includes(
                  filterCoverage.pattern.code
                )
              ) {
                filterCoverage.category.block = blockTypeCoverages.BENEFITS;
              } else if (
                HOME_CONF.codesPlanPremiumsCoverages.includes(
                  filterCoverage.pattern.code
                )
              ) {
                filterCoverage.category.block = blockTypeCoverages.PREMIUM;
              } else {
                filterCoverage.category.block = blockTypeCoverages.OTHERS;
              }

              filterCoverage.category.visible = HOME_CONF.codesExcludeCoverages.includes(
                filterCoverage.pattern.code
              )
                ? false
                : true;
              filterCoverage.category.editable = HOME_CONF.codesNoEditables.includes(
                filterCoverage.pattern.code
              )
                ? false
                : true;

              const searchInherit = HOME_CONF.codesInheritable.find(
                (ci) => ci.code === filterCoverage.pattern.code
              );
              if (searchInherit) {
                filterCoverage.inherit = true;
                filterCoverage.child = [];
                searchInherit.childs.forEach((sc) => {
                  const covChild = amounts.coverages.find(
                    (lc) => lc.pattern.code === sc
                  );
                  if (covChild) {
                    filterCoverage?.child?.push({
                      description: covChild.pattern.description,
                      suggested: <string>covChild.terms[0].value.suggested
                    });
                  }
                });
              } else {
                filterCoverage.inherit = false;
              }
              this.listCoverages.coverages.push(filterCoverage);
            } //else { //no tiene suma asegurada
            //   console.log('NO ENTRA:' + codeCoverage);
            // }
          });

          this.storeQuote.dispatch(
            new fromQuoteActions.SetSuggestedSumsAction(this.listCoverages)
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.SetJob(coverages.job.number)
          );
          this.storePolicy.dispatch(
            new fromPolicyActions.SetPeriodData(coverages.period)
          );

          this.currentHouse.packages = [];
          HOME_CONF.packages.forEach((pk) => {
            if (
              resultCoverage.home.dwellings
                .find((dw: any) => dw.number === this.currentHome)
                .packages.find((pg: any) => pg.code === pk.code)
            ) {
              const pck: IPackage = <IPackage>{};
              pck.code = pk.code;
              pck.description = pk.description;
              pck.selected = false;
              pck.coverages = [];
              pk.coverages.map((code: string) => {
                const filterCoverage = amounts.coverages.find(
                  (lc) => lc.pattern.code === code
                );

                const termTemp: ITerm[] = [];
                termTemp.push({
                  code: <string>(
                    (filterCoverage ? filterCoverage.terms[0].code : null)
                  ),
                  value: {
                    current: <string>(
                      (filterCoverage
                        ? filterCoverage.terms[0].value.suggested
                        : null)
                    )
                  },
                  options: null
                });

                let patternTemp: IPattern = <IPattern>{};
                patternTemp = {
                  code: code,
                  description: <string>(
                    (filterCoverage ? filterCoverage.pattern.description : null)
                  )
                };
                pck?.coverages?.push({
                  pattern: patternTemp,
                  terms: termTemp
                });
              });
              this.currentHouse?.packages?.push(pck);
            }
            //pck.coverages
          });

          const result = resultCoverage.home.dwellings.find(
            (dw: any) => dw.number === this.currentHome
          );

          this.currentHouse = <IHouse>(
            this.houses.find((h) => h.id === this.currentHome)
          );

          if (this.currentHouse) {
            this.currentHouse.differentialcircuitbreaker =
              result?.differentialcircuitbreaker;
            this.currentHouse.embeddedelectricalwiring =
              result?.embeddedelectricalwiring;
            this.currentHouse.goodconditionelectric =
              result?.goodconditionelectric;
            this.currentHouse.soundalarmwithmonitoring =
              result?.soundalarmwithmonitoring;
            this.currentHouse.soundalarmonly = result?.soundalarmonly;
            this.currentHouse.reinforceddoor = result?.reinforceddoor;
            this.currentHouse.permanentvigilance = result?.permanentvigilance;
            this.currentHouse.doublelock = result?.doublelock;
          }

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateHouseAction(this.houses)
          );

          //separo coverages por default
          //porque la visual de chulitos y X se debe mantener
          //y sin embargo se podria cotizar una sola cobertura
          //y no las default
          const defaultCovAll = <IHouse[]>cloneDeep(this.houses);
          this.storeQuote.dispatch(
            new fromQuoteActions.SetDefaultCoverageByPckAction(defaultCovAll)
          );
        })
      )
      .subscribe(() => {
        this.loadingCoverage = false;
        this.router.navigateByUrl('/quoting/home/coverage/' + this.currentHome);
      });
  }

  ngOnDestroy(): void {
    if (this.quoteHomeSubscription) this.quoteHomeSubscription.unsubscribe();
    if (this.producersSubscription) this.producersSubscription.unsubscribe();
    if (this.profileSubscription) this.profileSubscription.unsubscribe();
  }
}
