import { IPackage } from '@sura-platform/features/package';

export interface IHouse {
  id: number | null;
  number: number | null;
  use: string | null;
  type: string | null;
  construction: string | null;
  m2: number | null;
  differentialcircuitbreaker: boolean;
  embeddedelectricalwiring: boolean;
  goodconditionelectric: boolean;
  soundalarmwithmonitoring: boolean;
  soundalarmonly: boolean;
  reinforceddoor: boolean;
  permanentvigilance: boolean;
  doublelock: boolean;
  zone: {
    state: string | null;
    postalcode: number | null;
    city: string | null;
  };
  package: IPackage | null;
  packages: IPackage[] | null;
}
