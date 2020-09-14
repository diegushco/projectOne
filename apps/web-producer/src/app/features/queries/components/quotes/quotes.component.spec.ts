import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { LogService } from '@sura-platform/core';
import {
  QuotesService,
  UtilService,
  DocumentationService
} from '@sura-platform/features';
import { NotificationService } from '@sura-platform/core/services/notification.service';

import { QuotesComponent } from './quotes.component';
import { reducers } from '../../../quoting/index';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers)
      ],
      declarations: [QuotesComponent],
      providers: [
        QuotesService,
        UtilService,
        NotificationService,
        DocumentationService,
        LogService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /quoting/quote/questions/motor/1/patent', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.goToQuote('motor');

    expect(navigateSpy).toHaveBeenCalledWith(
      '/quoting/quote/questions/motor/1/patent'
    );
  });
});
