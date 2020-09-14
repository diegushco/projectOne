/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { QuotingService } from './quoting.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Service: Quoting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuotingService, HttpClient, HttpHandler]
    });
  });

  it('should ...', inject([QuotingService], (service: QuotingService) => {
    expect(service).toBeTruthy();
  }));
});
