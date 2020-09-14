import JSON_CONF from './home.config.json';
import { IPackage } from '@sura-platform/features/index.js';

export interface IHomeConfiguration {
  codesBenefitsCoverages: Array<string>;
  codesExcludeCoverages: Array<string>;
  codesNoEditables: Array<string>;
  packages: Array<IPackagesConfiguration>;
  codesInheritable: Array<IInherit>;
  callCoveragePackage: IPackage;
  orderCoverage: Array<string>;
  codesPlanPremiumsCoverages: Array<string>;
}

export interface IInherit {
  code: string;
  childs: Array<string>;
}

export interface IPackagesConfiguration {
  code: string;
  description: string;
  coverages: Array<string>;
}

export const HOME_CONF = <IHomeConfiguration>JSON_CONF;
