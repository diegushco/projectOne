import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
//import { Store } from '@ngrx/store';

import { switchMap } from 'rxjs/operators';

import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
//import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { Router } from '@angular/router';
import { UtilService, IVehicle } from '@sura-platform/features';
import * as moment from 'moment';
import { of, combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sxf-age',
  templateUrl: 'age.component.html',
  styleUrls: ['age.component.scss']
})
export class AgeComponent extends BaseComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  form: FormGroup;

  maxDateClient: any;
  minDateClient: any;
  routes: IRoutesMotor[];
  age: number;
  vehicles: IVehicle[];
  utilDate$: Observable<any>;

  /*
   * Current entity motor selected.
   */
  currentMotor: IVehicle;
  dateCurrentSelected: any;
  dateCurrent: any;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private router: Router
  ) {
    super();
  }

  /**
   * Initialize arrays provinces and locations
   */

  ngOnInit() {
    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = data.routes;
    });

    this.form = this.fb.group({
      birth: [, Validators.required]
    });

    this.form
      .get('birth')
      .valueChanges.pipe(
        switchMap((x) => {
          this.dateCurrent = x.year +
            '-' +
            x.month +
            '-' +
            x.day;

          this.dateCurrentSelected = moment(
            x.year +
            '-' +
            x.month +
            '-' +
            x.day,
            'YYYY-MM-DD'
          ).toISOString();
          const _birthDate = moment(x).subtract(1, 'months');
          return of(_birthDate);
        })
      )
      .subscribe(() => {
        this.age = moment().diff(moment(this.dateCurrent).format('YYYY-M-D'), 'years', false);
        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.driver.birth = this.dateCurrentSelected;
          }
        });

      });

    this.utilDate$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.utilService.getCurrentServerDate()
    ])
      .pipe(
        switchMap((x) => {
          const currentCar = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];
          this.vehicles = x[0].motor.vehicles;


          const currentDate = x[2].datetime; // moment().add(9, 'month');
          const currentDateForMinDateTime = x[2].datetime;

          const date = {
            year: parseInt(currentDate.substring(0, 4), 0) - 16,
            month: parseInt(currentDate.substring(5, 7), 0),
            day: parseInt(currentDate.substring(8, 10), 0)
          };
          this.maxDateClient = date;

          const minDateTime = {
            year: parseInt(currentDateForMinDateTime.substring(0, 4), 0) - 116,
            month: parseInt(currentDateForMinDateTime.substring(5, 7), 0) + 1,
            day: parseInt(currentDateForMinDateTime.substring(8, 10), 0)
          };

          this.minDateClient = minDateTime;

          this.currentMotor = currentCar;
          if (this.currentMotor.driver.birth !== null) {

            const birthDriver = this.currentMotor.driver.birth;
            const birthValue = {
              year: parseInt(birthDriver.substring(0, 4), 0),
              month: parseInt(birthDriver.substring(5, 7), 0),
              day: parseInt(birthDriver.substring(8, 10), 0)
            };

            this.form.get('birth').setValue(birthValue, { emitEvent: false });
          }
          return of(currentCar);
        })
      );

  }

  continueQuoting() {
    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/age') {
        if (this.age !== null && this.age !== undefined)
          element.value = this.age.toString() + " años";
      }
    });

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.router.navigateByUrl('/quoting/coverage/' + this.currentMotor.number);
  }

  ngOnDestroy() { }
}
