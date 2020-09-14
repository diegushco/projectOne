import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';

import { DocumentationService } from '@sura-platform/features';

import { ThankyouComponent } from './thankyou.component';
import { viewsQuotes } from '../../../../../queries/components/quotes/quotes.enum';
import { reducers } from '../../../../index';

describe('ThankyouComponent', () => {
  let component: ThankyouComponent;
  let fixture: ComponentFixture<ThankyouComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers)
      ],
      declarations: [ThankyouComponent],
      providers: [DocumentationService, { provide: Router, useValue: router }]
    }).compileComponents();

    fixture = TestBed.createComponent(ThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /queries/quotes', () => {
    component.goHome();

    expect(router.navigate).toHaveBeenCalledWith(['/queries/quotes']);
  });

  it('should navigate to /queries/quotes with request pendings param', () => {
    component.goToPendings();

    expect(router.navigate).toHaveBeenCalledWith([
      `/queries/quotes/${viewsQuotes.SOLOCITUDPENDIENTE}`
    ]);
  });
});
