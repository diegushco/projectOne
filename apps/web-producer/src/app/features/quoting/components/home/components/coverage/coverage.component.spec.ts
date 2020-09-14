import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HomeCoverageComponent } from './coverage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  QuotingService,
  AditionalAccessoriesService,
  ComissionService,
  DiscountService,
  PeriodMethodService,
  PaymentMethodService,
  PaymentPlansService,
  DefaultAssistanceService
} from '@sura-platform/features';

import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';
import { PolicyAdapter } from '@sura-platform/apps/web-producer/src/app/features/quoting/adapters/policy.adapter';
import { CoveragesAdapter } from '../../../../adapters/coverages.adapter';

describe('HomeCoverageComponent', () => {
  let component: HomeCoverageComponent;
  let fixture: ComponentFixture<HomeCoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [HomeCoverageComponent],
      providers: [
        QuotingService,
        FlowRouteService,
        LogService,
        PolicyAdapter,
        AditionalAccessoriesService,
        CoveragesAdapter,
        AditionalAccessoriesService,
        ComissionService,
        DiscountService,
        PeriodMethodService,
        PaymentMethodService,
        PaymentPlansService,
        DefaultAssistanceService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check loadAdditionals method is defined', () => {
    expect(component.loadAdditionals).toBeDefined();
  });

  it('Check processShowOthers method is defined', () => {
    expect(component.processShowOthers).toBeDefined();
  });

  it('Check processShowPremiums method is defined', () => {
    expect(component.processShowPremiums).toBeDefined();
  });
});
