import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import * as fromMotorReducer from './state/motor.reducer';
// import * as actions from './state/motor.actions';
// import { Store } from '@ngrx/store';
// import * as fromMotor from './state/index';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sxf-motor',
  templateUrl: 'motor.component.html'
})
export class MotorComponent implements OnInit {
  constructor(
    // private store: Store<fromMotorReducer.State>,
    private router: Router
  ) {}

  quantityMotors: number;
  motors: number[] | string[];

  ngOnInit() {
    console.log('hola');
    // this.store.dispatch(new actions.Load());
    // this.store.select(fromMotor.selectAllMotors).subscribe((data) => {
    //   this.quantityMotors = data.length;
    // });
    // this.store.select(fromMotor.selectMotorIds).subscribe((data) => {
    //   this.motors = data;
    // });
  }

  addMotor() {
    // this.store.select(fromMotor.selectMotorIds).subscribe((data) => {
    //   // Last id motor.
    //   // const id = data[data.length - 1].toString();
    //   // const newId = parseInt(id, 0) + 1;
    //   // const model: IMotor = {
    //   //   id: newId,
    //   //   anio: null,
    //   //   chacis: null,
    //   //   marca: null,
    //   //   modelo: null,
    //   //   motor: null,
    //   //   patente: null,
    //   //   version: null,
    //   // };
    //   // this.store.dispatch(new actions.Create(model));
    // });
  }

  changeMotor(motorId: number) {
    // this.store.dispatch(new actions.Selected(motorId));
    this.router.navigateByUrl('quoting/motor/' + motorId + '/year');
  }
}
