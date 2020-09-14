import { IOption } from './option.interface';

export interface ITerm {
  code: string;
  options: IOption[] | null;
  value: { current: string };
}
