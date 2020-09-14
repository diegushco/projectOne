import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { CoverageComponent } from './coverage.component';
import { CoverageRoutingModule } from './coverage-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { BlockCoverageComponent } from './blockcoverage/blockcoverage.component';
import { ListCoverageComponent } from './listcoverage/listcoverage.component';
// import { SummaryCoverageComponent } from '../..';
import { AdditionalComponent } from './additional/additional.component';
import { AccountService } from '@sura-platform/features';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoverageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [
    CoverageComponent,
    BlockCoverageComponent,
    ListCoverageComponent,
    // SummaryCoverageComponent,
    AdditionalComponent
  ],
  providers: [AccountService]
})
export class CoverageModule {}
