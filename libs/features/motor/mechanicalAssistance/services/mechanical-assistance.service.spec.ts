import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MechanicalAssistanceService } from './mechanical-assistance.service';

describe('MechanicalAssistance service', () => {
  let mechanicalAssistanceService: MechanicalAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MechanicalAssistanceService]
    });

    mechanicalAssistanceService = TestBed.inject(MechanicalAssistanceService);
  });

  it('should create service...', () => {
    expect(mechanicalAssistanceService).toBeTruthy();
  });
});
