import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HouseDataComponent } from './houseData.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';
//import { By } from '@angular/platform-browser';
import {
  ProvinceService,
  HomeTypesService,
  ConstructionService,
  HomeUsesService,
  LocationService
} from '@sura-platform/features';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HouseDataComponent', () => {
  let component: HouseDataComponent;
  let fixture: ComponentFixture<HouseDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgbModule,
        FormsModule
      ],
      declarations: [HouseDataComponent],
      providers: [
        FlowRouteService,
        LogService,
        ProvinceService,
        HomeTypesService,
        ConstructionService,
        HomeUsesService,
        LocationService,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check <sxf-protectionmeasure> element is present', () => {
    component.protectionMeasure = true;
    fixture.detectChanges();
    const addItemDebugElement = fixture.debugElement.query(
      By.css('sxf-protectionmeasure')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check loadLocation method is defined', () => {
    expect(component.loadLocation).toBeDefined();
  });

  it('Check openEdit method is defined', () => {
    expect(component.openEdit).toBeDefined();
  });

  it('Check changeProtectedAdditional method is defined', () => {
    expect(component.changeProtectedAdditional).toBeDefined();
  });
});
