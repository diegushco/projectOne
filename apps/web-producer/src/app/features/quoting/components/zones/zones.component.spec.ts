import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { LocationService, ProvinceService } from '@sura-platform/features';
import { FlowRouteService } from '../quote/services/flow-route.service';
import { ZonesComponent } from './zones.component';
import { reducers } from '../../index';
// import { from } from 'rxjs';

describe('ZonesComponent', () => {
  let component: ZonesComponent;
  let fixture: ComponentFixture<ZonesComponent>;
  //   let locationService: LocationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers)
      ],
      declarations: [ZonesComponent],
      providers: [
        FormBuilder,
        LocationService,
        ProvinceService,
        FlowRouteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    // locationService = TestBed.inject(LocationService);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('postalCode formcontrol not should be required', () => {
    component.cpForm.get('postalCode')?.setValue('');

    expect(component.cpForm.get('postalCode')?.valid).toBeTrue();
  });

  it('postalCode formcontrol should be max 4 digits', () => {
    component.cpForm.get('postalCode')?.setValue('1234');

    expect(component.cpForm.get('postalCode')?.valid).toBeTrue();
  });

  it('postalCode formcontrol not should be greather than 4 digits', () => {
    component.cpForm.get('postalCode')?.setValue('12345');

    expect(component.cpForm.get('postalCode')?.valid).toBeFalse();
  });

  it('postalCode formcontrol should be only digits', () => {
    component.cpForm.get('postalCode')?.setValue('not alpha');

    expect(component.cpForm.get('postalCode')?.valid).toBeFalse();
  });

  //   it('postalCode formcontrol should be invalid if service not return data', () => {
  //     spyOn(locationService, 'getLocationAndProvince')
  //       .withArgs(33)
  //       .and.returnValue(from([]));

  //     component.searchByPostalCode(33);

  //     expect(component.cpForm.get('postalCode')?.invalid).toBeTrue();
  //   });
});
