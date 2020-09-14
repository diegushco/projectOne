import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BrandComponent } from './brand.component';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestClass } from '../../../../../test/test.config';
import { BrandService, VehicleGroupService } from '@sura-platform/features';
import { HttpClient } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
//import { By } from '@angular/platform-browser';

describe('BrandComponent', () => {
  let fixture;
  let component;
  const testClass: TestClass = new TestClass();
  const initialState = testClass.mockStore;

  //let brandService: BrandService;
  let vehicleGroupService: VehicleGroupService;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [BrandComponent],
      providers: [
        BrandService,
        VehicleGroupService,
        FlowRouteService,
        provideMockStore({ initialState }),
        { provide: HttpClient, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    // brandService = TestBed.inject(BrandService);
    vehicleGroupService = TestBed.inject(VehicleGroupService);
    store = TestBed.inject(MockStore);
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('Check brandSelected method is defined', () => {
    expect(component.brandSelected).toBeDefined();
  });

  it('Check exist input select filter', () => {
    store.setState(initialState);
    const control = new FormControl('');

    spyOn(vehicleGroupService, 'getAllVehicleGroupsBySell').and.returnValue(
      of([])
    );
    fixture.componentInstance.filter = control;
    fixture.detectChanges();

    const inputFilter = fixture.debugElement.query(By.css('#brand'));
    expect(inputFilter).toBeTruthy();
  });
});
