import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';

import { PlanDetailComponent } from './planDetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlanDetailComponent', () => {
  let component: PlanDetailComponent;
  let fixture: ComponentFixture<PlanDetailComponent>;

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
      declarations: [PlanDetailComponent],
      providers: [FlowRouteService, LogService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('check if exist button to back (screen 2)', fakeAsync(() => {
    const button = fixture.debugElement.queryAll(By.css('.btn-back'));
    expect(button).toBeDefined();
  }));
});
