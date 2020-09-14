/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DestinationService } from './destination.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Destination', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DestinationService]
    });
  });

  it('should ...', inject(
    [DestinationService],
    (service: DestinationService) => {
      expect(service).toBeTruthy();
    }
  ));
});
