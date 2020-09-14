import { IJob } from '@sura-platform/features/quoting';
import { IMotor } from './motor.interface';

export interface ICoverageResponse {
  job: IJob;
  motor: {
    vehicles: IMotor[];
  };
  period: {
    start: Date;
    end: Date;
    method: string;
    rate: Date;
  };
}
