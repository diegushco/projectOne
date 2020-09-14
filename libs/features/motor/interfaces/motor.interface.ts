import { ICoverage } from '@sura-platform/features/coverage/interfaces/coverage.interface';
import { IPackage } from '@sura-platform/features/package';

export interface IMotor {
  number: number;
  activity: string;
  destination: number;
  use: number;
  statedamount: number;
  package: {
    coverages: ICoverage[];
  };
  coverages: Array<ICoverage>;
  packages: Array<IPackage>;
}
