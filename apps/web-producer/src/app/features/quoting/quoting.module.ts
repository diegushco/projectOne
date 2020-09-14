import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuotingRoutingModule } from './quoting-routing.module';
import { QuotingComponent, CurrencyPipe } from './components';
import {
  QuotingService,
  YearService,
  BrandService,
  ModelService,
  VehicleGroupService,
  ActivityService,
  DestinationService,
  UseService,
  SumInsuredService,
  ProvinceService,
  LocationService,
  CarService,
  FiscalConditionService,
  CrudIncomeService,
  PaymentMethodService,
  PaymentTermsService,
  AditionalAccessoriesService,
  ComissionService,
  DiscountService,
  CampaignService,
  PeriodMethodService,
  PaymentPlansService,
  DocumentationService,
  IdentificationService,
  ContactsService,
  UtilService,
  PatentUseService,
  PatentBlackListService,
  InspectionService,
  HomeUsesService,
  HomeTypesService,
  ConstructionService,
  AmountsService,
  MechanicalAssistanceService,
  DefaultAssistanceService
} from '@sura-platform/features';
import { FlowRouteService } from './components/quote/services/flow-route.service';
import { RouterExtService } from './components/quote/services/router-ext.service';
import { PolicyAdapter } from './adapters/policy.adapter';
import { QuoteIssueAdapter } from './adapters/quote-issue.adapter';
import { CoveragesAdapter } from './adapters/coverages.adapter';
import { ThankyouComponent } from './components/emission/components/thankyou/thankyou.component';
import { InspectionComponent } from './components/motor/components/inspection/inspection.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    QuotingRoutingModule,
    SharedModule,
    TextMaskModule
    // StoreModule.forFeature('quote', quoteReducer),
    // EffectsModule.forFeature([PolicyEffects])
  ],
  declarations: [QuotingComponent, ThankyouComponent, InspectionComponent],
  exports: [],
  providers: [
    CurrencyPipe,
    FlowRouteService,
    QuotingService,
    YearService,
    BrandService,
    ModelService,
    VehicleGroupService,
    ActivityService,
    DestinationService,
    UseService,
    SumInsuredService,
    ProvinceService,
    LocationService,
    CarService,
    FiscalConditionService,
    CrudIncomeService,
    PaymentMethodService,
    PaymentTermsService,
    AditionalAccessoriesService,
    RouterExtService,
    ComissionService,
    DiscountService,
    CampaignService,
    PeriodMethodService,
    PaymentPlansService,
    DocumentationService,
    IdentificationService,
    ContactsService,
    PolicyAdapter,
    QuoteIssueAdapter,
    CoveragesAdapter,
    UtilService,
    PatentUseService,
    PatentBlackListService,
    InspectionService,
    HomeUsesService,
    ConstructionService,
    HomeTypesService,
    AmountsService,
    MechanicalAssistanceService,
    DefaultAssistanceService
  ]
})
export class QuotingModule {}
