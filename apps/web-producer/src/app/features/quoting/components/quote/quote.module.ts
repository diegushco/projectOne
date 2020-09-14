import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';

import { EffectsModule } from '@ngrx/effects';
import { PolicyEffects } from '../../state/policy/policy.effects';
import { QuoteEffects } from './state/quote.effects';
import { SharedModule } from '../../../shared/shared.module';
import { QuoteRoutingModule } from './quote-routing.routing';
import { QUOTE_COMPONENTS } from './components';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    QuoteRoutingModule,
    SharedModule,
    EffectsModule.forFeature([PolicyEffects, QuoteEffects]),
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [...QUOTE_COMPONENTS, AutoFocusDirective],
  exports: [...QUOTE_COMPONENTS],
  providers: []
})
export class QuoteModule {}
