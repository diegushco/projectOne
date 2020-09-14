/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProducerService } from './producer.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Producer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProducerService]
    });
  });

  it('should ...', inject([ProducerService], (service: ProducerService) => {
    expect(service).toBeTruthy();
  }));
});
