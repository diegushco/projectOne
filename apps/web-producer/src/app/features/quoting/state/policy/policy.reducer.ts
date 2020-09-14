import {
  IPolicy,
  IVehicle,
  IPaymentPlan,
  IPeriodMethod,
  IDiscount,
  IAccount,
  IAddress,
  IInspection,
  IPayment,
  ICampaign,
  ICost,
  IHouse
} from '@sura-platform/features';
import { PolicyActions, PolicyActionTypes } from './policy.actions';
import cloneDeep from 'lodash/cloneDeep';

// State for this feature (Product)
export interface PolicyState extends IPolicy {
  origincode: string;
  job: {
    number: string;
    type: string;
  };
  policynumber: string;
  email: string;
  period: {
    start: Date;
    end: Date;
    method: string;
    rate: Date;
  };
  campaign: ICampaign;
  fiscalcondition: string;
  paymentTerm: IPaymentPlan;
  periodMethod: IPeriodMethod;
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
    commission: {
      producer: number;
    };
    discounts: IDiscount[];
    fleet: string;
    vehicles: Array<IVehicle>;
  };
  home: {
    fleet: string;
    dwellings: Array<IHouse>;
    commission: {
      producer: number;
    };
    discounts: IDiscount[];
  };
  client: IAccount;
  shortModel: string;
  insured: IAccount;
  address: IAddress;
  inspection: IInspection;
  costs: ICost[];
}

