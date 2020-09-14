/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ConstructionService } from './construction.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Building', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConstructionService]
    });
  });

  it('should ...', inject(
    [ConstructionService],
    (service: ConstructionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
