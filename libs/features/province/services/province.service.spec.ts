/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProvinceService } from './province.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Province', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvinceService]
    });
  });

  it('should ...', inject([ProvinceService], (service: ProvinceService) => {
    expect(service).toBeTruthy();
  }));
});
