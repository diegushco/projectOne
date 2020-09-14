import { OthersMotorComponent } from '../../motor/components/others/others.component';
import { EmissionComponent } from '../emission.component';
import { EmissionQuestionsComponent } from './emission-questions/emission-questions.component';
import { ValidityComponent } from './validity/validity.component';
import { PaymentMethodComponent } from './paymentmethod/paymentmethod.component';
import { DetailsComponent } from './details/details.component';
import { ClientDataComponent } from '../../../../client/components/client-data/client-data.component';
import { ClientResidenceComponent } from '../../../../client/components/client-residence/client-residence.component';
import { ClientTaxConditionComponent } from '../../../../client/components/client-tax-condition/client-tax-condition.component';
import { DriverComponent } from '../../motor/components/driver/driver.component';
import { PeriodMethodPipe, CardNumberPipe } from '@sura-platform/core';

export const EMISSION_COMPONENTS = [
  EmissionComponent,
  EmissionQuestionsComponent,
  ClientDataComponent,
  ClientResidenceComponent,
  ClientTaxConditionComponent,
  ValidityComponent,
  OthersMotorComponent,
  PaymentMethodComponent,
  DetailsComponent,
  DriverComponent,
  PeriodMethodPipe,
  CardNumberPipe
];

export * from '../../../../client/components/client-data/client-data.component';
export * from '../../../../client/components/client-residence/client-residence.component';
export * from '../../../../client/components/client-tax-condition/client-tax-condition.component';
export * from './validity/validity.component';
export * from '../components/emission-questions/emission-questions.component';
export * from '../emission.component';
export * from '../../motor/components/others/others.component';
export * from './paymentmethod/paymentmethod.component';
export * from './details/details.component';
export * from '../../motor/components/driver/driver.component';
