import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSummaryComponent } from './summary.component';
import { HomeSummaryRoutingModule } from './summary-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HouseDataComponent } from './components/home/houseData/houseData.component';
import { SummaryGeneralComponent } from './components/home/summary-general/summary-general.component';
import { PaymentCommissionsComponent } from './components/home/payment-commissions/payment-commissions.component';
import { ProtectionMeasureComponent } from './components/home/protectionMeasure/protectionMeasure.component';
import { PlanDetailComponent } from './components/home/planDetails/planDetails.component';

@NgModule({
  imports: [CommonModule, SharedModule, HomeSummaryRoutingModule],
  declarations: [
    HomeSummaryComponent,
    HouseDataComponent,
    SummaryGeneralComponent,
    ProtectionMeasureComponent,
    PlanDetailComponent,
    PaymentCommissionsComponent,
    ProtectionMeasureComponent
  ],
  providers: []
})
export class SummaryModule {}
