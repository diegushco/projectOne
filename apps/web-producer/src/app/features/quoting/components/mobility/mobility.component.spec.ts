// import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormBuilder } from '@angular/forms';
// // import { StoreModule } from '@ngrx/store';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// // import { MemoizedSelector } from '@ngrx/store';
// // import { reducers } from '../../index';

// import {
//   AditionalAccessoriesService,
//   QuotingService,
//   IPolicy
// } from '@sura-platform/features';
//
// import { MobilityComponent } from './mobility.component';
// import { PolicyAdapter } from '../../adapters/policy.adapter';
// import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
// // import * as fromPolicy from '../../state/policy';

// const initialState: IPolicy = {
//   address: null,
//   campaign: null,
//   client: null,
//   coveragecurrency: null,
//   email: null,
//   fiscalcondition: null,
//   iibb: null,
//   inspection: null,
//   insured: null,
//   job: null,
//   officialid: null,
//   origincode: null,
//   payment: null,
//   paymentTerm: null,
//   period: null,
//   policynumber: null,
//   premiumcurrency: null,
//   producer: null,
//   productcode: null,
//   motor: {
//     fleet: null,
//     costs: null,
//     commission: null,
//     discounts: null,
//     vehicles: [
//       {
//         id: 1,
//         license: null,
//         number: 1,
//         zerokm: false,
//         motor: null,
//         chasis: null,
//         use: null,
//         destination: null,
//         activity: null,
//         gnc: null,
//         gps: null,
//         zone: null,
//         year: null,
//         statedamount: null,
//         brand: null,
//         driver: null,
//         bondholder: null,
//         model: null,
//         group: null,
//         packages: [],
//         garage: null,
//         kmstraveled: null,
//         useName: null,
//         shortModel: null,
//         blacklist: null,
//         patentInUse: null,
//         added: null
//       }
//     ]
//   }
// };

// fdescribe('MobilityComponent', () => {
//   let component: MobilityComponent;
//   let fixture: ComponentFixture<MobilityComponent>;

//   let mockStorePolicy: MockStore;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, HttpClientTestingModule],
//       declarations: [MobilityComponent, NgbTooltip],
//       providers: [
//         FormBuilder,
//         AditionalAccessoriesService,
//         PolicyAdapter,
//         QuotingService,
//         provideMockStore({ initialState })
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(MobilityComponent);
//     component = fixture.componentInstance;
//     mockStorePolicy = TestBed.inject(MockStore);
//     fixture.detectChanges();
//   }));

//   it('component should be created', () => {
//     mockStorePolicy.refreshState();
//     expect(component).toBeTruthy();
//   });
// });
