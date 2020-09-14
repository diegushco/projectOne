import { Injectable } from '@angular/core';
import { IAdapter } from '@sura-platform/core';
import { IPolicy, IDiscount } from '@sura-platform/features';
import { cloneDeep, omit } from 'lodash';
import { Store } from '@ngrx/store';
import * as fromQuote from '../components/quote/state';

@Injectable()
export class QuoteIssueAdapter implements IAdapter<any> {
  activeMotor: number | null = null;

  constructor(private storeQuote: Store<fromQuote.State>) {
    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.activeMotor = data.activeMotor;
    });
  }

  adapt(item: IPolicy) {
    let policy = cloneDeep(item) as IPolicy;

    policy = <IPolicy>omit(policy, ['home']);
    // Eliminar packages de vehicles y solo dejar el paquete seleccionado en package
    policy.motor.vehicles.forEach((v) => {
      v.package = v?.packages?.find((p) => p.selected);
      delete v.packages;
    });

    delete policy.costs;

    // ML: Convierto a negativo todos los descuentos
    policy.motor.discounts.forEach((discount: IDiscount) => {
      discount.value =
        discount.value > 0 ? discount.value * -1 : discount.value;
    });

    // ML: Si la dirección del asegurado es la misma que la del cliente, entonces no
    // envío la dirección en el cliente para no duplicar direcciones
    if (
      !policy.client.accountnumber &&
      policy.client.address?.id === policy.insured.address?.id
    )
      policy.client.address = null;

    if (policy.client.accountnumber) {
      // Verifico que sea un cliente EXISTENTE
      if (policy.client?.addresses?.find((a) => a.id && a.postalcode)) {
        // Solo en policy.address enviaré los datos
        policy.client.address = null;
        policy.insured.address = null;
      } else {
        // Si es cliente existente SOLO en insured enviaré los datos
        policy.client.address = null;
        policy.address = null;
      }
    }

    policy.motor.vehicles.forEach((v) => {
      v.license = <string>v.license?.toUpperCase();
      v.chasis = <string>v.chasis?.toUpperCase();
      v.motor = <string>v.motor?.toUpperCase();

      v?.package?.coverages?.forEach((cv) => {
        cv.terms.forEach((t: any) => {
          t.value = t.value.current ? t.value.current : t.value;
        });
      });
    });

    return policy;
  }
}
