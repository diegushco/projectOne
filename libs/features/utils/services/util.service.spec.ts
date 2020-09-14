/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UtilService } from './util.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Util', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilService]
    });
  });

  it('should ...', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));
});
