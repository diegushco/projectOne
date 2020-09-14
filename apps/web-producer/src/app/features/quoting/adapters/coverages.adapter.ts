import { Injectable } from '@angular/core';
import { IAdapter } from '@sura-platform/core';
import { IPolicy } from '@sura-platform/features';
import { cloneDeep, omit, pick } from 'lodash';

@Injectable()
export class CoveragesAdapter implements IAdapter<any> {
  constructor() {}

  adapt(item: IPolicy) {
    let policy: any = cloneDeep(item);

    // ML: Evito pasar el driver en coverage y también
    // el package porque rompe con el nuevo mapeo
    policy.motor.vehicles.forEach((vehicle: any) => {
      vehicle.driver = null;
      vehicle.packages = null;
    });

    policy = omit(policy, ['client', 'insured', 'home']);
    return policy;
  }

  adaptHome(item: IPolicy) {
    let policy: any = cloneDeep(item);

    policy = omit(policy, [
      'client',
      'insured',
      'policynumber',
      'email',
      'paymentTerm',
      'periodMethod',
      'officialid',
      'campaign',
      'motor',
      'shortModel',
      'inspection'
    ]);
    policy.home.dwellings.forEach((hd: any) => {
      delete hd.differentialcircuitbreaker;
      delete hd.embeddedelectricalwiring;
      delete hd.goodconditionelectric;
      delete hd.soundalarmwithmonitoring;
      delete hd.soundalarmonly;
      delete hd.reinforceddoor;
      delete hd.permanentvigilance;
      delete hd.doublelock;
    });

    return policy;
  }

  adaptAdditionalHome(item: IPolicy) {
    let policy: any = cloneDeep(item);

    policy = pick(policy, ['job', 'home']);

    policy.home.dwellings.forEach((dw: any) => {
      delete dw.packages;
    });

    return policy;
  }
}
