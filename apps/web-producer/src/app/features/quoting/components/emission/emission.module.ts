import { NgModule } from '@angular/core';
import { EmissionRoutingModule } from './emission-routing.routing';
import { SharedModule } from '../../../shared/shared.module';
import { PeriodMethodPipe, CardNumberPipe } from '@sura-platform/core';
import { EMISSION_COMPONENTS } from './components';
import { LottieModule } from 'ngx-lottie';
import {
  GenderService,
  IdentificationService,
  DocumentationService,
  AccountService,
  NationalityService,
  AddressTypeService,
  MaritalStatusService,
  ClienteNService,
  PatentBlackListService,
  QuotesService,
  PatentUseService,
  BondholderService
} from '@sura-platform/features';
import { FlowRouteEmissionService } from './services/flow-route-emission.service';
import { QuoteResolver } from './services/quote.resolver';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  imports: [
    SharedModule,
    EmissionRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [...EMISSION_COMPONENTS],
  declarations: [EMISSION_COMPONENTS],
  providers: [
    GenderService,
    IdentificationService,
    DocumentationService,
    FlowRouteEmissionService,
    AccountService,
    NationalityService,
    PeriodMethodPipe,
    CardNumberPipe,
    AddressTypeService,
    MaritalStatusService,
    ClienteNService,
    PatentBlackListService,
    QuoteResolver,
    QuotesService,
    PatentUseService,
    BondholderService
  ]
})
export class EmissionModule { }
