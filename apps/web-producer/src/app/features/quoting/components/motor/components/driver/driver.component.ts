import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVehicle, IPolicy } from '@sura-platform/features';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromQuote from '../../../quote/state';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'sxf-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  form: FormGroup;
  vehicles: IVehicle[];
  currentPolicy: IPolicy;

  /**
   * Object any for pupulate the store
   */
  @Input() currentMotor: IVehicle;

  @Input() clientIsDriver: boolean;

  constructor(
    private fb: FormBuilder,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>
  ) {}

  ngOnInit() {
    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((data) => {
      this.currentPolicy = data[0];
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];
      this.vehicles = data[0].motor.vehicles;
    });

    this.form = this.fb.group({
      driverName: [this.currentMotor.driver.firstname, Validators.required],
      driverLastName: [this.currentMotor.driver.lastname, Validators.required]
    });

    this.form.get('driverName').valueChanges.subscribe((data: string) => {
      if (this.form.get('driverName').valid) {
        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.driver.firstname = data;
          }
        });
      }
      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.vehicles)
      );
    });

    this.form.get('driverLastName').valueChanges.subscribe((data: string) => {
      if (this.form.get('driverLastName').valid) {
        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.driver.lastname = data;
          }
        });
      }
      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.vehicles)
      );
    });
  }
}
