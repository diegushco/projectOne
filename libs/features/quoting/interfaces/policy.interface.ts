import {
  IVehicle,
  IPaymentPlan,
  IDiscount,
  IAccount,
  IPayment,
  IAddress,
  IInspection,
  ICampaign,
  ICost,
  IHouse,
  IMotorError
} from '@sura-platform/features';

export interface IPolicy {
  origincode: string;
  job: {
    number: string;
    type: string;
  };
  policynumber: string;
  period: {
    rate: Date | null | undefined;
    start: Date | null;
    end: Date | null;
    method: string | null;
  };
  email: string;
  fiscalcondition: string;
  paymentTerm: IPaymentPlan;
  officialid: string;
  premiumcurrency: string;
  coveragecurrency: string;
  iibb: {
    type: string;
    number: string;
  };
  producer: {
    code: string;
  };
  payment: IPayment;
  productcode: string;
  motor: {
    fleet: string;
    vehicles: Array<IVehicle>;
    discounts: IDiscount[];
    commission: {
      producer: number;
    };
  };
  home: {
    fleet: string;
    dwellings: Array<IHouse>;
    commission: {
      producer: number;
    };
    discounts: IDiscount[];
  };
  address: IAddress | null;
  client: IAccount;
  insured: IAccount;
  inspection: IInspection;
  campaign: ICampaign;
  costs: ICost[];
  errors?: Array<IMotorError>;
}
