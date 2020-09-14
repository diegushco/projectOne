import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { emissionReducer } from './state/emission.reducer';
import { EmissionComponent } from './emission.component';

import {
  EmissionQuestionsComponent,
  ValidityComponent,
  PaymentMethodComponent,
  ClientTaxConditionComponent
} from './components';
import { ClientDataComponent } from '../../../client/components/client-data/client-data.component';
import { ClientResidenceComponent } from '../../../client/components/client-residence/client-residence.component';
import { OthersMotorComponent } from '../motor/components/others/others.component';
import { QuoteResolver } from './services/quote.resolver';
import JSON_CONF from '../motor/motor.config.json';
import { IMotorConfiguration } from '../motor/motor.config';

const routes: Routes = [
  {
    path: '',
    component: EmissionComponent,
    resolve: { data: QuoteResolver },
    children: [
      {
        path: 'questions',
        component: EmissionQuestionsComponent,
        children: [
          {
            path: 'client',
            component: ClientDataComponent,
            data: {
              question: 'Algunos datos más de tu cliente',
              show: true,
              disabled: false,
              value: '',
              shortName: 'Cliente',
              config: <IMotorConfiguration>JSON_CONF
            }
          },
          {
            path: 'residence',
            component: ClientResidenceComponent,
            data: {
              question: '¿Cual es tu domicilio?',
              show: true,
              disabled: true,
              value: '',
              shortName: '¿Este es el domicilio fiscal?'
            }
          },
          {
            path: 'tax-condition',
            component: ClientTaxConditionComponent,
            data: {
              question: '¿Cuál es la condición fiscal?',
              show: true,
              disabled: true,
              value: '',
              shortName: 'Condicion fiscal'
            }
          },
          {
            path: 'validity',
            component: ValidityComponent,
            data: {
              question: '¿Cuál es el inicio de vigencia?',
              show: true,
              disabled: true,
              value: '',
              shortName: 'Inicio de vigencia'
            }
          },
          {
            path: 'aditionalauto/:id',
            component: OthersMotorComponent,
            data: {
              question: '¿Cuál es le número de chasis y de motor?',
              show: true,
              disabled: true,
              value: '',
              shortName: 'Chasis y motor'
            }
          },
          {
            path: 'payment-method',
            component: PaymentMethodComponent,
            data: {
              question: '¿Cómo lo quiere pagar?',
              show: true,
              disabled: true,
              value: '',
              shortName: 'payment'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('emission', emissionReducer)
  ],
  exports: [RouterModule],
  providers: []
})
export class EmissionRoutingModule {}
