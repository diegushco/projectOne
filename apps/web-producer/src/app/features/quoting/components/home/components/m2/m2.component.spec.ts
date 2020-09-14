/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../index';

import { M2Component } from './m2.component';
import { AmountsService, QuotingService } from '@sura-platform/features';
import { CoveragesAdapter } from '../../../../adapters/coverages.adapter';

describe('M2Component', () => {
  let component: M2Component;
  let fixture: ComponentFixture<M2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        NgbModule
      ],
      declarations: [M2Component],
      providers: [
        FlowRouteService,
        FormBuilder,
        AmountsService,
        QuotingService,
        CoveragesAdapter
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(M2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {});

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Formcontrol M2 should be required', () => {
    component.form.get('m2')?.setValue('');

    expect(component.form.get('m2')?.valid).toBeFalse();
  });

  it('Formcontrol m2 should be valid', () => {
    component.form.get('m2')?.setValue('33');

    expect(component.form.get('m2')?.valid).toBeTrue();
  });
});
