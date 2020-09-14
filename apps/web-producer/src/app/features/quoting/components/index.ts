import { Comparecoverage } from './motor/components/coverage/comparecoverage/comparecoverage.component';
import { QuotingComponent } from '../containers/quoting.component';
import { YearComponent } from './motor/components/year/year.component';
import { ModelComponent } from './motor/components/model/model.component';
import { VersionComponent } from './motor/components/version/version.component';
import { LocationComponent } from './motor/components/location/location.component';
import { UsedestinationComponent } from './motor/components/usedestination/usedestination.component';
import { SumComponent } from './motor/components/sum/sum.component';
import { MotorComponent } from './motor/motor.component';
import { BrandComponent } from './motor';
import { CurrencyPipe } from '@sura-platform/core/pipes/currency.pipe';
import { PatentComponent } from './motor/components/patent/patent.component';
import { SelectProducerComponent } from '../../producer/select-producer.component';
import { AgeComponent } from './motor/components/age/age.component';

export const QUOTING_COMPONENTS = [
  QuotingComponent,
  SelectProducerComponent,
  YearComponent,
  ModelComponent,
  VersionComponent,
  LocationComponent,
  UsedestinationComponent,
  SumComponent,
  MotorComponent,
  BrandComponent,
  CurrencyPipe,
  PatentComponent,
  SelectProducerComponent,
  Comparecoverage,
  AgeComponent
];

export * from '../../producer/select-producer.component';
export * from '../containers/quoting.component';
export * from './motor/components/patent/patent.component';
export * from './motor/components/year/year.component';
export * from './motor/components/model/model.component';
export * from './motor/components/brand/brand.component';
export * from './motor/components/version/version.component';
export * from './motor/components/location/location.component';
export * from './motor/components/usedestination/usedestination.component';
export * from './motor/components/sum/sum.component';
export * from './motor/motor.component';
export * from './motor/components/coverage/coverage.component';
export * from './motor/components/coverage/listcoverage/listcoverage.component';
export * from './motor/components/coverage/blockcoverage/blockcoverage.component';
export * from './motor/components/coverage/summarycoverage/summarycoverage.component';
export * from '@sura-platform/core/pipes/currency.pipe';
export * from './motor/components/coverage/comparecoverage/comparecoverage.component';
export * from './motor/components/age/age.component';
