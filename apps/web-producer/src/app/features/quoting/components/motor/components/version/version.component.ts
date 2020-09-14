import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import { IVehicle, ModelService, IModel } from '@sura-platform/features';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
// import * as fromQuotingReducer from '../../../../state/quoting.reducer';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromQuote from '../../../quote/state';
import { map, startWith, switchMap, tap, catchError } from 'rxjs/operators';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'sxf-version',
  templateUrl: 'version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent extends BaseComponent
  implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  /**
   * variable for filter in the input ext
   */
  versionFilter: string;

  /**
   * Current motor
   */
  currentMotor: IVehicle;

  vehicles: IVehicle[];

  /**
   * filter of input
   */
  filter: FormControl;

  /*
   * List of models.
   */
  versions$: Observable<IModel[]>;

  /*
   * List of model filtered
   */
  filteredVersions$: Observable<IModel[]>;

  filter$: Observable<string>;

  routes: IRoutesMotor[];

  getVehiclesSubscription: Subscription;
  initialSubscription: Subscription;
  shortModelSubscription: Subscription;
  coverageResponseSubscription: Subscription;
  quoteRoutesSubscription: Subscription;

  constructor(
    private modelService: ModelService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    // private sumInsuredService: SumInsuredService,
    private flowRouteService: FlowRouteService // private storeQuoting: Store<fromQuotingReducer.QuotingState>
  ) {
    super();
  }

  ngOnInit() {
    this.initialSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((data) => {
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];
      this.vehicles = data[0].motor.vehicles;
    });

    this.shortModelSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap((x) => {
          const currentCar = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];
          this.vehicles = x[0].motor.vehicles;

          return of(currentCar.shortModel);
        })
      )
      .subscribe((shortModel: string) => {
        this.versions$ = this.modelService
          .getModels(
            this.currentMotor.year,
            this.currentMotor.brand.code,
            shortModel,
            this.currentMotor.group
          )
          .pipe(
            catchError(() => {
              //! Si falla por que no hay versiones para ese modelo devuelve un array vacio para que indique que no hay resultados
              return of<IModel[]>([]);
            }),
            tap((x) => {
              if (typeof x === 'object') {
                const versions = [];
                versions.push(x);
                return versions;
              }
            })
          );
      });

    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));

    this.filteredVersions$ = combineLatest([this.versions$, this.filter$]).pipe(
      map(([versions, filterString]) =>
        versions.filter(
          (version) =>
            version.description
              .toString()
              .toLocaleLowerCase()
              .indexOf(filterString.toLocaleLowerCase()) !== -1
        )
      )
    );

    this.coverageResponseSubscription = this.storeQuote
      .select(fromQuote.getCoverageResponseMotorData)
      .subscribe((coverage) => {
        if (coverage) {
          const _currentMotor = coverage.motor.vehicles.filter(
            (o) => o.number === this.currentMotor.number
          )[0];
          if (_currentMotor !== undefined) {
            this.vehicles.forEach((v) => {
              if (v.number === this.currentMotor.number) {
                v.activity = _currentMotor.activity;
                v.use = _currentMotor.use;
                v.destination = _currentMotor.destination;
              }
            });

            this.storePolicy.dispatch(
              new fromPolicyActions.UpdateVehicleAction(this.vehicles)
            );
          }
        }
      });

    this.quoteRoutesSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((data) => {
        this.routes = data.routes;
      });
  }

  /**
   *
   * @param version event click for item in the list, change the color to active item
   */
  selectModelVersion(model: IModel) {
    this.currentMotor.model.code = model.code;
    this.currentMotor.model.description = model.description;
    this.currentMotor.model.statementamount = model.statementamount;
    this.currentMotor.model.originalcostnew = model.originalcostnew;

    if (
      this.currentMotor.model.statementamount === null ||
      this.currentMotor.model.statementamount === undefined ||
      this.currentMotor.model.statementamount === 0
    ) {
      this.currentMotor.model.statementamount = this.currentMotor.model.originalcostnew;
    }

    this.currentMotor.model.type = model.type;

    this.vehicles.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        v.model.code = this.currentMotor.model.code;
        v.model.description = this.currentMotor.model.description;
        v.model.statementamount = this.currentMotor.model.statementamount;
        v.model.originalcostnew = this.currentMotor.model.originalcostnew;
        v.model.type = this.currentMotor.model.type;
        v.statedamount = this.currentMotor.model.statementamount;
      }
    });

    // this.storePolicy.dispatch(
    //   new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    // );

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/version') {
        element.value = model.description.toString();
      }
    });

    if (
      this.currentMotor.license !== null &&
      this.currentMotor.license !== undefined &&
      this.currentMotor.license !== '' &&
      this.routes.filter((x) => x.shortName === 'Ubicacion')[0].value === ''
    ) {
      this.flowRouteService.goToNextStep(this.currentMotor, this.routes);
    } else {
      this.flowRouteService.enableRoute(
        this.currentMotor,
        this.routes,
        'location'
      );
    }
    this.clearNextsValues();
  }

  clearNextsValues() {
    this.currentMotor.zone = {
      city: null,
      postalcode: null,
      state: null
    };

    this.vehicles.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        v.zone = this.currentMotor.zone;
      }
    });

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.routes.forEach((element) => {
      if (
        element.path !== 'motor/' + this.currentMotor.id + '/brand' &&
        element.path !== 'motor/' + this.currentMotor.id + '/model' &&
        element.path !== 'motor/' + this.currentMotor.id + '/year' &&
        element.path !== 'motor/' + this.currentMotor.id + '/version' &&
        element.path !== 'motor/' + this.currentMotor.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }

      if (element.path === 'motor/' + this.currentMotor.id + '/version') {
        element.disabled = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.getVehiclesSubscription) {
      this.getVehiclesSubscription.unsubscribe();
    }

    if (this.initialSubscription) {
      this.initialSubscription.unsubscribe();
    }

    if (this.shortModelSubscription) {
      this.shortModelSubscription.unsubscribe();
    }

    if (this.quoteRoutesSubscription) {
      this.quoteRoutesSubscription.unsubscribe();
    }

    if (this.coverageResponseSubscription) {
      this.coverageResponseSubscription.unsubscribe();
    }
  }
}
