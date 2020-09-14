import { Action } from '@ngrx/store';
import {
  ICoverageResponse,
  IPolicy,
  IVehicle,
  IAmounts,
  IDefaultAssistanceResponse,
  IHouse
} from '@sura-platform/features';
import { IPackage } from '@sura-platform/features/package';
import { IRoutesMotor } from '../../motor/interfaces/routes-motor.interface';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { ICoverage } from '@sura-platform/features/coverage';

export enum QuoteActionTypes {
  Load = '[Quote] Load',
  SetCostsResponse = '[Quote - Costs] Set Costs Response',
  SetRoutesMotor = '[Quote - Motor] Set Routes',
  SetActiveRouteMotor = '[Quote - Motor] Set Active Route',
  SetCoverageResponseMotor = '[Quote - Motor] Set Coverage Response',
  LoadCoverageMotor = '[Motor API] Load Coverage',
  LoadCoverageSuccessMotor = '[Motor API] Coverage Loaded Success',
  LoadCoverageFailureMotor = '[Motor API] Load Coverage Failure',
  SetCurrentClauseMotor = '[Quote - Motor] Set Current Clause',
  SetMotorPackageSelected = '[Quote - Motor] Set Package Selected',
  SetUber = '[Quote - Motor] Set Uber',
  SetDefaultUseDestinationActivity = '[Quote - Motor] Set Default Use Destination Activity',
  SetMotorPackageAdditionals = '[Quote - Motor] Set Package Additional',
  SetGroupCoverage = '[Quote - Motor] Set Group Coverage',
  SetServerDate = '[Quote] Set Server Date',
  SetQuoteIsSaved = '[Quote] Set Quote is Saved',
  ResetQuote = '[Quote] Reset',
  setCurrentMotor = '[Quote] Set Current Motor',
  setCurrentCoverageResponse = '[Quote] Set Current Coverage Motor',
  SetCoverageResponseAll = '[Quote] Set Current Coverage All',
  SetAssistMechanical = '[Quote] Set Current AssistMechanical All',
  SetPackageSelected = '[Quote] Set Package Selected',
  SetMobilityVisited = '[Quote] Set Mobility Visited',
  SetMobilityFormValidity = '[Quote] Set Mobility Form Validity',
  SetRoutesHome = '[Quote - Home] Set Routes',
  SetCurrentLine = '[Quote - Home] Set Set Current Line',
  SetActiveRouteHome = '[Quote - Home] Set Active Route Home',
  SetSuggestedSums = '[Quote - Home] Set suggested sum coverage',
  SetDefaultAssistance = '[Quote - Motor] Set Default Assistance',
  SetTechnicalPricing = '[Quote - Motor] Set Technical Pricing',
  RemoveDefaultAssistance = '[Quote - Motor] Remove Default Assistance',
  RemoveAndOrderDefaultAssistance = '[Quote - Motor] Remove And Order Default Assistance',
  SetCostsHomeResponse = '[Quote - Home] Set Costs Response',
  SetDefaultCoverageByPck = '[Quote - Home] Set default Coverages by PCK',
  SetHomeAssistance = '[Quote - Home] Set Home Assistance',
  SetApprovedQuote = '[Quote] Set Approved Quote',
  DataBasicHouse = '[Quote - Home] Set basic data'
}

export class Load implements Action {
  readonly type = QuoteActionTypes.Load;
}

export class SetRoutesMotor implements Action {
  readonly type = QuoteActionTypes.SetRoutesMotor;

  constructor(public payload: IRoutesMotor[]) {}
}

export class SetActiveRouteMotor implements Action {
  readonly type = QuoteActionTypes.SetActiveRouteMotor;

  constructor(public payload: string) {}
}

export class SetCoverageResponseMotor implements Action {
  readonly type = QuoteActionTypes.SetCoverageResponseMotor;

  constructor(public payload: ICoverageResponse) {}
}

export class LoadCoverageMotor implements Action {
  readonly type = QuoteActionTypes.LoadCoverageMotor;

  constructor(
    public payload: IPolicy,
    public currentMotor: IVehicle,
    public action: string | null
  ) {}
}

export class SetQuoteIsSavedMotor implements Action {
  readonly type = QuoteActionTypes.SetQuoteIsSaved;

  constructor(public payload: boolean) {}
}

export class CoverageLoadedSuccessMotor implements Action {
  readonly type = QuoteActionTypes.LoadCoverageSuccessMotor;

  constructor(public payload: ICoverageResponse) {}
}

export class LoadCoverageFailureMotor implements Action {
  readonly type = QuoteActionTypes.LoadCoverageFailureMotor;

  constructor(public payload: ICoverageResponse) {}
}

export class SetCurrentClauseMotor implements Action {
  readonly type = QuoteActionTypes.SetCurrentClauseMotor;

  constructor(public payload: string | null) {}
}

export class SetMotorPackageSelected implements Action {
  readonly type = QuoteActionTypes.SetMotorPackageSelected;

  constructor(public payload: IPackage) {}
}

export class SetUber implements Action {
  readonly type = QuoteActionTypes.SetUber;

  constructor(public uber: boolean) {}
}

export class SetGroupCoverage implements Action {
  readonly type = QuoteActionTypes.SetGroupCoverage;

  constructor(public payload: string) {}
}

export class SetDefaultUseDestinationActivity implements Action {
  readonly type = QuoteActionTypes.SetDefaultUseDestinationActivity;

