import { IAddress } from '@sura-platform/features';
import { IOfficialIds } from '@sura-platform/features/client';

export interface IAccount {
  accountnumber: string | null;
  contactid: string | null;
  documentNumber: string | null;
  documentType: string | null;
  maritalstatus: string | null;
  consortium: boolean | null;
  officialorganism: boolean | null;
  nationality: string | null;
  type: string | null;
  firstname: string | null;
  lastname: string | null;
  companyname: string | null;
  officialids: IOfficialIds[] | null;
  fiscalcondition: string | null;
  iibb: {
    type: string | null;
    number: string | null;
  } | null;
  politicallyexposed: boolean | null;
  birth: any | null;
  gender: string | null;
  primaryaddress: IAddress | null;
  email: string | null;
  cellphone: {
    area: string | null;
    number: string | null;
  } | null;
  homephone: {
    area: string | null;
    number: string | null;
  } | null;
  workphone: {
    area: string | null;
    number: string | null;
  } | null;
  address: IAddress | null;
  addresses: IAddress[] | null;
  certificate: {
    start: string | null;
    end: string | null;
  } | null;
  blacklist: boolean | null;
  editable: boolean | null;
}
