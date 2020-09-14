import {
  ICoverageResponse,
  IVehicle,
  IDefaultAssistanceResponse,
  IAmounts,
  IHouse
} from '@sura-platform/features';
import { IOption } from '@sura-platform/features/coverage/interfaces/option.interface';
import { QuoteActions, QuoteActionTypes } from './quote.actions';
import { IRoutesMotor } from '../../motor/interfaces/routes-motor.interface';
import { cloneDeep, remove } from 'lodash';
import { ICost, IMotorError } from '@sura-platform/features';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { ICoverage } from '@sura-platform/features/coverage';

// State for this feature (Product)
export interface QuoteState {
  motor: {
    activeMotor: number | null;
    groupCoverage: string | null;
    routes: IRoutesMotor[] | null;
    activeRoute: string | null;
    coverageResponse: ICoverageResponse[] | null;
    costs: ICost[] | null;
    clauses: IOption[] | null;
    clauseSelected: string | null;
    mechanicalAssists:
      | { number: number; mechanicalAssists: IOption[] }[]
      | null;
    defaultAssistance: IDefaultAssistanceResponse[];
    errors: Array<IMotorError> | null;
    packageAdditionals: Array<IVehicle> | null;
    uber: boolean | null;
    defaultUseDestinationActivity: any;
    coverageFail: boolean | null;
    quoteSaved: boolean | null;
    packageSelected: Array<{ code: string; number: number }> | null;
    technicalPricing: boolean;
  };
  home: {
    activeHome: number | null;
    routes: IRoutes[] | null;
    activeRoute: string | null;
    suggestedSums: IAmounts | null;
    costs: ICost[] | null;
    coverageDefaultByPck: IHouse[] | null;
    assistence: ICoverage | null;
    useconstruction: Array<{
      code: string;
      description: string;
    }>;
  };
  mobilityVisited: boolean | null;
  formMobility: {
    valid: boolean;
  } | null;
  serverDate: Date | null;
  currentLine: string | null;
  approvedQuote: boolean;
}

const initialQuotingState: QuoteState = {
  motor: {
    activeMotor: 1,
    routes: [],
    activeRoute: '',
    coverageResponse: null,
    costs: [],
    clauses: null,
    clauseSelected: null,
    errors: [],
    mechanicalAssists: null,
    defaultAssistance: [],
    packageAdditionals: null,
    uber: false,
    defaultUseDestinationActivity: null,
    groupCoverage: 'TC',
    coverageFail: false,
    quoteSaved: false,
    packageSelected: null,
    technicalPricing: false
  },
  mobilityVisited: false,
  formMobility: {
    valid: false
  },
  serverDate: null,
  home: {
    activeHome: 1,
    routes: [],
    activeRoute: '',
    suggestedSums: null,
    costs: [],
    coverageDefaultByPck: [],
    assistence: null,
    useconstruction: []
  },
  currentLine: '',
  approvedQuote: false
};

