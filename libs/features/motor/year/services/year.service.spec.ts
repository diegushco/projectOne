/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { YearService } from './year.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Year', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YearService]
    });
  });

  it('should ...', inject([YearService], (service: YearService) => {
    expect(service).toBeTruthy();
  }));
});
