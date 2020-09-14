import { IAddress } from './address.interface';

export interface IPerson {
  contactid: string;
  address: IAddress;
  email: string;
  companyName: string;
  type: string;
  officialids: IOfficialIds[];
  firstName: string;
  lastName: string;
}

export interface IOfficialIds {
  type: string;
  value: string;
  primary: boolean;
}
