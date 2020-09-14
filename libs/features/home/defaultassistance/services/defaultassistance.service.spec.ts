/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DefaultAssistanceService } from './defaultassistance.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Building', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DefaultAssistanceService]
    });
  });

  it('should ...', inject(
    [DefaultAssistanceService],
    (service: DefaultAssistanceService) => {
      expect(service).toBeTruthy();
    }
  ));
});
