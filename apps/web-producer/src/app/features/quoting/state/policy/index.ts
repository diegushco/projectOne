import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPolicy from './policy.reducer';
import { IVehicle, IAccount, IHouse } from '@sura-platform/features';

export interface State {
  Policy: fromPolicy.PolicyState;
}

// Selector functions
const getPolicyState = createFeatureSelector<fromPolicy.PolicyState>('policy');

export const getPolicyData = createSelector(getPolicyState, (state) => state);

export const getPaymentTerm = createSelector(
  getPolicyState,
  (state) => state.paymentTerm
);

export const getFiscalCondition = createSelector(
  getPolicyState,
  (state) => state.fiscalcondition
);

export const getCrudIncome = createSelector(
  getPolicyState,
  (state) => state.iibb
);

export const getPaymentMethod = createSelector(
  getPolicyState,
  (state) => state.payment
);

export const getClientData = createSelector(
  getPolicyState,
  (state) => state.client
);

export const getPaymentData = createSelector(
  getPolicyState,
  (state) => state.payment
);

export const getAddress = createSelector(
  getPolicyState,
  (state) => state.address
);

export const getInspection = createSelector(
  getPolicyState,
  (state) => state.inspection
);

export const getJob = createSelector(getPolicyState, (state) => state.job);

export const getPrimaryAddressClient = createSelector(
  getPolicyState,
  (state) => state.client.primaryaddress
);

export const getPeriod = createSelector(
  getPolicyState,
  (state) => state.period
);

export const getDiscounts = createSelector(
  getPolicyState,
  (state) => state.motor.discounts
);

export const getCommission = createSelector(
  getPolicyState,
  (state) => state.motor.commission.producer
);

export const getCosts = createSelector(getPolicyState, (state) => state.costs);

export const getHouses = createSelector(
  getPolicyState,
  (state) => state.home.dwellings
);

const intialStateVehicle: IVehicle = {
  id: 1,
  license: null,
  chasis: null,
  motor: null,
  year: null,
  use: null,
  activity: null,
  destination: null,
  gnc: false,
  gps: false,
  group: null,
  packages: [
    {
      code: null,
      coverages: null,
      limitrc: null,
      premiums: null,
      costs: null,
      coveragesQuoted: null,
      group: null,
      externalid: null,
      description: null,
      selected: null
    }
  ],
  brand: {
    code: null,
    description: null
  },
  statedamount: null,
  model: {
    code: null,
    description: null,
    statementamount: null,
    originalcostnew: null,
    type: null,
    year: null
  },
  zone: {
    state: null,
    postalcode: null,
    city: null
  },
  garage: null,
  kmstraveled: null,
  useName: null,
  number: 1,
  driver: {
    firstname: null,
    lastname: null,
    birth: null,
    gender: null,
    clientIsDriver: true
  },
  bondholder: {
    finish: null,
    firstinstallmentdue: null,
    number: null,
    quotas: null,
    start: null,
    type: null
  },
  zerokm: false,
  shortModel: null,
  blacklist: false,
  patentInUse: false,
  added: true
};

const initialStateAccount: IAccount = {
  accountnumber: null,
  address: {
    apartment: null,
    city: null,
    floor: null,
    id: null,
    postalcode: null,
    state: null,
    street: null,
    streetnumber: null,
    type: null,
    clarification: null
  },
  addresses: null,
  birth: null,
  companyname: null,
  consortium: null,
  contactid: null,
  documentNumber: null,
  documentType: null,
  email: null,
  firstname: null,
  fiscalcondition: 'consumidorFinal',
  gender: null,
  homephone: null,
  cellphone: null,
  workphone: null,
  iibb: {
    type: null,
    number: null
  },
  lastname: null,
  maritalstatus: null,
  nationality: null,
  officialids: null,
  officialorganism: null,
  politicallyexposed: null,
  primaryaddress: null,
  type: 'Person',
  certificate: {
    start: null,
    end: null
  },
  blacklist: false,
  editable: null
};

const initialStateHouse: IHouse = {
  id: 1,
  number: 1,
  differentialcircuitbreaker: false,
  embeddedelectricalwiring: false,
  goodconditionelectric: false,
  soundalarmwithmonitoring: false,
  soundalarmonly: false,
  reinforceddoor: false,
  permanentvigilance: false,
  doublelock: false,
  use: null,
  construction: null,
  type: null,
  m2: null,
  zone: {
    city: null,
    postalcode: null,
    state: null
  },
  package: null,
  packages: null
};

export const getInitialState = createSelector(
  getPolicyState,
  () => intialStateVehicle
);

export const getInitialAccountState = createSelector(
  getPolicyState,
  () => initialStateAccount
);

export const getInitialHouseState = createSelector(
  getPolicyState,
  () => initialStateHouse
);
