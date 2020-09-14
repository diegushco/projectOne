import { ICoverage } from '@sura-platform/features/coverage';
import { IPremium } from './premium.interface';
import { ICost } from './cost.interface';

export interface IPackage {
  externalid: string | null;
  description: string | null;
  selected: boolean | null;
  code: string | null;
  coverages: ICoverage[] | null;
  coveragesQuoted: ICoverage[] | null;
  limitrc: number | null;
  premiums: IPremium | null;
  costs: ICost | null;
  group: string | null;
}