  constructor(
    public use: number,
    public destination: number,
    public activity: string
  ) {}
}

export class SetMotorPackageAdditionals implements Action {
  readonly type = QuoteActionTypes.SetMotorPackageAdditionals;

  constructor(public payload: Array<IVehicle>) {}
}

export class SetServerDateAction implements Action {
  readonly type = QuoteActionTypes.SetServerDate;

  constructor(public payload: Date) {}
}

export class SetCostsResponseAction implements Action {
  readonly type = QuoteActionTypes.SetCostsResponse;

  constructor(public payload: IPolicy) {}
}

export class SetMobilityVisitedAction implements Action {
  readonly type = QuoteActionTypes.SetMobilityVisited;

  constructor(public payload: boolean) {}
}

export class SetMobilityFormValidityAction implements Action {
  readonly type = QuoteActionTypes.SetMobilityFormValidity;

  constructor(public payload: boolean) {}
}

export class ResetQuoteAction implements Action {
  readonly type = QuoteActionTypes.ResetQuote;

  constructor() {}
}

export class SetCurrentMotorAction implements Action {
  readonly type = QuoteActionTypes.setCurrentMotor;

  constructor(public payload: number) {}
}

export class SetCurrentCoverageResponseAction implements Action {
  readonly type = QuoteActionTypes.setCurrentCoverageResponse;

  constructor(public payload: any) {}
}

export class SetCoverageResponseAllAction implements Action {
  readonly type = QuoteActionTypes.SetCoverageResponseAll;

  constructor(public payload: any) {}
}

export class SetAssistMechanicalAction implements Action {
  readonly type = QuoteActionTypes.SetAssistMechanical;

  constructor(public payload: any) {}
}

export class SetPackageSelectedAction implements Action {
  readonly type = QuoteActionTypes.SetPackageSelected;

  constructor(public payload: any) {}
}

export class SetRoutesHome implements Action {
  readonly type = QuoteActionTypes.SetRoutesHome;

  constructor(public payload: IRoutes[]) {}
}

export class SetCurrentLine implements Action {
  readonly type = QuoteActionTypes.SetCurrentLine;

  constructor(public payload: string) {}
}
export class SetActiveRouteHomeAction implements Action {
  readonly type = QuoteActionTypes.SetActiveRouteHome;

  constructor(public payload: string) {}
}

export class SetSuggestedSumsAction implements Action {
  readonly type = QuoteActionTypes.SetSuggestedSums;

  constructor(public payload: IAmounts) {}
}
export class SetDefaultAssistanceAction implements Action {
  readonly type = QuoteActionTypes.SetDefaultAssistance;

  constructor(public payload: IDefaultAssistanceResponse) {}
}

export class RemoveDefaultAssistanceAction implements Action {
  readonly type = QuoteActionTypes.RemoveDefaultAssistance;

  constructor(public payload: number) {}
}

export class RemoveAndOrderDefaultAssistanceAction implements Action {
  readonly type = QuoteActionTypes.RemoveAndOrderDefaultAssistance;

  constructor(public payload: number) {}
}

export class SetCostsHomeResponseAction implements Action {
  readonly type = QuoteActionTypes.SetCostsHomeResponse;

  constructor(public payload: IPolicy) {}
}

export class SetDefaultCoverageByPckAction implements Action {
  readonly type = QuoteActionTypes.SetDefaultCoverageByPck;

  constructor(public payload: IHouse[]) {}
}

export class SetHomeAssistanceAction implements Action {
  readonly type = QuoteActionTypes.SetHomeAssistance;

  constructor(public payload: ICoverage) {}
}
export class SetTechnicalPricingAction implements Action {
  readonly type = QuoteActionTypes.SetTechnicalPricing;

  constructor(public payload: boolean) {}
}

export class SetApprovedQuoteAction implements Action {
  readonly type = QuoteActionTypes.SetApprovedQuote;

  constructor(public payload: boolean) {}
}

export class DataBasicHouseAction implements Action {
  readonly type = QuoteActionTypes.DataBasicHouse;

  constructor(public payload: any) {}
}

export type QuoteActions =
  | Load
  | SetServerDateAction
  | SetGroupCoverage
  | SetRoutesMotor
  | SetActiveRouteMotor
  | SetCoverageResponseMotor
  | LoadCoverageMotor
  | CoverageLoadedSuccessMotor
  | LoadCoverageFailureMotor
  | SetCurrentClauseMotor
  | SetMotorPackageSelected
  | SetUber
  | SetQuoteIsSavedMotor
  | SetDefaultUseDestinationActivity
  | SetMotorPackageAdditionals
  | ResetQuoteAction
  | SetCurrentMotorAction
  | SetCostsResponseAction
  | SetCoverageResponseAllAction
  | SetCurrentCoverageResponseAction
  | SetPackageSelectedAction
  | SetMobilityVisitedAction
  | SetMobilityFormValidityAction
  | ResetQuoteAction
  | SetAssistMechanicalAction
  | SetRoutesHome
  | SetCurrentLine
  | SetActiveRouteHomeAction
  | SetSuggestedSumsAction
  | SetDefaultAssistanceAction
  | SetTechnicalPricingAction
  | RemoveDefaultAssistanceAction
  | RemoveAndOrderDefaultAssistanceAction
  | SetCostsHomeResponseAction
  | SetDefaultCoverageByPckAction
  | SetHomeAssistanceAction
  | SetApprovedQuoteAction
  | DataBasicHouseAction;
