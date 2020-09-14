/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehicleGroupService } from './vehiclegroup.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Vehicle Group', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleGroupService]
    });
  });

  it('should ...', inject(
    [VehicleGroupService],
    (service: VehicleGroupService) => {
      expect(service).toBeTruthy();
    }
  ));
});
