import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuote from './quote.reducer';

export interface State {
  Quote: fromQuote.QuoteState;
}

// Selector functions

const getQuoteState = createFeatureSelector<fromQuote.QuoteState>('quote');

// export const getPolicyData = createSelector(
//   getPolicyState,
//   (state) => state
// );

export const getQuoteMotorData = createSelector(
  getQuoteState,
  (state) => state.motor
);

export const getQuoteApproved = createSelector(
  getQuoteState,
  (state) => state.approvedQuote
);
export const getQuoteMotorGroupCoverageSelected = createSelector(
  getQuoteState,
  (state) => state.motor.groupCoverage
);

export const getCoverageResponseMotorData = createSelector(
  getQuoteState,
  (state) => {
    let coverageCurrent = null;
    if (state.motor.coverageResponse) {
      coverageCurrent = state.motor.coverageResponse.filter(
        (jk) => jk.motor.vehicles[0].number === state.motor.activeMotor
      )[0];
    }

    return coverageCurrent;
  }
);

export const getCoverageResponseAllMotorData = createSelector(
  getQuoteState,
  (state) => {
    return state.motor.coverageResponse;
  }
);

export const getQuoteDefaultUseDestinationActivity = createSelector(
  getQuoteState,
  (state) => state.motor.defaultUseDestinationActivity
);

export const getQuoteUber = createSelector(
  getQuoteState,
  (state) => state.motor.uber
);

export const getQuoteAdditionals = createSelector(
  getQuoteState,
  (state) => state.motor.packageAdditionals
);

export const getPackageSelected = createSelector(
  getQuoteState,
  (state) => state.motor.packageSelected
);

export const getGroupCoverage = createSelector(
  getQuoteState,
  (state) => state.motor.groupCoverage
);

export const getServerDate = createSelector(
  getQuoteState,
  (state) => state.serverDate
);

export const getIsCoverageFailed = createSelector(
  getQuoteState,
  (state) => state.motor.coverageFail
);

export const getQuoteIsSaved = createSelector(
  getQuoteState,
  (state) => state.motor.quoteSaved
);

export const getCosts = createSelector(
  getQuoteState,
  (state) => state.motor.costs
);

export const getMotorErrors = createSelector(
  getQuoteState,
  (state) => state.motor.errors
);

export const getMechanicalAssists = createSelector(
  getQuoteState,
  (state) => state.motor.mechanicalAssists
);

export const getActiveMotor = createSelector(
  getQuoteState,
  (state) => state.motor.activeMotor
);

export const getMobilityVisitedStatus = createSelector(
  getQuoteState,
  (state) => state.mobilityVisited
);

export const getMobilityFormValidity = createSelector(
  getQuoteState,
  (state) => state?.formMobility?.valid
);

export const getTechnicalPricing = createSelector(
  getQuoteState,
  (state) => state.motor.technicalPricing
);

export const getCurrentLine = createSelector(
  getQuoteState,
  (state) => state.currentLine
);

export const getQuoteHomeData = createSelector(
  getQuoteState,
  (state) => state.home
);

export const getsuggestedSums = createSelector(
  getQuoteState,
  (state) => state.home.suggestedSums
);

export const getQuoteHomeActiveHome = createSelector(
  getQuoteState,
  (state) => state.home.activeHome
);

export const getQuoteHomeRoutes = createSelector(
  getQuoteState,
  (state) => state.home.routes
);

export const getCoverageDefault = createSelector(
  getQuoteState,
  (state) => state.home.coverageDefaultByPck
);

export const getHomeAssistance = createSelector(
  getQuoteState,
  (state) => state.home.assistence
);

export const getHomeCosts = createSelector(
  getQuoteState,
  (state) => state.home.costs
);
