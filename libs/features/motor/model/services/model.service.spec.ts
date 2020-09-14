/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ModelService } from './model.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Model', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModelService]
    });
  });

  it('should ...', inject([ModelService], (service: ModelService) => {
    expect(service).toBeTruthy();
  }));
});
