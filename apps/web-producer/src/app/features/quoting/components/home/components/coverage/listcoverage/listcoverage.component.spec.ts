import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HomeListCoverageComponent } from './listcoverage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';
import { AmountsService } from '@sura-platform/features';

describe('HomeListCoverageComponent', () => {
  let component: HomeListCoverageComponent;
  let fixture: ComponentFixture<HomeListCoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [HomeListCoverageComponent],
      providers: [FlowRouteService, LogService, AmountsService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeListCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check setMinMax method is defined', () => {
    expect(component.setMinMax).toBeDefined();
  });

  it('Check setValueControl method is defined', () => {
    expect(component.setValueControl).toBeDefined();
  });

  it('Check coveragesBenefits method is defined', () => {
    expect(component.coveragesBenefits).toBeDefined();
  });

  it('Check coveragesOthers method is defined', () => {
    expect(component.coveragesOthers).toBeDefined();
  });

  it('Check coveragesPremiums method is defined', () => {
    expect(component.coveragesPremiums).toBeDefined();
  });

  it('Check fillArrayCoverage method is defined', () => {
    expect(component.fillArrayCoverage).toBeDefined();
  });

  it('Check createFormArray method is defined', () => {
    expect(component.createFormArray).toBeDefined();
  });

  it('Check createFormGroupCoverages method is defined', () => {
    expect(component.createFormGroupCoverages).toBeDefined();
  });

  it('Check createForms method is defined', () => {
    expect(component.createForms).toBeDefined();
  });

  it('Check showOthersCoverages method is defined', () => {
    expect(component.showOthersCoverages).toBeDefined();
  });

  it('Check showPremiumsCoverages method is defined', () => {
    expect(component.showPremiumsCoverages).toBeDefined();
  });

  it('Check checkIncendio method is defined', () => {
    expect(component.checkIncendio).toBeDefined();
  });

  it('Check checkGastosMedicos method is defined', () => {
    expect(component.checkGastosMedicos).toBeDefined();
  });

  it('Check onClickCheckboxBenefits method is defined', () => {
    expect(component.onClickCheckboxBenefits).toBeDefined();
  });

  it('Check onClickCheckboxOthers method is defined', () => {
    expect(component.onClickCheckboxOthers).toBeDefined();
  });

  it('Check setControlValueDefault method is defined', () => {
    expect(component.setControlValueDefault).toBeDefined();
  });
});
