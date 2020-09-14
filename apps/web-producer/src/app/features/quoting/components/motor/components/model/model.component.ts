import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@sura-platform/core';
import { ModelService, IVehicle, IModel } from '@sura-platform/features';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import * as fromQuote from '../../../quote/state';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromPolicy from '../../../../state/policy';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'sxf-model',
  templateUrl: 'model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent extends BaseComponent implements OnInit {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  /**
   * Object IVehicle for pupulate the store
   */
  currentMotor: IVehicle;

  /**
   * filter of input
   */
  filter: FormControl;

  filter$: Observable<string>;

  /*
   * List of models.
   */
  models$: Observable<IModel[]>;

  /*
   * List of model filtered
   */
  filteredModels$: Observable<IModel[]>;

  routes: IRoutesMotor[];

  modelFromPatent: IModel;

  shortModel$: Observable<string>;

  vehicles: IVehicle[];

  constructor(
    private modelService: ModelService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private flowRouteService: FlowRouteService
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap((x) => {
          const currentCar = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];
          this.vehicles = x[0].motor.vehicles;

          return of(currentCar);
        })
      )
      .subscribe((data) => {
        this.currentMotor = data;
      });

    this.shortModel$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap((x) => {
        const currentCar = x[0].motor.vehicles.filter(
          (c) => c.number === x[1].activeMotor
        )[0];
        this.vehicles = x[0].motor.vehicles;

        return of(currentCar.shortModel);
      })
    );

    this.models$ = this.modelService.getShortModels(
      this.currentMotor.year,
      this.currentMotor.brand.code,
      this.currentMotor.group
    );

    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));

    this.filteredModels$ = combineLatest([this.models$, this.filter$]).pipe(
      map(([models, filterString]) =>
        models.filter(
          (model) =>
            model.description
              .toString()
              .toLocaleLowerCase()
              .indexOf(filterString.toLocaleLowerCase()) !== -1
        )
      )
    );

    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = data.routes;
    });
  }

  /**
   *
   * @param version event click for item in the list, change the color to active item
   */
  selectModel(model: IModel) {
    //updating store and redireting

    this.storeQuote.dispatch(
      new fromPolicyActions.SetShortModel(model.description)
    );

    this.vehicles.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        v.shortModel = model.description;
      }
    });

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/model') {
        element.value = model.description;
      }
    });

    // If the patent has value, then (JC)
    if (
      this.currentMotor.license !== null &&
      this.currentMotor.license !== undefined &&
      this.currentMotor.license !== '' &&
      this.routes.filter((x) => x.shortName === 'Version')[0].value === ''
    ) {
      this.flowRouteService.goToNextStep(this.currentMotor, this.routes);
    } else {
      // handle routes
      this.flowRouteService.enableRoute(
        this.currentMotor,
        this.routes,
        'version'
      );
    }

    this.clearNextsValues();
  }

  /**
   *
   * @param filterBy filter the list
   */
  performFilter(filterBy: string): Observable<IModel[]> {
    filterBy = filterBy.toLocaleLowerCase();
    return this.models$.pipe(
      map((br) =>
        br.filter(
          (x: IModel) =>
            x.description.toLocaleLowerCase().indexOf(filterBy) !== -1
        )
      )
    );
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
        element.path !== 'motor/' + this.currentMotor.id + '/model' &&
        element.path !== 'motor/' + this.currentMotor.id + '/year' &&
        element.path !== 'motor/' + this.currentMotor.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }

      if (element.path === 'motor/' + this.currentMotor.id + '/model') {
        element.disabled = false;
      }
    });
  }
}
