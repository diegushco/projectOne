/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AmountsService } from './amounts.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Building', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AmountsService]
    });
  });

  it('should ...', inject([AmountsService], (service: AmountsService) => {
    expect(service).toBeTruthy();
  }));
});
