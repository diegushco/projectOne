// import {
//   ModelVersionService,
//   SumInsuredService,
// } from '@sura-platform/features';
// import { TestBed } from '@angular/core/testing';
// import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';

// import { VersionComponent } from './version.component';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Store } from '@ngrx/store';
//
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { FlowRouteService } from '../../../quote/services/flow-route.service';

// @Injectable()
// class MockVersionService {}

// describe('VersionComponent', () => {
//   let fixture;
//   let component;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule],
//       declarations: [VersionComponent],
//       providers: [
//         { provide: ModelVersionService, useClass: MockVersionService },
//         { provide: Router },
//         { provide: Store },
//         { provide: FlowRouteService },
//         SumInsuredService,
//         HttpClient,
//         HttpHandler,
//       ],
//       schemas: [NO_ERRORS_SCHEMA],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(VersionComponent);
//     component = fixture.debugElement.componentInstance;
//   });

//   it('should create a component', async () => {
//     expect(component).toBeTruthy();
//   });

//   it('Check selectVersion method is defined', () => {
//     expect(component.selectVersion).toBeDefined();
//   });

//   it('Check performFilter method is defined', () => {
//     expect(component.performFilter).toBeDefined();
//   });

//   //   it('Check selectModel method is defined', () => {
//   //     expect(component.selectModel).toBeDefined();
//   //   });

//   //   it('Check performFilter method is defined', () => {
//   //     expect(component.performFilter).toBeDefined();
//   //   });

//   // it('check input exist for filter', () => {
//   //   fixture.detectChanges();
//   //   let listgroup = fixture.DebugElement.query(By.css('.list-group'));
//   //   expect(component.performFilter).toBeDefined();
//   //   //fixture.nativeElement.querySelector('input');
//   // });
// });
