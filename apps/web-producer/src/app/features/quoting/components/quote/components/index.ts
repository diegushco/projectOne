import { QuestionsComponent } from '../components/questions/questions.component';
import { YearComponent } from '../../motor/components/year/year.component';
import { ModelComponent } from '../../motor/components/model/model.component';
import { VersionComponent } from '../../motor/components/version/version.component';
import { LocationComponent } from '../../motor/components/location/location.component';
import { UsedestinationComponent } from '../../motor/components/usedestination/usedestination.component';
import { SumComponent } from '../../motor/components/sum/sum.component';
import { MotorComponent } from '../../motor/motor.component';
import { BrandComponent } from '../../motor/components/brand/brand.component';
import { PatentComponent } from '../../motor/components/patent/patent.component';
import { Comparecoverage } from '../../motor/components/coverage/comparecoverage/comparecoverage.component';
import { QuoteComponent } from '../containers/quote.component';
import { AgeComponent } from '../../motor/components/age/age.component';

import { HomeUseConstructionComponent } from '../../home/components/useconstruction/useconstruction.component';
import { M2Component } from '../../home/components/m2/m2.component';
import { ZonesComponent } from '../../zones/zones.component';

export const QUOTE_COMPONENTS = [
  QuoteComponent,
  YearComponent,
  ModelComponent,
  VersionComponent,
  LocationComponent,
  UsedestinationComponent,
  SumComponent,
  MotorComponent,
  BrandComponent,
  QuestionsComponent,
  PatentComponent,
  Comparecoverage,
  AgeComponent,
  HomeUseConstructionComponent,
  M2Component,
  ZonesComponent
];

export * from '../../motor/components/year/year.component';
export * from '../../motor/components/model/model.component';
export * from '../../motor/components/version/version.component';
export * from '../../motor/components/location/location.component';
export * from '../../motor/components/usedestination/usedestination.component';
export * from '../../motor/components/sum/sum.component';
export * from '../../motor/motor.component';
export * from '../../motor/components/brand/brand.component';
export * from '../components/questions/questions.component';
export * from '../../motor/components/patent/patent.component';
export * from '../../motor/components/coverage/comparecoverage/comparecoverage.component';
export * from '../containers/quote.component';
export * from '../../motor/components/age/age.component';
export * from '../../zones/zones.component';
