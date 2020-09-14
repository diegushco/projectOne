import { Injectable } from '@angular/core';
import { IAdapter } from '@sura-platform/core';
import { IPolicy, IPackage, IVehicle } from '@sura-platform/features';
import { Store } from '@ngrx/store';
import * as fromQuote from '../components/quote/state';

import { cloneDeep, pick, remove, omit } from 'lodash';

@Injectable()
export class PolicyAdapter implements IAdapter<any> {
  activeMotor: number | null = null;
  groupSelected: string | null = null;

  constructor(private storeQuote: Store<fromQuote.State>) {
    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.activeMotor = data.activeMotor;
      this.groupSelected = data.groupCoverage;
    });
  }

  adapt(item: IPolicy) {
    let policy = cloneDeep(item) as IPolicy;
    const currentMotor = <IVehicle>(
      policy.motor.vehicles.find((v) => v.number === this.activeMotor)
    );

    // Solo dejo los packetes que corresponden a este grupo de cobertura
    // en el vehículo actual

    if (currentMotor?.packages) {
      currentMotor.packages = currentMotor.packages.filter((pkg) => {
        if (this.groupSelected === 'TR') {
          const stdAmount = <number>currentMotor?.statedamount;
          if (stdAmount < 1000000) {
            //TR
            const code = pkg?.code?.split('||')[0];
            if (code === 'TR') {
              return true;
            } else {
              return false;
            }
          } else if (stdAmount >= 1000000) {
            //TRFV
            const code = pkg?.code?.split('||')[0];
            if (code === 'TRFV') {
              return true;
            } else {
              return false;
            }
          }
        }
        return pkg.group === this.groupSelected;
      });
    }

    // Para todos los demás vehículos, elimino los paquetes no seleccionados
    policy.motor.vehicles.forEach((v) => {
      if (v.number !== this.activeMotor) {
        v.packages = <IPackage[]>v.packages?.filter((pkg) => pkg.selected);
      }

      delete v.package;
    });

    //FIXME: ML - Esto lo hago porque cuando vengo de RETRIEVE, no tengo "package.group"
    // Esto debería ponerlo en el adapter del retrieve
    policy.motor.vehicles.forEach((v) => {
      if (v.package && !v.packages?.length) {
        v.packages = [{ ...cloneDeep(v.package), selected: true }];
      }
    });

    //FIXME: ML - Posición en el array hardcodeado, editar
    //el descuento que setea el productor siempre sera negativo para GW..
    if (policy.motor.discounts) {
      policy.motor.discounts[0].value = policy.motor.discounts[0].value * -1;
    }

    // Elimino del request, información innecesaria
    policy = <IPolicy>omit(policy, ['client', 'home', 'inspection']);

    delete policy.errors;
    delete policy.costs;

    policy?.motor?.vehicles?.forEach((op) => {
      const pckFilter = <IPackage[]>op.packages?.map((jk) => {
        return pick(jk, ['campaign', 'code', 'coverages', 'error', 'selected']);
      });
      op.packages = pckFilter;

      op?.packages?.forEach((vb) => {
        vb.coverages?.forEach((cv) => {
          cv.terms?.forEach((t: any) => {
            t.value = t.value?.current || t.value;
          });
        });
      });
    });

    return policy;
  }

  adaptEdit(item: IPolicy, numberAuto = null) {
    const itemClone = cloneDeep(item);
    const policy = pick(itemClone, ['job', 'motor']) as IPolicy;

    remove(policy.motor.vehicles, (n: any) => {
      return numberAuto !== null
        ? n.number !== numberAuto
        : n.number !== this.activeMotor;
    });

    policy.motor.discounts = policy.motor.discounts?.filter(
      (d) => !isNaN(d.value)
    );

    const currentVehicle = policy.motor.vehicles[0];
    if (currentVehicle.package) {
      currentVehicle.package.coverages?.forEach((cov) =>
        cov.terms?.forEach(
          (term) => (term.value = (term.value?.current as any) || term.value)
        )
      );
    }

    currentVehicle.packages = [];

    return policy as IPolicy;
  }

  adaptAdditional(policy: IPolicy) {
    // Clono la poliza para no modificar el objeto en el componente
    let modifiedPolicy: any = cloneDeep(policy) as IPolicy;
    modifiedPolicy = omit(modifiedPolicy, ['home']);

    // Recorro vehicles, busco el paquete seleccionado o si solo
    // existe un único paquete, este será el que va como package
    modifiedPolicy.motor.vehicles.forEach((v: any) => {
      v.package =
        v?.packages?.length === 1
          ? v?.packages[0]
          : v?.packages?.find((p: any) => p.selected);

      // Elimino packages porque da error en el request
      delete v.packages;

      // Transformo los terms, value no debe ser un objeto para
      // el servicio de additionals
      v?.package?.coverages?.forEach((c: any) => {
        c.terms.forEach((t: any) => {
          t.value = t.value?.current || t.value;
        });
      });
    });

    return modifiedPolicy;
  }

  adaptHome(item: any) {
    let policy = cloneDeep(item) as IPolicy;
    if (policy.home.discounts) {
      policy.home.discounts[0].value = policy.home.discounts[0].value * -1;
      //codigo hardcodeado porque no hay api
      //para obtener el codigo de hogar
      policy.home.discounts[0].code = 'SURA_HOE_ExternalComercialDiscountMod';
    }

    policy = <IPolicy>(
      pick(policy, [
        'job',
        'period',
        'fiscalcondition',
        'iibb',
        'payment',
        'producer',
        'campaign',
        'productcode',
        'home'
      ])
    );

    policy.home.dwellings.forEach((h: any) => {
      h?.packages?.forEach((hc: any) => {
        hc.coverages?.forEach((c: any) => {
          c.terms.forEach((t: any) => {
            t.value = t.value?.current || t.value;
          });
        });
      });
    });

    return policy;
  }
}
