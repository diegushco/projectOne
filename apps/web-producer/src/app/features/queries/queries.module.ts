import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { QUERIES_COMPONENTS } from './components';
import { QueriesRoutingModule } from './queries-routing.module';
import { QuotesService } from '@sura-platform/features';

@NgModule({
  imports: [CommonModule, QueriesRoutingModule, SharedModule],
  declarations: [QUERIES_COMPONENTS],
  providers: [QuotesService]
})
export class QueriesModule {}
