/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PaymentPlansService } from './paymentplans.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: PaymentPlansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentPlansService]
    });
  });

  it('should ...', inject(
    [PaymentPlansService],
    (service: PaymentPlansService) => {
      expect(service).toBeTruthy();
    }
  ));
});
