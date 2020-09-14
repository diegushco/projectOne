import { Action } from '@ngrx/store';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { IAddress, IAccount } from '@sura-platform/features';

export enum EmissionActionTypes {
  SetRoutes = '[Emission] Set Routes',
  SetActiveRoute = '[Emission] Set Active Route',
  SetClientAddresses = '[Emission] Set Client Addresses',
  SetClientData = '[Emission] Set Client Data Emission',
  SetUWIssue = '[Emission] Set UW Issue',
  SetEmissionVisited = '[Emission] Set Emission Visited',
  SetBasicDataForClient = '[Emission] Set Basic Data For Client',
  SetFormEmissionClientIsValid = '[Emission] Set Form Emission Client Is Valid',
  SetFormEmissionResidenceIsValid = '[Emission] Set Form Emission Residence Is Valid',
  SetFormEmissionTaxIsValid = '[Emission] Set Form Emission Tax Is Valid',
  SetFormEmissionValidityIsValid = '[Emission] Set Form Emission Validity Is Valid',
  SetFormEmissionOthersIsValid = '[Emission] Set Form Emission Others Is Valid',
  SetFormEmissionPaymentIsValid = '[Emission] Set Form Emission Payment Is Valid',
  SetJobNumberFromQuotes = '[Emission] Set Job Number From Quotes',
  SetPolicyAddressFromQuotes = '[Emission] Set Policy Address From Quotes',
  SetApprovedEmission = '[Emission] Set Emission As Approved',
  ResetEmission = '[Emission] Reset'
}

export class SetRoutes implements Action {
  readonly type = EmissionActionTypes.SetRoutes;

  constructor(public payload: IRoutes[]) {}
}

export class SetActiveRoute implements Action {
  readonly type = EmissionActionTypes.SetActiveRoute;

  constructor(public payload: string) {}
}

export class SetClientAddresses implements Action {
  readonly type = EmissionActionTypes.SetClientAddresses;

  constructor(public payload: IAddress[]) {}
}

export class SetEmissionVisited implements Action {
  readonly type = EmissionActionTypes.SetEmissionVisited;

  constructor(public payload: boolean) {}
}

export class SetBasicDataForClientAction implements Action {
  readonly type = EmissionActionTypes.SetBasicDataForClient;

  constructor(
    public typePerson: string,
    public companyname: string,
    public firstname: string,
    public lastname: string,
    public contactid: string,
    public documentNumber: string,
    public documentType: string,
    public address: IAddress
  ) {}
}

export class SetClientData implements Action {
  readonly type = EmissionActionTypes.SetClientData;

  constructor(public payload: IAccount) {}
}

export class SetUWIssueAction implements Action {
  readonly type = EmissionActionTypes.SetUWIssue;

  constructor(public payload: boolean) {}
}

export class SetJobNumberFromQuotesAction implements Action {
  readonly type = EmissionActionTypes.SetJobNumberFromQuotes;

  constructor(public payload: string) {}
}

export class SetFormEmissionClientIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionClientIsValid;

  constructor(public payload: boolean) {}
}

export class SetFormEmissionResidenceIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionResidenceIsValid;

  constructor(public payload: boolean) {}
}

export class SetFormEmissionTaxIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionTaxIsValid;

  constructor(public payload: boolean) {}
}

export class SetFormEmissionValidityIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionValidityIsValid;

  constructor(public payload: boolean) {}
}

export class SetFormEmissionOthersIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionOthersIsValid;

  constructor(public payload: boolean) {}
}

export class SetFormEmissionPaymentIsValidAction implements Action {
  readonly type = EmissionActionTypes.SetFormEmissionPaymentIsValid;

  constructor(public payload: boolean) {}
}

export class SetPolicyAddressFromQuotesAction implements Action {
  readonly type = EmissionActionTypes.SetPolicyAddressFromQuotes;

  constructor(public payload: IAddress) {}
}

export class SetApprovedEmissionAction implements Action {
  readonly type = EmissionActionTypes.SetApprovedEmission;

  constructor(public payload: boolean) {}
}

export class ResetEmissionAction implements Action {
  readonly type = EmissionActionTypes.ResetEmission;
}

export type EmissionActions =
  | SetRoutes
  | SetUWIssueAction
  | SetFormEmissionClientIsValidAction
  | SetFormEmissionResidenceIsValidAction
  | SetFormEmissionTaxIsValidAction
  | SetFormEmissionValidityIsValidAction
  | SetFormEmissionOthersIsValidAction
  | SetFormEmissionPaymentIsValidAction
  | SetActiveRoute
  | SetClientAddresses
  | SetEmissionVisited
  | SetBasicDataForClientAction
  | SetClientData
  | SetJobNumberFromQuotesAction
  | SetPolicyAddressFromQuotesAction
  | SetApprovedEmissionAction
  | ResetEmissionAction;
