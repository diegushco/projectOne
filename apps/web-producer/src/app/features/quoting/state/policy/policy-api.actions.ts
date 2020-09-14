import { createAction, props } from '@ngrx/store';
import { IPolicy, ICoverageResponse } from '@sura-platform/features';

// export enum MotorApiActionTypes {
//   LoadCoverage = '[Motor API] Load Coverage',
//   LoadCoverageSuccess = '[Motor API] Coverage Loaded Success',
//   LoadCoverageFailure = '[Motor API] Load Coverage Failure',
// }

export const LoadCoverage = createAction(
  '[Motor API] Load Coverage',
  props<{ policy: IPolicy }>()
);

export const CoverageLoadedSuccess = createAction(
  '[Motor API] Load Coverage Success',
  props<{ coverage: ICoverageResponse }>()
);

export const LoadCoverageFailure = createAction(
  '[Motor API] Load Coverage Failure'
);

export type PolicyApiActions = ReturnType<
  | typeof LoadCoverage
  | typeof CoverageLoadedSuccess
  | typeof LoadCoverageFailure
>;
