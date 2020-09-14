import { Action } from '@ngrx/store';
import {
  IVehicle,
  IPaymentPlan,
  IPeriodMethod,
  IDiscount,
  IPolicy,
  IAccount,
  IAddress,
  IPayment,
  ICrudIncome,
  ICampaign,
  ICost,
  IHouse
} from '@sura-platform/features';
import { IPackage } from '@sura-platform/features/package';

export enum PolicyActionTypes {
  LoadPolicy = '[Policy] Load',
  LoadMotorData = '[Policy] Load Motor Data',
  SetClientData = '[Policy] Set Client Data',
  UpdateVehicle = '[Policy] Update Vehicle',
  SetCurrentMotorData = '[Policy] Set Current Motor Data',
  SetCurrentProducer = '[Policy] Set Current Producer',
  SetPeriodData = '[Policy] Set Period Data',
  SetAddress = '[Policy] Set Address Data',
  SetCurrentFiscalCondition = '[Policy] Set Current FiscalCondition',
  SetCurrentFiscalConditionClientAndInsured = '[Policy (Client - Insured)] Set Current FiscalCondition',
  SetCurrentCrudIncomeType = '[Policy] Set Current IIBB Type',
  SetCurrentCrudIncomeNumber = '[Policy] Set Current IIBB Number',
  SetCurrentPaymentTerm = '[Policy] Set Current PaymentTerm',
  SetCurrentPaymentMethod = '[Policy] Set Current PaymentMethod',
  SetCurrentDiscount = '[Policy] Set Current Discount',
  SetCurrentCommission = '[Policy] Set Current Commission',
  SetCurrentPeriodMethod = '[Policy] Set Current PeriodMethod',
  SetJob = '[Policy] Set Job',
  SetPackages = '[Policy] Set Packages',
  SetShortModel = '[Policy] Set Short Model',
  CallCostMotor = '[Policy] Call Cost Motor',
  CallCostMotorSuccessMotor = '[Policy] Call Cost Success Motor',
  CallCostMotorFailureMotor = '[Policy] Call Cost Failure Motor',
  SetMailPolicy = '[Policy] Set Mail',
  SetCurrentCrudIncomeClientAndInsured = '[Policy (Client - Insured)] Set Current IIBB',
  SetInspectionStatus = '[Policy] Set Inspection',
  SetInspectionPhoneNumber = '[Policy] Set Inspection Phone Number',
  SetCertificate = '[Policy (Client - Insured)] Set certificate dates',
  SetPolicyNumber = '[Policy] Set Policy Number',
  SetBasicDataForClient = '[Policy] Set Basic Data For Client',
  SetPolicy = '[Policy] Set Policy',
  SetPolicyAddress = '[Policy] Set Policy Address',
  SetInsuredPartialAddress = '[Policy] Set Insured Partial Address',
  SetCampaign = '[Policy] Set Campaign',
  RemoveCost = '[Policy] Remove Cost,',
  UpdateCosts = '[Policy] Update Costs',
  ResetPolicy = '[Policy] Reset',
  UpdateHouse = '[Policy-Home] Update House',
  LoadHouse = '[Policy-Home] Load House',
  setCurrenProductCode = '[Policy-Home] set current productcode'
}

export class LoadPolicy implements Action {
  readonly type = PolicyActionTypes.LoadPolicy;

  constructor(public payload: IVehicle) {}
}

export class SetClientDataAction implements Action {
  readonly type = PolicyActionTypes.SetClientData;

  constructor(public payload: IAccount) {}
}

export class SetPolicyAction implements Action {
  readonly type = PolicyActionTypes.SetPolicy;

  constructor(public payload: any) {}
}

export class UpdateVehicleAction implements Action {
  readonly type = PolicyActionTypes.UpdateVehicle;

  constructor(public payload: IVehicle[]) {}
}

export class SetMailDataAction implements Action {
  readonly type = PolicyActionTypes.SetMailPolicy;

  constructor(public payload: string) {}
}

export class SetCurrentMotorData implements Action {
  readonly type = PolicyActionTypes.SetCurrentMotorData;
  constructor(public payload: IVehicle) {}
}

export class SetCurrentProducerAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentProducer;

  constructor(public payload: string) {}
}

export class SetPeriodData implements Action {
  readonly type = PolicyActionTypes.SetPeriodData;

  constructor(public payload: any) {}
}
export class SetCurrentFiscalConditionAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentFiscalCondition;

  constructor(public payload: string) {}
}

export class SetBasicDataForClientAction implements Action {
  readonly type = PolicyActionTypes.SetBasicDataForClient;

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

export class SetCurrentFiscalConditionClientAndInsuredAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentFiscalConditionClientAndInsured;

  constructor(public payload: string) {}
}

export class SetCurrentCrudIncomeTypeAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentCrudIncomeType;

  constructor(public payload: string) {}
}

export class SetCurrentCrudIncomeNumberAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentCrudIncomeNumber;

  constructor(public payload: string) {}
}

export class SetCurrentPaymentTermAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentPaymentTerm;

  constructor(public payload: IPaymentPlan) {}
}

export class SetCurrentPaymentMethodAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentPaymentMethod;

  constructor(public payload: IPayment) {}
}

export class SetCurrentDiscountAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentDiscount;

  constructor(public payload: IDiscount[]) {}
}

export class SetCurrentCommissionAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentCommission;

  constructor(public payload: number) {}
}

