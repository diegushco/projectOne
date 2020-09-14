/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HomeUsesService } from './homeuses.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: HomeUses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeUsesService]
    });
  });

  it('should ...', inject([HomeUsesService], (service: HomeUsesService) => {
    expect(service).toBeTruthy();
  }));
});
