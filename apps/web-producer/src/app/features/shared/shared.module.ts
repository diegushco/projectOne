import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@sura-platform/web';

import { NgSelectModule } from '@ng-select/ng-select';
import { LottieModule } from 'ngx-lottie';

import { SelectProducerComponent } from '../producer/select-producer.component';
import { SummaryCoverageComponent } from '../quoting/components/motor/components/coverage/summarycoverage/summarycoverage.component';

export function playerFactory() {
  return import('lottie-web');
}

const MODULES = [UIModule, NgSelectModule];

@NgModule({
  declarations: [SelectProducerComponent, SummaryCoverageComponent],
  imports: [...MODULES, LottieModule.forRoot({ player: playerFactory })],
  exports: [...MODULES, SelectProducerComponent, SummaryCoverageComponent]
})
export class SharedModule {}