export class SetCurrentPeriodMethod implements Action {
  readonly type = PolicyActionTypes.SetCurrentPeriodMethod;

  constructor(public payload: IPeriodMethod) {}
}

export class SetJob implements Action {
  readonly type = PolicyActionTypes.SetJob;

  constructor(public payload: string) {}
}

export class SetPackages implements Action {
  readonly type = PolicyActionTypes.SetPackages;

  constructor(public packages: IPackage[], public currentMotor: IVehicle) {}
}

export class SetShortModel implements Action {
  readonly type = PolicyActionTypes.SetShortModel;

  constructor(public payload: string) {}
}

export class CallCostMotor implements Action {
  readonly type = PolicyActionTypes.CallCostMotor;

  constructor(public payload: IPolicy) {}
}

export class CallCostMotorSuccessMotor implements Action {
  readonly type = PolicyActionTypes.CallCostMotorSuccessMotor;

  constructor(public payload: IPolicy) {}
}

export class CallCostMotorFailureMotor implements Action {
  readonly type = PolicyActionTypes.CallCostMotorFailureMotor;

  constructor(public payload: IPolicy) {}
}

export class SetAddressAction implements Action {
  readonly type = PolicyActionTypes.SetAddress;

  constructor(public payload: IAddress) {}
}

export class SetPolicyAddressAction implements Action {
  readonly type = PolicyActionTypes.SetPolicyAddress;

  constructor(public payload: IAddress) {}
}

export class SetCurrentCrudIncomeClientAndInsuredAction implements Action {
  readonly type = PolicyActionTypes.SetCurrentCrudIncomeClientAndInsured;

  constructor(public payload: ICrudIncome) {}
}

export class SetInspectionStatusAction implements Action {
  readonly type = PolicyActionTypes.SetInspectionStatus;

  constructor(public payload: string) {}
}

export class SetInspectionPhoneNumberAction implements Action {
  readonly type = PolicyActionTypes.SetInspectionPhoneNumber;

  constructor(public payload: string) {}
}

export class SetPolicyNumberAction implements Action {
  readonly type = PolicyActionTypes.SetPolicyNumber;

  constructor(public payload: string) {}
}

export class SetCampaignAction implements Action {
  readonly type = PolicyActionTypes.SetCampaign;

  constructor(public payload: ICampaign | null) {}
}

export class SetCertificateAction implements Action {
  readonly type = PolicyActionTypes.SetCertificate;

  constructor(
    public payload: {
      start: string;
      end: string;
    }
  ) {}
}

/**
 * Acción utilizada para asignar únicamente la provincia
 * y localidad del cliente asegurado
 *
 * @export
 * @class SetInsuredPartialAddressAction
 * @implements {Action}
 */
export class SetInsuredPartialAddressAction implements Action {
  readonly type = PolicyActionTypes.SetInsuredPartialAddress;

  /**
   * Creates an instance of SetInsuredPartialAddressAction.
   * @param {{
   *       state: string;
   *       city: string;
   *     }} payload
   * @memberof SetInsuredPartialAddressAction
   */
  constructor(
    public payload: {
      state: string;
      city: string;
    }
  ) {}
}

export class RemoveCostAction implements Action {
  readonly type = PolicyActionTypes.RemoveCost;

  constructor(public payload: number) {}
}

export class UpdateCostsAction implements Action {
  readonly type = PolicyActionTypes.UpdateCosts;

  constructor(public payload: ICost[]) {}
}

export class ResetPolicyAction implements Action {
  readonly type = PolicyActionTypes.ResetPolicy;
}

export class UpdateHouseAction implements Action {
  readonly type = PolicyActionTypes.UpdateHouse;

  constructor(public payload: IHouse[]) {}
}

export class LoadHouse implements Action {
  readonly type = PolicyActionTypes.LoadHouse;

  constructor(public payload: IHouse) {}
}

export class SetCurrenProductCodeAction implements Action {
  readonly type = PolicyActionTypes.setCurrenProductCode;

  constructor(public payload: string) {}
}

export type PolicyActions =
  | LoadPolicy
  | SetPolicyAddressAction
  | SetPolicyAction
  | SetPolicyNumberAction
  | SetBasicDataForClientAction
  | SetAddressAction
  | SetClientDataAction
  | UpdateVehicleAction
  | SetCurrentMotorData
  | SetCurrentProducerAction
  | SetPeriodData
  | SetCurrentFiscalConditionAction
  | SetCurrentCrudIncomeTypeAction
  | SetCurrentCrudIncomeNumberAction
  | SetCurrentPaymentTermAction
  | SetCurrentPaymentMethodAction
  | SetCurrentDiscountAction
  | SetCurrentCommissionAction
  | SetCurrentPeriodMethod
  | SetJob
  | SetPackages
  | SetShortModel
  | CallCostMotor
  | CallCostMotorSuccessMotor
  | CallCostMotorFailureMotor
  | SetMailDataAction
  | SetInspectionStatusAction
  | SetInspectionPhoneNumberAction
  | SetCurrentCrudIncomeClientAndInsuredAction
  | SetCurrentFiscalConditionClientAndInsuredAction
  | SetCertificateAction
  | SetInsuredPartialAddressAction
  | SetCampaignAction
  | RemoveCostAction
  | UpdateCostsAction
  | ResetPolicyAction
  | UpdateHouseAction
  | LoadHouse
  | SetCurrenProductCodeAction;
