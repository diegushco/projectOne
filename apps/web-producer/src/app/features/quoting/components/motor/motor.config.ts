import { VehicleGroup } from '@sura-platform/features';
import JSON_CONF from './motor.config.json';

export interface IMotorConfiguration {
  vehicleType: VehicleGroup;
  package: Array<IPackagesConfiguration>;
  clientIsDriver: boolean;
  mechanicalAssistance: IFieldConfiguration;
  technicalPricing: IFieldConfiguration;
  hasAdditionals: boolean;
  types: string[];
}

export interface IPackagesConfiguration {
  code: string;
  name: string;
  packages: Array<IPackageConfiguration>;
  coverages: Array<ICoverageConfiguration>;
}

export interface IPackageConfiguration {
  externalid: string;
  code: string;
  description: string;
  coverages: any;
  coveragesQuoted: any;
  selected: boolean;
  limitrc: any;
  premiums: any;
  costs: any;
  group: string;
  error: IPackageErrorConfiguration;
}

export interface ICoverageConfiguration {
  code: string;
  name: string;
}

export interface IPackageErrorConfiguration {
  code: any;
  message: string;
  externalid: any;
}

export interface IFieldConfiguration {
  defaultValue?: any;
  disabled: boolean;
  visible: boolean;
}

export const MOTOR_CONF = <IMotorConfiguration[]>JSON_CONF;
