import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEmission from './emission.reducer';

// Policy: Ipolicy;

export interface State {
  emission: fromEmission.EmissionState;
}

// Selector functions
const getEmissionFeatureState = createFeatureSelector<
  fromEmission.EmissionState
>('emission');

export const getEmission = createSelector(
  getEmissionFeatureState,
  (state) => state
);

export const getRoutes = createSelector(
  getEmissionFeatureState,
  (state) => state.routes
);

export const getActiveRoute = createSelector(
  getEmissionFeatureState,
  (state) => state.activeRoute
);

export const getClientAddresses = createSelector(
  getEmissionFeatureState,
  (state) => state.client.addresses
);

export const getClientData = createSelector(
  getEmissionFeatureState,
  (state) => state.client
);

export const getUwIssueData = createSelector(
  getEmissionFeatureState,
  (state) => state.uwIssue
);

export const getEmissionHasVisited = createSelector(
  getEmissionFeatureState,
  (state) => state.emissionVisited
);

export const getFormClientIsValid = createSelector(
  getEmissionFeatureState,
  (state) => state.formEmission.clientIsValid
);

export const getFormResidenceIsValid = createSelector(
  getEmissionFeatureState,
  (state) => state.formEmission.residenceIsValid
);

export const getFormTaxIsValid = createSelector(
  getEmissionFeatureState,
  (state) => state.formEmission.taxIsValid
);

export const getFormValidityIsValid = createSelector(
  getEmissionFeatureState,
  (state) => state.formEmission.validityIsValid
);

export const getFormOtherIsValid = createSelector(
  getEmissionFeatureState,
  (state) => state.formEmission.othersIsValid
);

export const getJobNumber = createSelector(
  getEmissionFeatureState,
  (state) => state.jobNumberFromQuotes
);

export const getPolicyAddressFromQuote = createSelector(
  getEmissionFeatureState,
  (state) => state.policyAddressFromQuotes
);
