import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { zip, of } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

import * as fromQuote from './index';
import * as fromQuoteActions from './quote.actions';
import * as fromPolicy from '../../../state/policy';
import * as fromProducer from '../../../../producer/state/index';
import moment from 'moment';
import {
  IDefaultAssistanceOptions,
  MechanicalAssistanceService
} from '@sura-platform/features';

@Injectable()
export class QuoteEffects {
  constructor(
    private actions$: Actions,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private storeProducer: Store<fromProducer.State>,
    private mechanicalAssistanceService: MechanicalAssistanceService
  ) {}

  @Effect()
  loadDefaultAssistance$ = this.actions$.pipe(
    ofType(fromQuoteActions.QuoteActionTypes.LoadCoverageSuccessMotor),
    // En esta respuesta obtengo el vehículo que fue modificado
    switchMap((action: fromQuoteActions.CoverageLoadedSuccessMotor) =>
      zip(
        of(action.payload),
        this.storePolicy.select(fromPolicy.getPolicyData),
        this.storeProducer.select(fromProducer.getCurrentProducer),
        this.storeQuote.select(fromQuote.getServerDate)
      )
    ),
    // Transformo la data para llamar al servicio de asistencias
    map(([coverage, policy, producer, serverDate]): [
      number,
      IDefaultAssistanceOptions
    ] => {
      const currentMotor = policy?.motor?.vehicles?.find(
        (v) => v.number === coverage?.motor?.vehicles[0]?.number
      );

      return [
        currentMotor?.number as number,
        {
          saleschannel: producer?.profile?.channel,
          producer: producer?.code?.toString(),
          type: currentMotor?.model?.type as string,
          date: moment(serverDate).format('DD/MM/YYYY'),
          vehicleage:
            (serverDate?.getFullYear() as number) -
            (currentMotor?.year as number)
        }
      ];
    }),
    // Llamada al servicio para obtener los datos de asistencia mecánica por defecto
    concatMap(([activeMotor, options]) =>
      this.mechanicalAssistanceService
        .getDefaultAssistances(options)
        .pipe(map((config) => ({ id: activeMotor, ...config })))
    ),
    map((resp) => {
      if (!resp?.default && !resp?.assistances) {
        return new fromQuoteActions.RemoveDefaultAssistanceAction(resp?.id);
      }

      return new fromQuoteActions.SetDefaultAssistanceAction(resp);
    })
  );
}
