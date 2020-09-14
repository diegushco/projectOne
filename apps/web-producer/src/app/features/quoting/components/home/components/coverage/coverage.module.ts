import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCoverageComponent } from './coverage.component';
import { HomeCoverageRoutingModule } from './coverage-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { HomeListCoverageComponent } from './listcoverage/listcoverage.component';
import { HomeBlockCoverageComponent } from './blockcoverage/blockcoverage.component';

@NgModule({
  imports: [CommonModule, SharedModule, HomeCoverageRoutingModule],
  declarations: [
    HomeCoverageComponent,
    HomeListCoverageComponent,
    HomeBlockCoverageComponent
  ],
  providers: []
})
export class HomeCoverageModule {}
