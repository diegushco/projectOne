import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, concatMap, tap } from 'rxjs/operators';
// import * as fromMotorActions from '../state/motor.actions';
// import * as fromMotorReducer from '../state/motor.reducer';
import * as fromQuoteActions from '../../components/quote/state/quote.actions';
import * as fromQuote from '../../components/quote/state';
// import * as fromQuotingReducer from '../../../state/quoting.reducer';
// import * as fromQuotingActions from '../../../state/quoting.actions';
import * as fromPolicy from '../policy';
import * as fromPolicyActions from '../policy/policy.actions';
import {
  QuotingService,
  ICoverageResponse,
  IVehicle
} from '@sura-platform/features';
import { Store } from '@ngrx/store';
import { CoveragesAdapter } from '../../adapters/coverages.adapter';
import { PolicyAdapter } from '../../adapters/policy.adapter';

@Injectable()
export class PolicyEffects {
  constructor(
    private actions$: Actions,
    private quotingService: QuotingService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private coveragesAdapter: CoveragesAdapter,
    private policyAdapter: PolicyAdapter
  ) {}

  @Effect() loadCoverage$ = this.actions$.pipe(
    ofType(fromQuoteActions.QuoteActionTypes.LoadCoverageMotor),
    map((action: fromQuoteActions.LoadCoverageMotor) => {
      return {
        values: {
          payload: action.payload,
          currentMotor: action.currentMotor,
          action: action.action
        }
      };
    }),
    concatMap((data: any) => {
      this.quotingService.setGettingDataFromCoverageService(true);
      if (data.values.action === 'add' || data.values.action === 'edit') {
        const adapted = this.policyAdapter.adaptEdit(data.values.payload);
        adapted.motor.vehicles.forEach((ele) => {
          ele.action = data.values.action;
        });
        return this.quotingService.editCoverages(adapted).pipe(
          tap((x) => {
            const vehicle = data.values.payload.motor.vehicles.filter(
              (v: IVehicle) => v.number === data.values.currentMotor.number
            )[0];
            if (vehicle) {
              const patterns = x.motor.vehicles.map((p) => p.coverages);
              let options =
                patterns[0].length > 0
                  ? patterns[0]
                      .filter(
                        (k) => k.pattern.code === 'SURA_CA7_ClausulaDeAjusteCov'
                      )
                      .map((c) => c.terms[0].options)[0]
                  : null;

              //FIXME: DG hardcodeado mientras arreglan API /coverages/edit
              if (data.values.action === 'edit') {
                options = [];
                options.push({
                  code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                  description: '0'
                });
                options.push({
                  code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                  description: '10'
                });
              }

              //! Si es cero km entonces seteo por defecto en 0% la clausula, de lo contrario
              //! seteo un 10%
              if (options && data.values.currentMotor.zerokm === true) {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(options[0].code)
                );
              } else if (options) {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(options[1].code)
                );
              } else {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(null)
                );
              }

              data.values.payload.motor.vehicles.forEach((v: IVehicle) => {
                if (v.number === data.values.currentMotor.number) {
                  v.use = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].use;
                  v.activity = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].activity;
                  v.destination = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].destination;

                  //FIXME: DG, hardcodeado estos valores, hasta
                  //que arreglen API con nueva respuesta de GW
                  if (v.use === null || v.use === undefined) {
                    v.use = 3;
                  }
                  if (v.destination === null || v.destination === undefined) {
                    v.destination = 1;
                  }
                  if (v.activity === null || v.activity === undefined) {
                    v.activity = 'AC_99';
                  }
                }
              });

              vehicle.added = true;
              this.storePolicy.dispatch(
                new fromPolicyActions.UpdateVehicleAction(
                  data.values.payload.motor.vehicles
                )
              );
            }
          }),
          tap((x) =>
            this.storePolicy.dispatch(
              new fromPolicyActions.SetPeriodData(x.period)
            )
          ),
          tap((x) =>
            this.storePolicy.dispatch(
              new fromPolicyActions.SetJob(x.job.number)
            )
          ),
          tap(() =>
            this.quotingService.setGettingDataFromCoverageService(false)
          ),
          map(
            (coverage: ICoverageResponse) =>
              new fromQuoteActions.CoverageLoadedSuccessMotor(coverage)
          ),
          tap((x) => {
            this.storeQuote.dispatch(
              new fromQuoteActions.SetCoverageResponseMotor(x.payload)
            );
          })
        );
      } else if (data.values.action === null) {
        const adapted = this.coveragesAdapter.adapt(data.values.payload);
        return this.quotingService.getCoverages(adapted).pipe(
          tap((x) => {
            const vehicle = data.values.payload.motor.vehicles.filter(
              (v: IVehicle) => v.number === data.values.currentMotor.number
            )[0];
            if (vehicle) {
              const patterns = x.motor.vehicles.map((p) => p.coverages);
              const options =
                patterns[0].length > 0
                  ? patterns[0]
                      .filter(
                        (k) => k.pattern.code === 'SURA_CA7_ClausulaDeAjusteCov'
                      )
                      .map((c) => c.terms[0].options)[0]
                  : null;

              //! Si es cero km entonces seteo por defecto en 0% la clausula, de lo contrario
              //! seteo un 10%
              if (options && data.values.currentMotor.zerokm === true) {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(options[0].code)
                );
              } else if (options) {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(options[1].code)
                );
              } else {
                this.storeQuote.dispatch(
                  new fromQuoteActions.SetCurrentClauseMotor(null)
                );
              }

              data.values.payload.motor.vehicles.forEach((v: IVehicle) => {
                if (v.number === data.values.currentMotor.number) {
                  v.use = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].use;
                  v.activity = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].activity;
                  v.destination = x.motor.vehicles.filter(
                    (k) => k.number === data.values.currentMotor.number
                  )[0].destination;
                }
              });

              this.storePolicy.dispatch(
                new fromPolicyActions.UpdateVehicleAction(
                  data.values.payload.motor.vehicles
                )
              );
            }
            this.storePolicy.dispatch(
              new fromPolicyActions.SetPeriodData(x.period)
            );
            this.storePolicy.dispatch(
              new fromPolicyActions.SetJob(x.job.number)
            );
            this.quotingService.setGettingDataFromCoverageService(false);
          }),
          map(
            (coverage: ICoverageResponse) =>
              new fromQuoteActions.CoverageLoadedSuccessMotor(coverage)
          ),
          tap((x) => {
            this.storeQuote.dispatch(
              new fromQuoteActions.SetCoverageResponseMotor(x.payload)
            );
          })
        );
      }
    })
  );
}
