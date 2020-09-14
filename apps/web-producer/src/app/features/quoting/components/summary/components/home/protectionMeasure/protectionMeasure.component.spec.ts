import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ProtectionMeasureComponent } from './protectionMeasure.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from '@sura-platform/apps/web-producer/src/app/features/quoting';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlowRouteService } from '@sura-platform/apps/web-producer/src/app/features/quoting/components/quote/services/flow-route.service';
import { LogService } from '@sura-platform/core';

import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('ProtectionMeasureComponent', () => {
  let component: ProtectionMeasureComponent;
  let fixture: ComponentFixture<ProtectionMeasureComponent>;

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
      declarations: [ProtectionMeasureComponent],
      providers: [FlowRouteService, LogService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectionMeasureComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
