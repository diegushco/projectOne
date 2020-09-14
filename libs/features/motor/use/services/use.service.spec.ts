/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UseService } from './use.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Use', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UseService]
    });
  });

  it('should ...', inject([UseService], (service: UseService) => {
    expect(service).toBeTruthy();
  }));
});
