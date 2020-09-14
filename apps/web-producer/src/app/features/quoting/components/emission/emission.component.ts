import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import { Router, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromQuote from '../quote/state/index';
import * as fromQuoteActions from '../quote/state/quote.actions';
import * as fromEmissionReducer from './state/emission.reducer';
import * as fromEmissionActions from './state/emission.actions';
import * as fromEmission from './state';
import * as fromPolicyActions from '../../state/policy/policy.actions';
import * as fromPolicy from '../../state/policy';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import {
  DiscountService,
  IDiscount,
  QuotingService,
  IPolicy,
  IVehicle,
  IPackage
} from '@sura-platform/features';
import { ModalComponent } from '@sura-platform/web';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription, of, combineLatest, throwError } from 'rxjs';
import {
  switchMap,
  tap,
  first,
  catchError,
  debounceTime
} from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';
import { PolicyAdapter } from '../../adapters/policy.adapter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sxf-emission',
  templateUrl: './emission.component.html',
  styleUrls: ['./emission.component.scss']
})
export class EmissionComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @ViewChild('modalCupos') modalCupos: ModalComponent = <ModalComponent>{};

  /**
   * Current routes
   */
  routes: IRoutes[] = [];

  /**
   * Current policy
   */
  policy: IPolicy = <IPolicy>{};

  /**
   * Discounts to be modified to get new costs
   */
  discounts: IDiscount[] = [];

  /**
   * Flag used to check if costs request is loading
   */
  loadingCosts = false;

  /**
   * Flag used to detect if the quote has new costs
   */
  newCost = false;

  emissionSubscription: Subscription = new Subscription();
  policySubscription: Subscription = new Subscription();
  discountSubscription: Subscription = new Subscription();

  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  constructor(
    private router: Router,
    private storeQuote: Store<fromQuote.State>,
    private storeEmission: Store<fromEmissionReducer.EmissionState>,
    private storePolicy: Store<fromPolicy.State>,
    private discountService: DiscountService,
    private quotingService: QuotingService,
    private policyAdapter: PolicyAdapter
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.storeEmission.select(fromEmission.getEmissionHasVisited),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ])
      .subscribe(([visited, policy]) => {
        if (!visited) {
          this.storeQuote.dispatch(
            new fromQuoteActions.SetCurrentMotorAction(1)
          );

          const group = policy?.motor?.vehicles
            ?.find((v) => v.number === 1)
            ?.packages?.find((p) => p.selected)?.group;

          this.storeQuote.dispatch(
            new fromQuoteActions.SetGroupCoverage(<string>group)
          );
        }
      })
      .unsubscribe();

    this.storeEmission.dispatch(
      new fromEmissionActions.SetEmissionVisited(true)
    );

    this.emissionSubscription = this.storeEmission
      .select(fromEmission.getRoutes)
      .subscribe((data: IRoutes[]) => {
        if (data.length < 1) {
          let routerConf: any = {};
          routerConf = this.router?.config?.find((x) => x.path === 'quoting');
          if (routerConf) {
            routerConf['_loadedConfig']['routes'][0]['children']
              .find((r: any) => r.path === 'emission')
              ['_loadedConfig']['routes'][0]['children'][0]['children'].forEach(
                (element: Route) => {
                  const path = String(element.path).replace(':id', String(1));
                  let dataElement: any = {};
                  dataElement = element;
                  this.routes.push({
                    path: path,
                    question: dataElement['data']['question'],
                    show: dataElement['data']['show'],
                    disabled: dataElement['data']['disabled'],
                    value: dataElement['data']['value'],
                    shortName: dataElement['data']['shortName'],
                    visible: dataElement['data']['visible'],
                    line: dataElement['data']['line']
                  });
                }
              );

            this.storeEmission.dispatch(
              new fromEmissionActions.SetRoutes(this.routes)
            );
            this.storeEmission.dispatch(
              new fromEmissionActions.SetActiveRoute('client')
            );
          }
        }
      });

    this.policySubscription = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((policy) => (this.policy = cloneDeep(policy)));

    //this.checkDiscount();
  }

  /**
   * Check if quote has discount and there
   * are no discount available
   *
   * @memberof EmissionComponent
   */
  checkDiscount() {
    this.discountSubscription = combineLatest([
      this.storeEmission.select(fromEmission.getEmission),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ])
      .pipe(
        debounceTime(500),
        tap((x) => {
          this.discounts = cloneDeep(x[1].motor.discounts);
        }),
        switchMap((x) => {
          const emission = x[0];
          const policy = x[1];

          if (
            !emission.jobNumberFromQuotes ||
            !policy.motor.discounts.some((d) => d.value > 0)
          ) {
            return of(null);
          }

          return this.discountService.getAvailableDiscounts({
            job: {
              number: policy.job.number
            }
          });
        }),
        first()
      )
      .subscribe((res: any) => {
        if (!res || res.applied < res.total) {
          return;
        }

        this.modalCupos.options.backdrop = 'static';
        this.modalCupos.options.keyboard = false;
        this.modalCupos.openModal();
      });
  }

  /**
   * get cost when there are no discounts
   *
   * @memberof EmissionComponent
   */
  callCostWithoutDiscounts() {
    this.newCost = false;
    this.loadingCosts = true;

    this.discounts.forEach(
      (discount) => (discount.value = <number>(discount.value ? 0 : null))
    );
    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentDiscountAction(this.discounts)
    );

    const adapted = this.policyAdapter.adapt(this.policy);
    this.quotingService
      .getCosts(adapted)
      .pipe(
        catchError((e) => {
          this.loadingCosts = false;
          return throwError(e);
        })
      )
      .subscribe((resp) => {
        const costVehicles = resp.motor.vehicles as IVehicle[];
        const vehicles = this.policy.motor.vehicles;

        vehicles.forEach((v) => {
          const currentCostVehicle = costVehicles.find(
            (cv) => cv.number === v.number
          );
          if (!currentCostVehicle) {
            return;
          }

          let currentCostPackage = <IPackage>{};
          if (
            currentCostVehicle &&
            currentCostVehicle.packages &&
            currentCostVehicle.packages.length > 0
          ) {
            currentCostPackage = <IPackage>currentCostVehicle?.packages[0];
          }

          const currentPackage = v?.packages?.find(
            (p) => p.externalid === currentCostPackage.externalid
          );

          if (!currentPackage) {
            return;
          }
          //console.log('//diego ojo..', currentPackage);
          currentPackage.costs = currentCostPackage.costs;
          currentPackage.premiums = currentCostPackage.premiums;
        });

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(vehicles)
        );

        this.loadingCosts = false;
        this.newCost = true;
        this.modalCupos.closeModal();
      });
  }

  ngOnDestroy() {
    if (this.emissionSubscription) this.emissionSubscription.unsubscribe();
    if (this.discountSubscription) this.discountSubscription.unsubscribe();
    if (this.policySubscription) this.policySubscription.unsubscribe();
  }
}
