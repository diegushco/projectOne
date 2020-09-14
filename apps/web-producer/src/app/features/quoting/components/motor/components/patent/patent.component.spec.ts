/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

import { PatentComponent } from './patent.component';
import {
  CarService,
  PatentBlackListService,
  BrandService,
  ModelService,
  PatentUseService
} from '@sura-platform/features';

import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../index';

describe('PatentComponent', () => {
  let component: PatentComponent;
  let fixture: ComponentFixture<PatentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers),
        NgbModule
      ],
      declarations: [PatentComponent],
      providers: [
        CarService,
        PatentBlackListService,
        BrandService,
        ModelService,
        PatentUseService,
        FlowRouteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Patent pattern should accept A999AAA (Moto)', () => {
    expect(component.patentPattern.test('A999AAA')).toBeTrue();
  });

  it('Patent pattern should accept 999AAA (Moto)', () => {
    expect(component.patentPattern.test('999AAA')).toBeTrue();
  });

  it('Patent pattern should accept AA999AA (Auto)', () => {
    expect(component.patentPattern.test('AA999AA')).toBeTrue();
  });

  it('Patent pattern should accept AAA999 (Auto)', () => {
    expect(component.patentPattern.test('AAA999')).toBeTrue();
  });

  it('Patent pattern should accept AAA99 (Auto', () => {
    expect(component.patentPattern.test('AAA99')).toBeTrue();
  });

  it('Patent pattern should not accept AAAA9999', () => {
    expect(component.patentPattern.test('AAAA9999')).toBeFalse();
  });

  it('Patent formcontrol should be invalid with patent AAAA9999', () => {
    component.patent.setValue('AAAA9999');
    component.validatePatent();
    expect(component.patent.valid).toBeFalse();
  });
});
