import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProducerState } from './producer.reducer';
import * as fromProducer from './producer.reducer';

export interface State {
  producer: fromProducer.ProducerState;
}

/* NgRx */
// Selector functions
const getProducerFeatureState = createFeatureSelector<ProducerState>(
  'producer'
);

export const getCurrentProducer = createSelector(
  getProducerFeatureState,
  (state) => state
);
