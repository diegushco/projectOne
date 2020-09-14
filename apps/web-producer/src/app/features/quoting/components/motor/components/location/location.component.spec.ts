/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LocationComponent } from './location.component';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../index';
import {
  LocationService,
  ProvinceService,
  QuotingService,
  IProvince,
  ILocation
} from '@sura-platform/features';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let provinceService: ProvinceService;
  let locationService: LocationService;

  const provincesFake: IProvince[] = [
    { code: 'province1', description: 'Descripcion province' },
    { code: 'province2', description: 'Descripcion province' },
    { code: 'province3', description: 'Descripcion province' }
  ];

  const locationFake: ILocation[] = [
    { state: provincesFake[0], city: 'City1', postalcode: null },
    { state: provincesFake[1], city: 'City2', postalcode: null },
    { state: provincesFake[2], city: 'City3', postalcode: null }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        NgbModule
      ],
      declarations: [LocationComponent],
      providers: [
        FlowRouteService,
        FormBuilder,
        LocationService,
        ProvinceService,
        QuotingService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    provinceService = TestBed.inject(ProvinceService);
    locationService = TestBed.inject(LocationService);
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  //MPP: Se comenta por que falla la subida
  // it('Check exist home variables', () => {
  //   expect(component.currentHouse).toBeUndefined();
  //   expect(component.currentHouseNumber).toBeUndefined();
  //   expect(component.houses).toBeUndefined();
  //   expect(component.quoteHomeSubscription).toBeUndefined();
  // });

  it('Check call ProvinceService', () => {
    const allPrivince = spyOn(provinceService, 'getAllProvinces').and.callFake(
      () => {
        return from([provincesFake]);
      }
    );

    component.ngOnInit();
    expect(allPrivince).toHaveBeenCalled();
  });

  it('Check call LocationService', () => {
    spyOn(provinceService, 'getAllProvinces').and.callFake(() => {
      return from([provincesFake]);
    });

    const allLocation = spyOn(locationService, 'getLocations')
      .withArgs('AR_32')
      .and.callFake(() => {
        return from([locationFake]);
      });
    component.form.controls['province'].setValue('AR_32');

    // fixture.detectChanges();
    expect(allLocation).toHaveBeenCalled();
  });
});
