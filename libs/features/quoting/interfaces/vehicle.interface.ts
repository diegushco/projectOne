import { IBrand, IModel } from '@sura-platform/features/motor';
import { IZone } from '@sura-platform/features/zone';
import { IPackage } from '@sura-platform/features/package';
import { VehicleGroup } from './vehicle-group.enum';

export interface IVehicle {
  id: number;
  license: string | null;
  number: number;
  zerokm: boolean;
  motor: string | null;
  chasis: string | null;
  use: number | null;
  destination: number | null;
  activity: string | null;
  gnc: boolean;
  gps: boolean;
  zone: IZone;
  year: number | null;
  statedamount: number | null;
  brand: IBrand;
  driver: {
    firstname: string | null;
    lastname: string | null;
    birth: string | null;
    gender: string | null;
    clientIsDriver: boolean;
  } | null;
  bondholder: {
    type: number | null;
    number: string | null;
    start: string | null;
    finish: string | null;
    firstinstallmentdue: string | null;
    quotas: number | null;
  } | null;
  model: IModel;
  group: VehicleGroup | null;
  packages: Array<IPackage> | null;
  package?: IPackage | null;
  garage: string | null;
  kmstraveled: string | null;
  useName: string | null;
  shortModel: string | null;
  blacklist: boolean;
  patentInUse: boolean;
  added: boolean; //flag para saber si ese auto ya fue agregado o no con coverages/edit
  action?: string;
}
