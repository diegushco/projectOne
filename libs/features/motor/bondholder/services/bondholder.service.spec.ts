/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BondholderService } from './bondholder.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Bondholder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BondholderService]
    });
  });

  it('should ...', inject([BondholderService], (service: BondholderService) => {
    expect(service).toBeTruthy();
  }));
});
