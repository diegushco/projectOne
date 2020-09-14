import { IPattern } from './pattern.interface';
import { ITerm } from './term.interface';

export interface ICoverage {
  pattern: IPattern;
  terms: ITerm[];
  category?: {
    code: string;
  };
}
