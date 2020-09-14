/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { By } from '@angular/platform-browser';

import { InspectionComponent } from './inspection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../index';
import { InspectionService } from '@sura-platform/features';
import { HttpClientModule } from '@angular/common/http';

import { FormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('InspectionComponent', () => {
  let component: InspectionComponent;
  let fixture: ComponentFixture<InspectionComponent>;
  //let serviceInspection: InspectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
        HttpClientModule,
        NgbModule
      ],
      declarations: [InspectionComponent],
      providers: [InspectionService, FormBuilder]
    }).compileComponents();
    // serviceInspection = TestBed.get(InspectionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check autoinspection option (#1)', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('#autoinspeccion')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check exist photoup option (#2)', () => {
    const addItemDebugElement = fixture.debugElement.query(By.css('#photoup'));
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check exist phone option (#3)', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('#policyFront')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  // it('Check exist phone option (#4)', () => {
  //   const addItemDebugElement = fixture.debugElement.query(By.css('#phone'));
  //   expect(addItemDebugElement).toBeTruthy();
  // });
});
