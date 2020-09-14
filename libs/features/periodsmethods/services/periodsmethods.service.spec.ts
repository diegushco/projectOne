/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PeriodMethodService } from './periodsmethods.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: PeriodMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeriodMethodService]
    });
  });

  it('should ...', inject(
    [PeriodMethodService],
    (service: PeriodMethodService) => {
      expect(service).toBeTruthy();
    }
  ));
});
