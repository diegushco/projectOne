import { Action } from '@ngrx/store';
import { IProfile } from '@sura-platform/features/producer/interfaces/profile.interface';
import { IComission } from '@sura-platform/features/producer/interfaces/comission.interface';

export enum ProducerActionTypes {
  Load = '[Producer] Load',
  SetCurrentProducer = '[Producer] Set Current Producer',
  SetCurrentProducerProfile = '[Producer] Set Current Producer Profile',
  SetCurrentProducerComission = '[Producer] Set Current Producer Comission'
}

export class LoadProducergAction implements Action {
  readonly type = ProducerActionTypes.Load;
}

export class SetCurrentProducerAction implements Action {
  readonly type = ProducerActionTypes.SetCurrentProducer;

  constructor(public payload: string) {}
}

export class SetCurrentProducerProfile implements Action {
  readonly type = ProducerActionTypes.SetCurrentProducerProfile;

  constructor(public payload: IProfile) {}
}

export class SetCurrentProducerComission implements Action {
  readonly type = ProducerActionTypes.SetCurrentProducerComission;

  constructor(public payload: IComission) {}
}

export type ProducerActions =
  | LoadProducergAction
  | SetCurrentProducerAction
  | SetCurrentProducerProfile
  | SetCurrentProducerComission;
