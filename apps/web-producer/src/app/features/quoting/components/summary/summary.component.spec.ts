import { TestBed, ComponentFixture } from '@angular/core/testing';

import { HomeSummaryComponent } from './summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';
import { By } from '@angular/platform-browser';

describe('HomeSummaryComponent', () => {
  let component: HomeSummaryComponent;
  let fixture: ComponentFixture<HomeSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [HomeSummaryComponent],
      providers: [FlowRouteService, LogService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check <sxf-summary-general> element is present', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('sxf-summary-general')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check <sxf-housedata> element is present', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('sxf-housedata')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check <sxf-plandetail> element is present', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('sxf-plandetail')
    );
    expect(addItemDebugElement).toBeTruthy();
  });

  it('Check <sxf-payment-commissions> element is present', () => {
    const addItemDebugElement = fixture.debugElement.query(
      By.css('sxf-payment-commissions')
    );
    expect(addItemDebugElement).toBeTruthy();
  });
});
