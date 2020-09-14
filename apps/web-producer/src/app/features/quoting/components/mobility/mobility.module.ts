import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilityRoutingModule } from './mobility-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { MobilityComponent } from './mobility.component';
import {
  QuotingService,
  AccountService,
  AditionalAccessoriesService
} from '@sura-platform/features';

@NgModule({
  imports: [CommonModule, SharedModule, MobilityRoutingModule],
  exports: [],
  declarations: [MobilityComponent],
  providers: [AccountService, QuotingService, AditionalAccessoriesService]
})
export class MobilityModule {}
