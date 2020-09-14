/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SumInsuredService } from './suminsured.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Sum Insured', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SumInsuredService]
    });
  });

  it('should ...', inject([SumInsuredService], (service: SumInsuredService) => {
    expect(service).toBeTruthy();
  }));
});
