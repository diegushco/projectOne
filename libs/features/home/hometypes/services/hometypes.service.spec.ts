/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HomeTypesService } from './hometypes.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: HomeTypes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeTypesService]
    });
  });

  it('should ...', inject([HomeTypesService], (service: HomeTypesService) => {
    expect(service).toBeTruthy();
  }));
});
