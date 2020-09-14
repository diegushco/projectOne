/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PaymentMethodService } from './paymentmethod.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: FiscalCondition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentMethodService]
    });
  });

  it('should ...', inject(
    [PaymentMethodService],
    (service: PaymentMethodService) => {
      expect(service).toBeTruthy();
    }
  ));
});
