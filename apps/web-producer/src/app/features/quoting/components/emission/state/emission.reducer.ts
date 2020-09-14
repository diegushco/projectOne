import { IAccount } from '@sura-platform/features/accounts';
import { EmissionActions, EmissionActionTypes } from './emission.actions';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import cloneDeep from 'lodash/cloneDeep';

// State for this feature (Product)
export class EmissionState {
  routes: IRoutes[];
  activeRoute: string;
  client: IAccount;
  enableIssue: boolean;
  uwIssue: boolean;
  emissionVisited: boolean;
  formEmission: {
    clientIsValid: boolean;
    residenceIsValid: boolean;
    taxIsValid: boolean;
    validityIsValid: boolean;
    othersIsValid: boolean;
  };
  jobNumberFromQuotes: string;
  policyAddressFromQuotes: {
    id: string;
    state: string;
    city: string;
  };
  approvedEmission: boolean;
}

const initialEmissionState: EmissionState = {
  routes: [],
  activeRoute: '',
  client: {
    accountnumber: null,
    addresses: null,
    cellphone: {
      area: null,
      number: null
    },
    workphone: {
      area: null,
      number: null
    },
    homephone: null,
    primaryaddress: null,
    birth: null,
    documentNumber: null,
    documentType: null,
    firstname: null,
    gender: null,
    fiscalcondition: null,
    iibb: {
      type: null,
      number: null
    },
    politicallyexposed: null,
    lastname: null,
    maritalstatus: null,
    consortium: null,
    officialorganism: null,
    companyname: null,
    contactid: null,
    officialids: null,
    type: null,
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
    email: null,
    nationality: null,
    certificate: {
      start: null,
      end: null
    },
    blacklist: false,
    editable: false
  },
  enableIssue: false,
  uwIssue: false,
  emissionVisited: false,
  formEmission: {
    clientIsValid: false,
    residenceIsValid: false,
    taxIsValid: false,
    validityIsValid: false,
    othersIsValid: false
  },
  jobNumberFromQuotes: null,
  policyAddressFromQuotes: {
    id: null,
    state: null,
    city: null
  },
  approvedEmission: false
};

export function emissionReducer(
  state = initialEmissionState,
  action: EmissionActions
): EmissionState {
  switch (action.type) {
    case EmissionActionTypes.SetRoutes:
      return {
        ...state,
        routes: action.payload
      };
    case EmissionActionTypes.SetActiveRoute:
      return {
        ...state,
        activeRoute: action.payload
      };
    case EmissionActionTypes.SetUWIssue:
      return {
        ...state,
        uwIssue: action.payload
      };

    case EmissionActionTypes.SetEmissionVisited:
      return {
        ...state,
        emissionVisited: action.payload
      };
    case EmissionActionTypes.SetClientAddresses:
      return {
        ...state,
        client: {
          ...state.client,
          addresses: action.payload
        }
      };

    case EmissionActionTypes.SetBasicDataForClient:
      return {
        ...state,
        client: {
          ...state.client,
          type: action.typePerson,
          companyname: action.companyname,
          contactid: action.contactid,
          documentNumber: action.documentNumber,
          documentType: action.documentType,
          firstname: action.firstname,
          lastname: action.lastname,
          address: action.address
        }
      };
    case EmissionActionTypes.SetClientData:
      return {
        ...state,
        client: action.payload
      };

    case EmissionActionTypes.SetFormEmissionClientIsValid:
      return {
        ...state,
        formEmission: {
          ...state.formEmission,
          clientIsValid: action.payload
        }
      };
    case EmissionActionTypes.SetFormEmissionResidenceIsValid:
      return {
        ...state,
        formEmission: {
          ...state.formEmission,
          residenceIsValid: action.payload
        }
      };
    case EmissionActionTypes.SetFormEmissionTaxIsValid:
      return {
        ...state,
        formEmission: {
          ...state.formEmission,
          taxIsValid: action.payload
        }
      };
    case EmissionActionTypes.SetFormEmissionValidityIsValid:
      return {
        ...state,
        formEmission: {
          ...state.formEmission,
          validityIsValid: action.payload
        }
      };
    case EmissionActionTypes.SetFormEmissionOthersIsValid:
      return {
        ...state,
        formEmission: {
          ...state.formEmission,
          othersIsValid: action.payload
        }
      };
    case EmissionActionTypes.SetJobNumberFromQuotes:
      return {
        ...state,
        jobNumberFromQuotes: action.payload
      };
    case EmissionActionTypes.SetPolicyAddressFromQuotes:
      return {
        ...state,
        policyAddressFromQuotes: {
          id: action.payload.id,
          city: action.payload.city,
          state: action.payload.state
        }
      };
    case EmissionActionTypes.SetApprovedEmission:
      return {
        ...state,
        approvedEmission: action.payload
      };
    case EmissionActionTypes.ResetEmission:
      return cloneDeep(initialEmissionState);
    default:
      return state;
  }
}
