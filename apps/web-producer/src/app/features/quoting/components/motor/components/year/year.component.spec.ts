// import { TestBed, async } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// import { YearComponent } from './year.component';
// import { ReactiveFormsModule } from '@angular/forms';

// import { YearService, IYear } from '@sura-platform/features';
// import { RouterTestingModule } from '@angular/router/testing';
// //import { StoreModule } from '@ngrx/store';

// import { HttpClient } from '@angular/common/http';
// import { FlowRouteService } from '../../../quote/services/flow-route.service';
// import { BaseService } from '@sura-platform/core';

// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';
// import cloneDeep from 'lodash/cloneDeep';
// import { TestClass } from '../../../../../test/test.config';

// describe('YearComponent', () => {
//   let fixture;
//   let component;
//   const testClass: TestClass = new TestClass();
//   const fakeMinYear = 1921;
//   //const fakeMaxYear = 2020;
//   const fakeThisYear = 2020;
//   let baseService: BaseService;
//   let yearService: YearService;
//   const mockAllYear: IYear[] = [
//     { code: 2020 },
//     { code: 2019 },
//     { code: 2018 },
//     { code: 2017 }
//   ];
//   let store: MockStore;
//   const initialState = testClass.mockStore;

//   beforeEach(async(() => {
//     localStorage.setItem(
//       'access_token',
//       'eyJ4NXQiOiJOVFkzT0dRelpEazROVFJsT1dZMlpUTmpNVGt6TVRZM1pqZGtNREU1WmpJMFpqTmlaalEyTkEiLCJraWQiOiJOVFkzT0dRelpEazROVFJsT1dZMlpUTmpNVGt6TVRZM1pqZGtNREU1WmpJMFpqTmlaalEyTkFfUlMyNTYiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ5ZGFtYXRvIiwiYXVkIjpbInVFZW9rS0lFZTZZekRyN093S3VDSGx6ZnN6NGEiLCJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiXSwibmJmIjoxNTkzNTMxNjA4LCJhenAiOiJ1RWVva0tJRWU2WXpEcjdPd0t1Q0hsemZzejRhIiwic2NvcGUiOiJkZXZpY2VfMTY5NzY1NjQzNyBvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvd3NvMmlzcWEuc2VndXJvc3N1cmEuY29tLmFyOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1OTM1MzUyMDgsImlhdCI6MTU5MzUzMTYwOCwianRpIjoiOGE1YzQ0MjMtMDUwOC00NzgyLTlkN2YtNTk5Y2NiZDJlMWFjIn0.IIoWJMp27BUc0VLOPFqhqE_GwvAO14wJVpN0QVjV0ht9a_K349vVSwagJM9AHhRca_8CPWH1u_37rdKPcY-HEq-bOHp7CxKl4EQ58i8jeao4Rv5Y68Gv_AeQGnA_KuXKXJUhT8j6dBj7VIY2zdSlU0eURS1SWsf7mLRYvRM6D8i5aLNauiFTaPkkctf6ART8vm4k6vjkoTes3sv_e2BsWAkP_F-9Hs2t17zjpK-Wb3wk95cWxm8a3RhzbUbQdPPRpI4JeC6VomkRRoA4pv1821P9hQqfWVpKEr9JcBHv2OlS8gTmG3ULPtfZXEMz1GOEBYJNKolKq5a35s-j99hUsw'
//     );

//     TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         RouterTestingModule
//         //StoreModule.forRoot(reducers)
//       ],
//       declarations: [YearComponent],
//       providers: [
//         YearService,
//         FlowRouteService,
//         BaseService,
//         { provide: HttpClient, useValue: {} },
//         provideMockStore({ initialState })
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(YearComponent);
//     component = fixture.componentInstance;
//     baseService = TestBed.inject(BaseService);
//     yearService = TestBed.inject(YearService);
//     store = TestBed.inject(MockStore);
//   });

//   it('should create a component', async () => {
//     expect(component).toBeTruthy();
//   });

//   it('Check yearSelected method is defined', () => {
//     expect(component.yearSelected).toBeDefined();
//   });

//   it('should have a current year from getThisYear', () => {
//     store.setState(initialState);
//     spyOn(baseService, 'getThisYear').and.returnValue(fakeThisYear);
//     component.ngOnInit();
//     expect(component.thisYear).toEqual(fakeThisYear);
//   });

//   it('should have a minYear and maxYear', () => {
//     store.setState(initialState);
//     spyOn(baseService, 'getThisYear').and.returnValue(fakeThisYear);
//     component.ngOnInit();
//     expect(component.minYear).toEqual(fakeMinYear);
//     expect(component.maxYear).toEqual(fakeThisYear);
//   });

//   it('should have a list of years', () => {
//     store.setState(initialState);
//     spyOn(baseService, 'getThisYear').and.returnValue(fakeThisYear);
//     spyOn(yearService, 'getAllYear').and.returnValue(of(mockAllYear));
//     component.ngOnInit();
//     expect(component.filteredYears).toEqual(mockAllYear);
//   });

//   it('Check exist input select', () => {
//     const inputSelectYear = fixture.debugElement.query(By.css('#year'));
//     expect(inputSelectYear).toBeTruthy();
//   });

//   it('When select zerokm, check if show years correctly', () => {
//     spyOn(baseService, 'getThisYear').and.returnValue(fakeThisYear);
//     spyOn(yearService, 'getAllYear').and.returnValue(of(mockAllYear));
//     const copyState = cloneDeep(initialState);

//     component.ngOnInit();
//     copyState.policy.motor.vehicles[0].zerokm = true;
//     store.setState(copyState);
//     //fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       fixture.detectChanges();
//       const monthActual = new Date().getMonth() + 1;
//       let yearsCalculated: IYear[];
//       if (monthActual > 3) {
//         yearsCalculated = mockAllYear.slice(0, 1);
//       } else {
//         yearsCalculated = mockAllYear.slice(0, 2);
//       }

//       expect(component.filteredYears).toEqual(yearsCalculated);
//     });
//   });
// });
