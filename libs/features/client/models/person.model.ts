import { IPerson, IOfficialIds } from '../interfaces/person.interface';
import { IAddress } from '@sura-platform/features';

export class LegalPerson implements IPerson {
  companyName: string;
  contactid: string;
  type: string;
  officialids: IOfficialIds[];
  fiscalCondition: string;
  fiscalConditionDesc: string;
  iibb: {
    type: string;
    number: string;
  };
  documentNumber: string;
  documentType: string;
  address: IAddress;
  email: string;
  firstName: string;
  lastName: string;
}

export class PhysicalPerson implements IPerson {
  companyName: string;
  contactid: string;
  type: string;
  officialids: IOfficialIds[];
  birth: any;
  maritalStatus: string;
  gender: string;
  documentNumber: string;
  documentType: string;
  address: IAddress;
  firstName: string;
  lastName: string;
  email: string;
}
