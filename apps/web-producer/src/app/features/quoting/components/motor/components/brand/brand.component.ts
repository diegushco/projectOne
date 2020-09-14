import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import { Store } from '@ngrx/store';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromPolicy from '../../../../state/policy';
// import * as fromMotorReducer from '../../state/motor.reducer';
// import * as motorActions from '../../state/motor.actions';
import * as fromProducer from '../../../../../producer/state';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import forOwn from 'lodash/forOwn';
import { AnimationOptions } from 'ngx-lottie';

import {
  IVehicle,
  IBrand,
  IVehicleGroup,
  BrandService,
  VehicleGroupService,
  VehicleGroup
} from '@sura-platform/features';
import { FormControl } from '@angular/forms';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import {
  Observable,
  Subscription,
  combineLatest,
  of,
  EMPTY,
  Subject,
  forkJoin
} from 'rxjs';
import {
  map,
  share,
  catchError,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IProducer } from '@sura-platform/features/producer';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import { MOTOR_CONF } from '../../motor.config';
import * as moment from 'moment';

@Component({
  selector: 'sxf-brand',
  templateUrl: 'brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent extends BaseComponent implements OnInit, OnDestroy {
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  /*
   * Current entity producer selected.
   */
  currentProducer: IProducer;
  /*
   * Current entity motor selected.
   */
  currentMotor: IVehicle;

  vehicles: IVehicle[];
  /*
   * List of brands.
   */
  brands: IBrand[];
  /*
   * List of brand filtered by @searchBrand
   */
  brands$: Observable<IBrand[]>;

  brandsMostSelled$: Observable<any>;
  /*
   * List of motor groups.
   */
  groups: IVehicleGroup[];
  /*
   * Current group selected in Tabset.
   */
  currentGroup: VehicleGroup = VehicleGroup.AUTO;

  /**
   * Type of vehicle
   */
  groupVehicle: string;

  /*
   * FormControl created for filter brands.
   */
  filter: FormControl;

  routes: IRoutesMotor[];

  showAllBrandsButton = true;

  /**
   * Flag used to check if technical
   * pricing is enabled for this producer
   *
   * @type {boolean}
   * @memberof BrandComponent
   */
  technicalPricing: boolean;

  brandsParamUpdate = new Subject();

  producerSubscription: Subscription;
  currentMotorSubscription: Subscription;
  motorDataSubscription: Subscription;
  mostSelledSubscription: Subscription;
  quoteRouterSubscription: Subscription;
  filterInputSubscription: Subscription;
  brandsParamUpdateSubscription: Subscription;

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private producerStore: Store<fromProducer.State>,
    private brandService: BrandService,
    private flowRouteService: FlowRouteService,
    private vehicleGroupService: VehicleGroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.groups = [
      { code: VehicleGroup.MOTO, mostSell: false },
      { code: VehicleGroup.AUTO, mostSell: false },
      { code: VehicleGroup.PICKUP, mostSell: false },
      { code: VehicleGroup.CAMION, mostSell: false },
      { code: VehicleGroup.OTRO, mostSell: false }
    ];

    this.producerSubscription = this.producerStore
      .select(fromProducer.getCurrentProducer)
      .subscribe((data: IProducer) => {
        this.currentProducer = data;
        this.technicalPricing = [3, 47].includes(data.profile.catalogs.motor);
      });

    this.motorDataSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((x) => {
      this.vehicles = x[0].motor.vehicles;
      this.currentMotor = x[0].motor.vehicles.find(
        (v) => v.number === x[1].activeMotor
      );
    });

    this.vehicleGroupService
      .getAllVehicleGroupsBySell(this.currentProducer.code)
      .pipe(
        catchError(
          () => {
            return of({
              [VehicleGroup.MOTO]: 0,
              [VehicleGroup.AUTO]: 0,
              [VehicleGroup.PICKUP]: 0,
              [VehicleGroup.CAMION]: 0,
              [VehicleGroup.OTRO]: 0
            });
          }
          //TODO: MP: Parche horrible hasta que se decidan a devolverlo asi desde la API (Pedido realizado... esperando que lo hagan....)
        )
      )
      .subscribe((dataGroups) => {
        if (!this.currentMotor.group) {
          let maxSell = 0;

          forOwn(dataGroups, (value: number, key: VehicleGroup) => {
            if (maxSell < value) {
              maxSell = value;
              this.currentGroup = key;
            }
          });

          this.groups.map((item) =>
            item.code === this.currentGroup ? (item.mostSell = true) : item
          );
        } else {
          this.currentGroup = this.currentMotor.group;
        }

        this.groupSelected(this.currentGroup);
      });

    this.filter = new FormControl('');

    this.quoteRouterSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((data) => {
        this.routes = data.routes;
      });

    this.filterInputSubscription = this.filter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((data: string) => {
        this.brandsParamUpdate.next({
          showAll: true,
          filter: data
        });
      });

    this.brandsParamUpdateSubscription = this.brandsParamUpdate.subscribe(
      (params: any) => {
        (this.brands$ = forkJoin([
          this.brandService.getBrands(
            this.currentMotor.year,
            this.currentGroup
          ),
          this.brandService
            .getBrandsBySell(this.currentProducer.profile.channel)
            .pipe(
              catchError(() => {
                return [EMPTY];
              })
            )
        ]).pipe(
          map((x) => {
            //this.showAllBrandsButton = !params.showAll;
            //Si el usuario no clickeo ver todo..verifico cantidad en array para mostrar
            //o no el boton de ver todo
            this.showAllBrandsButton =
              x[0].length > 10 && !params.showAll ? true : false;

            if (Array.isArray(x[1])) {
              const metric = x[1]
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
              const brandsMostSelled = x[0].filter((item1) =>
                metric.find((item2) => item1.code === item2.code)
              );

              const brandsNotSelled = x[0].filter(
                (item1) => !brandsMostSelled.includes(item1)
              );

              let all = brandsMostSelled.concat(brandsNotSelled);

              if (params.filter !== '') {
                all = all.filter(
                  (brand) =>
                    brand.description
                      .toLocaleLowerCase()
                      .indexOf(params.filter.toLocaleLowerCase()) !== -1
                );
              }

              return (params.showAll ? all : all.slice(0, 10)).sort((a, b) =>
                a.description > b.description
                  ? 1
                  : b.description > a.description
                  ? -1
                  : 0
              );
            } else {
              // this.showAllBrandsButton = false;
              return (params.showAll ? x[0] : x[0].slice(0, 10)).sort((a, b) =>
                a.description > b.description
                  ? 1
                  : b.description > a.description
                  ? -1
                  : 0
              );
            }
          }),
          share()
        )),
          catchError(() => {
            return EMPTY;
          });
      }
    );
  }

  ngOnDestroy() {
    if (this.producerSubscription) this.producerSubscription.unsubscribe();
    if (this.motorDataSubscription) this.motorDataSubscription.unsubscribe();
    if (this.mostSelledSubscription) this.mostSelledSubscription.unsubscribe();
    if (this.filterInputSubscription)
      this.filterInputSubscription.unsubscribe();
    if (this.quoteRouterSubscription)
      this.quoteRouterSubscription.unsubscribe();
    if (this.currentMotorSubscription)
      this.currentMotorSubscription.unsubscribe();
    if (this.brandsParamUpdateSubscription)
      this.brandsParamUpdateSubscription.unsubscribe();
  }

  brandSelected(brand: IBrand) {
    this.currentMotor.brand = brand;
    this.currentMotor.group = this.currentGroup;

    const ageRoute = this.routes.find((route) => route.path.endsWith('age'));

    const canHaveTechnicalPricing = MOTOR_CONF.find(
      (v) => v.vehicleType === this.currentGroup
    ).technicalPricing.visible;

    // Si el catálogo del usuario permite technical pricing pero
    // no el grupo de vehículo, seteo la fecha por defecto y quito
    // la pregunta
    if (this.technicalPricing && !canHaveTechnicalPricing) {
      //TODO: Usar fecha del servidor
      this.currentMotor.driver.birth = moment()
        .subtract(40, 'year')
        .toISOString();
      ageRoute.visible = false;
    } else if (this.technicalPricing) {
      this.currentMotor.driver.birth = null;
      ageRoute.visible = true;
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/brand') {
        element.value = brand.description.toString();
      }
    });

    if (
      this.currentMotor.license !== null &&
      this.currentMotor.license !== undefined &&
      this.currentMotor.license !== '' &&
      this.routes.filter((x) => x.shortName === 'Modelo')[0].value === ''
    ) {
      this.flowRouteService.goToNextStep(this.currentMotor, this.routes);
    } else {
      // handle routes
      this.flowRouteService.enableRoute(
        this.currentMotor,
        this.routes,
        'model'
      );
    }

    this.clearNextsValues();
  }

  showAllBrands() {
    this.filter.setValue('');

    // this.loadBrands(true);
    this.brandsParamUpdate.next({
      showAll: true,
      filter: ''
    });

    this.showAllBrandsButton = !this.showAllBrandsButton;
  }

  groupSelected(vehicleGroup: VehicleGroup) {
    this.currentGroup = vehicleGroup;
    this.filter.setValue(this.filter.value, { emitEvent: false });
    this.brandsParamUpdate.next({
      showAll: false,
      filter: this.filter.value
    });

    this.showAllBrandsButton = true;
    switch (vehicleGroup) {
      case VehicleGroup.AUTO:
        this.storeQuote.dispatch(new fromQuoteActions.SetGroupCoverage('TC'));
        break;
      case VehicleGroup.PICKUP:
        this.storeQuote.dispatch(new fromQuoteActions.SetGroupCoverage('TC'));
        break;
      case VehicleGroup.MOTO:
        this.storeQuote.dispatch(
          new fromQuoteActions.SetGroupCoverage('BASIC')
        );
        break;
      case VehicleGroup.CAMION:
        this.storeQuote.dispatch(
          new fromQuoteActions.SetGroupCoverage('BASIC')
        );
        break;
      case 'CAMION':
        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.driver.clientIsDriver = false;
          }
        });
        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(this.vehicles)
        );
        break;
      default:
        break;
    }
  }
  /**
   * Remove previous values.
   *
   * @memberof BrandComponent
   */
  clearNextsValues() {
    this.currentMotor.model = {
      code: null,
      year: null,
      description: null,
      statementamount: null,
      originalcostnew: null,
      type: null
    };

    this.currentMotor.shortModel = null;

    this.currentMotor.zone = {
      city: null,
      postalcode: null,
      state: null
    };

    this.vehicles.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        v.model = this.currentMotor.model;
        v.zone = this.currentMotor.zone;
      }
    });

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.routes.forEach((element) => {
      if (
        element.path !== 'motor/' + this.currentMotor.id + '/brand' &&
        element.path !== 'motor/' + this.currentMotor.id + '/year' &&
        element.path !== 'motor/' + this.currentMotor.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }
    });

    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor(
        'motor/' + this.currentMotor.id + '/model'
      )
    );
    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));
  }

  updateUrlImageError(event, _type) {
    event.target.src = '/assets/icons/TYPE_' + _type + '.svg';
  }
}
