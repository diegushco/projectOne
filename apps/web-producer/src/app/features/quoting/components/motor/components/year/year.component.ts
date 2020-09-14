import { Component, OnInit } from '@angular/core';
import { BaseComponent, BaseService } from '@sura-platform/core';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { IVehicle, IYear, YearService } from '@sura-platform/features';
import { FormControl, Validators } from '@angular/forms';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';

@Component({
  selector: 'sxf-year',
  templateUrl: 'year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent extends BaseComponent implements OnInit {
  /*
   * List of years.
   */
  years: IYear[];

  /*
   * List of application routes.
   */
  routes: IRoutesMotor[];

  /*
   * Current year selected.
   */
  currentYear: number;

  filteredYears: IYear[];
  /*
   * FormControl created for filter brands.
   */
  year: FormControl;
  zeroKm: FormControl;
  classic = new FormControl(false);

  showAllButtonVisible = true;

  minYear: number;
  maxYear: number;

  vehicles: IVehicle[];

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private yearService: YearService,
    private flowRouteService: FlowRouteService,
    private baseService: BaseService
  ) {
    super();
  }

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredYears = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.years;
  }

  currentMotor: IVehicle;
  thisYear: number;
  currentCar: any;

  ngOnInit(): void {
    this.zeroKm = new FormControl(false);
    // Subscribing to Motor Store.
    this.thisYear = this.baseService.getThisYear();
    const arr = new Array<IYear>();
    for (let i = this.thisYear; i > this.thisYear - 100; i--) {
      arr.push({
        code: i
      });
    }

    this.minYear = arr[arr.length - 1].code;
    this.maxYear = arr[0].code;

    this.year = new FormControl(
      [],
      [
        Validators.required,
        Validators.min(this.minYear),
        Validators.max(this.maxYear)
      ]
    );

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap((x) => {
          this.currentCar = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];
          this.vehicles = x[0].motor.vehicles;
          return of(this.currentCar);
        })
      )
      .subscribe((data) => {
        this.currentMotor = data;
        this.currentYear = this.currentMotor.year;
        if (this.currentMotor.year) {
          this.year.setValue(this.currentMotor.year);
        }
      })
      .unsubscribe();
    // Get All years from year service.
    this.yearService
      .getAllYear()
      .subscribe((data: IYear[]) => {
        this.years = data;
        this.filteredYears = this.years;

        // Preload data when ZeroKm is true;
        if (this.currentMotor.zerokm) {
          const monthActual = new Date().getMonth() + 1;
          if (monthActual > 3) {
            this.filteredYears = this.years.slice(0, 1);
          } else {
            this.filteredYears = this.years.slice(0, 2);
          }
        }
      })
      .unsubscribe();

    // Subscribing to store for the routes.
    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = data.routes;
    });

    this.zeroKm.setValue(this.currentMotor.zerokm);
    this.zeroKm.valueChanges.subscribe((data: boolean) => {
      if (data) {
        this.showAllButtonVisible = false;
        const monthActual = new Date().getMonth() + 1;
        // Take the last years of array
        if (monthActual > 3) {
          this.filteredYears = this.years.slice(0, 1);
        } else {
          // Take the last two years of array
          this.filteredYears = this.years.slice(0, 2);
        }
        this.year.reset();
      } else {
        this.filteredYears = this.years;
      }

      this.currentMotor.zerokm = data;

      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.zerokm = data;
        }
      });

      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.vehicles)
      );

      if (this.classic.value) {
        this.classic.setValue(!this.zeroKm.value);
      }
    });

    this.classic.valueChanges.subscribe(() => {
      if (this.zeroKm.value) {
        this.zeroKm.setValue(!this.classic.value);
      }
    });
  }

  performFilter(filterBy: string): IYear[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.years.filter(
      (year: IYear) => year.code.toString().indexOf(filterBy) !== -1
    );
  }

  /**
   * Event executed when year is selected.
   *
   * @param {number} year
   * @memberof YearComponent
   */
  yearSelected(year: number) {
    if (year !== undefined) {
      this.currentMotor.year = year;
    } else {
      year = this.currentMotor.year;
    }

    if (!this.validateOkmAndYear(year, this.currentMotor.zerokm)) {
      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.zerokm = false;
        }
      });

      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.vehicles)
      );
    } else {
      // this.currentMotor.zerokm = true;
    }

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.number + '/year') {
        let zerokmString = '';
        if (this.currentMotor.zerokm === true) {
          zerokmString = '0Km';
        }
        element.value = `${year.toString()} ${zerokmString}`;
      }
    });
    if (
      this.currentMotor.license !== null &&
      this.currentMotor.license !== undefined &&
      this.currentMotor.license !== '' &&
      this.routes.filter((x) => x.shortName === 'Marca')[0].value === ''
    ) {
      // Pass to next route that haven´t value from patent.

      this.flowRouteService.goToNextStep(this.currentMotor, this.routes);
    } else {
      // handle routes
      this.flowRouteService.enableRoute(
        this.currentMotor,
        this.routes,
        'brand'
      );
    }

    this.clearNextsValues();
  }

  /**
   * Validation before send data to store.
   * El metodo valida que: cuando este el boton 0km tildado y se seleccione un año,
   * entonces verifica que el año seleccionado este dentro del array devuelto
   * cuando se selecciona el Okm.
   *
   * @param {number} year
   * @param {boolean} isZeroKm
   * @returns {boolean}
   * @memberof YearComponent
   */
  validateOkmAndYear(year: number, isZeroKm: boolean): boolean {
    const monthActual = new Date().getMonth() + 1;
    const _years: string[] = [];
    // Take the last years of array
    if (monthActual > 3) {
      this.years.slice(0, 1).forEach((element) => {
        _years.push(element.code.toString());
      });
    } else {
      // Take the last two years of array
      this.years.slice(0, 2).forEach((element) => {
        _years.push(element.code.toString());
      });
    }

    if (isZeroKm && !_years.includes(year.toString())) {
      return false;
    }
    return true;
  }

  /**
   * Remove previous values.
   *
   * @memberof YearComponent
   */
  clearNextsValues() {
    // this.currentMotor.brand = {
    //   code: null,
    //   description: null
    // };
    this.currentMotor.model = {
      code: null,
      year: null,
      description: null,
      statementamount: null,
      originalcostnew: null,
      type: null
    };
    this.currentMotor.brand = {
      code: null,
      description: null
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
        'motor/' + this.currentMotor.id + '/brand'
      )
    );
    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));
  }

  onEnter(year) {
    if (this.year.valid) {
      this.yearSelected(year);
    }
  }

  showAllYears() {
    this.yearService.getAllYear().subscribe((data: IYear[]) => {
      this.filteredYears = data;
    });
    this.showAllButtonVisible = !this.showAllButtonVisible;
  }
}