export function quoteReducer(
  state = initialQuotingState,
  action: QuoteActions
): QuoteState {
  switch (action.type) {
    case QuoteActionTypes.SetRoutesMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          routes: action.payload
        }
      };
    case QuoteActionTypes.SetActiveRouteMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          activeRoute: action.payload
        }
      };
    case QuoteActionTypes.SetCoverageResponseAll:
      return {
        ...state,
        motor: {
          ...state.motor,
          coverageResponse: action.payload
        }
      };
    case QuoteActionTypes.SetAssistMechanical:
      return {
        ...state,
        motor: {
          ...state.motor,
          mechanicalAssists: action.payload
        }
      };
    case QuoteActionTypes.SetCoverageResponseMotor:
      const coverages = action.payload.motor.vehicles.filter(
        (x) => x.number === state.motor.activeMotor
      )[0].coverages;

      const options = coverages
        .filter((x) => x.pattern.code === 'SURA_CA7_ClausulaDeAjusteCov')
        .map((c) => c.terms[0].options)[0];
      const mechanicalAssists = coverages
        .filter((x) => x.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov')
        .map((c) => c.terms[0].options)[0];
      // const clause = options[0];
      const covClone = cloneDeep(state.motor.coverageResponse);
      const coverageOld = covClone ? covClone : [];

      const assistClone = cloneDeep(state.motor.mechanicalAssists);
      const assistsOld = assistClone ? assistClone : [];

      //elimino el coverageResponse del auto, por si viene
      //por edicion
      remove(coverageOld, (n: any) => {
        return (
          n.motor.vehicles[0].number === action.payload.motor.vehicles[0].number
        );
      });

      remove(assistsOld, (n: any) => {
        return n.number === state.motor.activeMotor;
      });

      coverageOld.push(action.payload);
      assistsOld.push({
        number: <number>state.motor.activeMotor,
        mechanicalAssists: <IOption[]>mechanicalAssists
      });
      return {
        ...state,
        motor: {
          ...state.motor,
          clauses: options,
          coverageResponse: coverageOld,
          mechanicalAssists: assistsOld
        }
      };
    case QuoteActionTypes.SetCurrentClauseMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          clauseSelected: action.payload
        }
      };

    case QuoteActionTypes.SetMotorPackageSelected:
      // ML: Esto no tiene sentido, hay que ver dónde
      // lo llamamos y eliminarlo
      return state;

    case QuoteActionTypes.SetMotorPackageAdditionals:
      return {
        ...state,
        motor: {
          ...state.motor,
          packageAdditionals: action.payload
        }
      };

    case QuoteActionTypes.SetPackageSelected:
      return {
        ...state,
        motor: {
          ...state.motor,
          packageSelected: action.payload
        }
      };

    case QuoteActionTypes.SetUber:
      return {
        ...state,
        motor: {
          ...state.motor,
          uber: action.uber
        }
      };
    case QuoteActionTypes.SetGroupCoverage:
      return {
        ...state,
        motor: {
          ...state.motor,
          groupCoverage: action.payload
        }
      };

    case QuoteActionTypes.SetQuoteIsSaved:
      return {
        ...state,
        motor: {
          ...state.motor,
          quoteSaved: action.payload
        }
      };

    case QuoteActionTypes.SetDefaultUseDestinationActivity:
      return {
        ...state,
        motor: {
          ...state.motor,
          defaultUseDestinationActivity: {
            use: action.use,
            destination: action.destination,
            activity: action.activity
          }
        }
      };

    case QuoteActionTypes.SetServerDate:
      return {
        ...state,
        serverDate: action.payload
      };

    case QuoteActionTypes.LoadCoverageFailureMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          coverageFail: true
        }
      };

    // ML: Accion duplicada, se debe unificar
    case QuoteActionTypes.LoadCoverageSuccessMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          coverageFail: false
        }
      };

    case QuoteActionTypes.LoadCoverageMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          coverageFail: false
        }
      };

    case QuoteActionTypes.SetCostsResponse:
      return {
        ...state,
        motor: {
          ...state.motor,
          costs: action.payload.costs || [],
          errors: action.payload.errors || []
        }
      };

    case QuoteActionTypes.SetMobilityVisited:
      return {
        ...state,
        mobilityVisited: action.payload
      };

    case QuoteActionTypes.SetMobilityFormValidity:
      return {
        ...state,
        formMobility: {
          valid: action.payload
        }
      };

    case QuoteActionTypes.ResetQuote:
      return cloneDeep(initialQuotingState);

    case QuoteActionTypes.setCurrentMotor:
      return {
        ...state,
        motor: {
          ...state.motor,
          activeMotor: action.payload
        }
      };

    case QuoteActionTypes.setCurrentCoverageResponse:
      return {
        ...state,
        motor: {
          ...state.motor,
          coverageResponse: action.payload
        }
      };

    case QuoteActionTypes.SetCurrentLine:
      return {
        ...state,
        currentLine: action.payload
      };

    case QuoteActionTypes.SetActiveRouteHome:
      return {
        ...state,
        home: {
          ...state.home,
          activeRoute: action.payload
        }
      };

    case QuoteActionTypes.SetRoutesHome:
      return {
        ...state,
        home: {
          ...state.home,
          routes: action.payload
        }
      };

    case QuoteActionTypes.SetDefaultAssistance:
      const defaultAssistance = state.motor.defaultAssistance.filter(
        (op) => op?.id !== action.payload?.id
      );

      defaultAssistance.push(action.payload);

      return {
        ...state,
        motor: {
          ...state.motor,
          defaultAssistance
        }
      };

    case QuoteActionTypes.SetTechnicalPricing:
      return {
        ...state,
        motor: {
          ...state.motor,
          technicalPricing: action.payload
        }
      };

    case QuoteActionTypes.RemoveDefaultAssistance:
      return {
        ...state,
        motor: {
          ...state.motor,
          defaultAssistance: state.motor.defaultAssistance.filter(
            (op) => op.id !== action.payload
          )
        }
      };

    case QuoteActionTypes.RemoveAndOrderDefaultAssistance:
      return {
        ...state,
        motor: {
          ...state.motor,
          defaultAssistance: state.motor.defaultAssistance
            .filter((op) => op.id !== action.payload)
            .map((op) => {
              if (op?.id && op.id > action.payload) op.id--;

              return op;
            })
        }
      };

    case QuoteActionTypes.SetSuggestedSums:
      return {
        ...state,
        home: {
          ...state.home,
          suggestedSums: action.payload
        }
      };

    case QuoteActionTypes.SetCostsHomeResponse:
      return {
        ...state,
        home: {
          ...state.home,
          costs: action.payload.costs || []
        }
      };

    case QuoteActionTypes.SetDefaultCoverageByPck:
      return {
        ...state,
        home: {
          ...state.home,
          coverageDefaultByPck: action.payload || []
        }
      };

    case QuoteActionTypes.SetHomeAssistance:
      return {
        ...state,
        home: {
          ...state.home,
          assistence: action.payload
        }
      };
    case QuoteActionTypes.SetApprovedQuote:
      return {
        ...state,
        approvedQuote: action.payload
      };

    case QuoteActionTypes.DataBasicHouse:
      return {
        ...state,
        home: {
          ...state.home,
          useconstruction: action.payload
        }
      };

    default:
      return state;
  }
}
