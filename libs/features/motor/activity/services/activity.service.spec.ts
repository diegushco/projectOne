/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ActivityService } from './activity.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
  });

  it('should ...', inject([ActivityService], (service: ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
