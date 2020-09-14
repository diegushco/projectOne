/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AditionalAccessoriesService } from './aditionalaccessories.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: AditionalAccessories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AditionalAccessoriesService]
    });
  });

  it('should ...', inject(
    [AditionalAccessoriesService],
    (service: AditionalAccessoriesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
