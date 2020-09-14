// //tslint: disable
// import { ModelService } from '@sura-platform/features';
// import { TestBed } from '@angular/core/testing';
// import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
// // import { isPlatformBrowser } from '@angular/common';
// // import { By } from '@angular/platform-browser';
// // import { Observable } from 'rxjs/Observable';
// // import 'rxjs/add/observable/of';
// // import 'rxjs/add/observable/throw';

// // import { Component, Directive } from '@angular/core';
// import { ModelComponent } from './model.component';
// import { Router } from '@angular/router';
// // import * as fromMotorReducer from '../../state/motor.reducer';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { FlowRouteService } from '../../../quote/services/flow-route.service';

// @Injectable()
// class MockModelService {}

// describe('ModelComponent', () => {
//   let fixture;
//   let component;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule],
//       declarations: [ModelComponent],
//       providers: [
//         { provide: ModelService, useClass: MockModelService },
//         { provide: Router },
//         { provide: Store },
//         { provide: FlowRouteService },
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ModelComponent);
//     component = fixture.debugElement.componentInstance;
//   });

//   it('should create a component', async () => {
//     expect(component).toBeTruthy();
//   });

//   it('Check selectModel method is defined', () => {
//     expect(component.selectModel).toBeDefined();
//   });

//   it('Check performFilter method is defined', () => {
//     expect(component.performFilter).toBeDefined();
//   });

//   // it('check input exist for filter', () => {
//   //   fixture.detectChanges();
//   //   let listgroup = fixture.DebugElement.query(By.css('.list-group'));
//   //   expect(component.performFilter).toBeDefined();
//   //   //fixture.nativeElement.querySelector('input');
//   // });
// });
