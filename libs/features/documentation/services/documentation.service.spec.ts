/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DocumentationService } from './documentation.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Documentation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentationService]
    });
  });

  it('should ...', inject([DocumentationService], (service: DocumentationService) => {
    expect(service).toBeTruthy();
  }));
});
