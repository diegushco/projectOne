/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PaymentTermsService } from './paymentterms.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: FiscalCondition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentTermsService]
    });
  });

  it('should ...', inject(
    [PaymentTermsService],
    (service: PaymentTermsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
