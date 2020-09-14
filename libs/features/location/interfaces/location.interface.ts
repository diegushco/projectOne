import { IProvince } from '@sura-platform/features';

export interface ILocation {
  state: IProvince;
  city: string;
  postalcode: number;
}
