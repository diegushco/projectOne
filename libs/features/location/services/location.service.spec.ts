/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LocationService } from './location.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Location', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
  });

  it('should ...', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
