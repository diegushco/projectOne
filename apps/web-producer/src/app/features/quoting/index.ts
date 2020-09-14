// import { IPolicy } from '@sura-platform/features';

export * from './components';
export * from './quoting.module';

// export interface PolicyState {
//   policy: IPolicy;
// }

import { ActionReducerMap } from '@ngrx/store';
import { policyReducer } from './state/policy/policy.reducer';
// import { motorReducer } from './components/motor/state/motor.reducer';
import { producerReducer } from '../producer/state/producer.reducer';
import { emissionReducer } from './components/emission/state/emission.reducer';
import { quoteReducer } from '../quoting/components/quote/state/quote.reducer';

export const reducers: ActionReducerMap<any> = {
  policy: policyReducer,
  quote: quoteReducer,
  // motor: motorReducer,
  producer: producerReducer,
  emission: emissionReducer
};