const initialPolicyState: PolicyState = {
  origincode: '124',
  job: {
    number: null as any,
    type: 'Submission'
  },
  policynumber: null as any,
  email: null as any,
  period: {
    start: null as any, // new Date(),
    end: null as any,
    method: null as any,
    rate: null as any //new Date()
  },
  fiscalcondition: null as any,
  paymentTerm: null as any,
  periodMethod: null as any,
  officialid: 'SSN',
  premiumcurrency: 'ars',
  coveragecurrency: 'ars',
  iibb: {
    type: null as any,
    number: null as any
  },
  producer: {
    code: null as any
  },
  payment: {
    method: 'CreditCard',
    id: null,
    plan: {
      code: null
    },
    cbu: {
      number: null,
      alias: null,
      conduit: '17'
    },
    creditcard: {
      type: null,
      number: null,
      expirationdate: null
    }
  },
  campaign: null as any,
  productcode: 'CA7CommAuto',
  motor: {
    fleet: '',
    vehicles: new Array<IVehicle>(),
    commission: {
      producer: null as any
    },
    discounts: null as any
  },
  home: {
    fleet: '',
    dwellings: new Array<IHouse>(),
    commission: {
      producer: null as any
    },
    discounts: null as any
  },
  costs: [],
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
  shortModel: null as any,
  insured: {
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
    type: 'Person',
    address: {
      apartment: null,
      city: null,
      floor: null,
      id: null,
      postalcode: null,
      state: 'AR_23',
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
  // TODO: JC: A la espera del cambio de Vatrox.. Esto arreglara la duplicidad
  // de direcciones en GW.
  // address: undefined,
  address: undefined as any,
  inspection: {
    autogenerate: false,
    id: null as any,
    phone: {
      number: null as any
    },
    status: null as any
  }
};

export function policyReducer(
  state = initialPolicyState,
  action: PolicyActions
): PolicyState {
  switch (action.type) {
    case PolicyActionTypes.LoadPolicy:
      const _vehicles = state.motor.vehicles;
      _vehicles.push(action.payload);
      return {
        ...state,
        motor: {
          fleet: 'NonFleet',
          vehicles: _vehicles,
          commission: {
            producer: state.motor.commission.producer
          },
          discounts: state.motor.discounts
        },
        costs: []
      };
    case PolicyActionTypes.SetClientData:
      return {
        ...state,
        client: action.payload,
        insured: action.payload
      };

    case PolicyActionTypes.UpdateVehicle:
      return {
        ...state,
        motor: {
          ...state.motor,
          fleet: action.payload.length > 1 ? 'Fleet' : 'NonFleet', //TODO: MP: Validar si esta logica tiene sentido
          vehicles: action.payload
        }
      };
    case PolicyActionTypes.SetPeriodData:
      return {
        ...state,
        period: action.payload
      };
    case PolicyActionTypes.SetMailPolicy:
      return {
        ...state,
        email: action.payload
      };
    case PolicyActionTypes.SetCurrentProducer:
      return {
        ...state,
        producer: { code: action.payload }
      };
    case PolicyActionTypes.SetCurrentFiscalCondition:
      return {
        ...state,
        fiscalcondition: action.payload,
        client: {
          ...state.client,
          fiscalcondition: action.payload
        },
        insured: {
          ...state.insured,
          fiscalcondition: action.payload
        }
      };

    case PolicyActionTypes.SetBasicDataForClient:
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
          lastname: action.lastname
        }
      };
    case PolicyActionTypes.SetCurrentFiscalConditionClientAndInsured:
      return {
        ...state,
        client: {
          ...state.client,
          fiscalcondition: action.payload
        },
        insured: {
          ...state.insured,
          fiscalcondition: action.payload
        }
      };
    case PolicyActionTypes.SetCurrentCrudIncomeType:
      return {
        ...state,
        iibb: {
          type: action.payload === '' ? '' : action.payload,
          number: state.iibb.number
        }
      };
    case PolicyActionTypes.SetCurrentCrudIncomeNumber:
      return {
        ...state,
        iibb: {
          type: state.iibb.type,
          number: action.payload === '' ? '' : action.payload
        }
      };
    case PolicyActionTypes.SetCurrentCrudIncomeClientAndInsured:
      return {
        ...state,
        client: {
          ...state.client,
          iibb: {
            ...state.client.iibb,
            type: action.payload.type,
            number: action.payload.number
          }
        },
        insured: {
          ...state.insured,
          iibb: {
            ...state.insured.iibb,
            type: action.payload.type,
            number: action.payload.number
          }
        }
      };
    case PolicyActionTypes.SetCurrentPaymentMethod:
      return {
        ...state,
        payment: action.payload
      };
    case PolicyActionTypes.SetInspectionStatus:
      return {
        ...state,
        inspection: {
          autogenerate: state.inspection.autogenerate,
          id: state.inspection.id,
          phone: {
            number: state.inspection.phone.number
          },
          status: action.payload
        }
      };
    case PolicyActionTypes.SetInspectionPhoneNumber:
      return {
        ...state,
        inspection: {
          autogenerate: state.inspection.autogenerate,
          id: state.inspection.id,
          phone: {
            number: action.payload
          },
          status: state.inspection.status
        }
      };
    case PolicyActionTypes.SetCurrentPaymentTerm:
      return {
        ...state,
        paymentTerm: action.payload
      };
    case PolicyActionTypes.SetCurrentCommission:
      return {
        ...state,
        motor: {
          ...state.motor,
          commission: {
            producer: action.payload
          }
        },
        home: {
          ...state.home,
          commission: {
            producer: action.payload
          }
        }
      };
    case PolicyActionTypes.SetCurrentDiscount:
      return {
        ...state,
        motor: {
          ...state.motor,
          discounts: action.payload
        },
        home: {
          ...state.home,
          discounts: action.payload
        }
      };
    case PolicyActionTypes.SetCurrentPeriodMethod:
      return {
        ...state,
        periodMethod: action.payload
      };
    case PolicyActionTypes.SetPolicyNumber:
      return {
        ...state,
        policynumber: action.payload
      };
    case PolicyActionTypes.SetAddress:
      return {
        ...state,
        address: undefined as any,
        client: {
          ...state.client,
          address: action.payload
        },
        insured: {
          ...state.insured,
          address: action.payload
        }
      };
    case PolicyActionTypes.SetPolicyAddress:
      return {
        ...state,
        address: action.payload
      };
    case PolicyActionTypes.SetJob:
      return {
        ...state,
        job: {
          ...state.job,
          number: action.payload
        }
      };
    case PolicyActionTypes.SetPackages:
      const vehicles = state.motor.vehicles;
      return {
        ...state,
        motor: {
          ...state.motor,
          vehicles: vehicles
        }
      };
    case PolicyActionTypes.SetCertificate:
      return {
        ...state,
        client: {
          ...state.client,
          certificate: action.payload
        },
        insured: {
          ...state.insured,
          certificate: action.payload
        }
      };

    case PolicyActionTypes.SetPolicy:
      return {
        ...state,
        ...action.payload,
        address: undefined
      };
    case PolicyActionTypes.SetInsuredPartialAddress:
      return {
        ...state,
        insured: {
          ...state.insured,
          address: {
            ...state.insured.address,
            city: action.payload.city,
            state: action.payload.state
          } as IAddress
        }
      };
    case PolicyActionTypes.SetCampaign:
      return {
        ...state,
        campaign: <ICampaign>action.payload
      };
    case PolicyActionTypes.RemoveCost:
      return {
        ...state,
        costs: state.costs.filter((c) => c.vehicle !== action.payload)
      };
    case PolicyActionTypes.UpdateCosts:
      return {
        ...state,
        costs: action.payload
      };
    case PolicyActionTypes.ResetPolicy:
      return {
        ...cloneDeep(initialPolicyState),
        motor: {
          commission: {
            producer: null as any
          },
          discounts: null as any,
          fleet: '',
          vehicles: new Array<IVehicle>()
        },
        costs: null as any
      };
    case PolicyActionTypes.LoadHouse:
      const _houses = state.home.dwellings;
      _houses.push(action.payload);
      return {
        ...state,
        home: {
          ...state.home,
          fleet: 'NonFleet',
          dwellings: _houses
        }
      };
    case PolicyActionTypes.UpdateHouse:
      return {
        ...state,
        home: {
          ...state.home,
          fleet: action.payload.length > 1 ? 'Fleet' : 'NonFleet', //TODO: MP: Validar si esta logica tiene sentido
          dwellings: action.payload
        }
      };
    case PolicyActionTypes.setCurrenProductCode:
      return {
        ...state,
        productcode: action.payload
      };
    default:
      return state;
  }
}
