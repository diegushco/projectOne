/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BrandService } from './brand.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Brand', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
  });

  it('should ...', inject([BrandService], (service: BrandService) => {
    expect(service).toBeTruthy();
  }));
});
