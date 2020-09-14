import { IComission } from '@sura-platform/features/producer/interfaces/comission.interface';
import { ProducerActions, ProducerActionTypes } from './producer.actions';
import { IProducer } from '@sura-platform/features/producer';
import { IProfile } from '@sura-platform/features/producer/interfaces/profile.interface';

export class ProducerState implements IProducer {
  code: string;
  description: string;
  profile: IProfile;
  commission: IComission;
}

const initialProducerState: IProducer = {
  code: '',
  description: '',

  profile: {
    channel: '',
    codeProvince: '',
    city: '',
    province: '',
    lines: {
      home: false,
      motor: false,
      personalaccident: false
    },
    planid: '',
    catalogs: {
      motor: null
    }
  },
  commission: {
    lines: {
      default: {
        administratorcharge: 0,
        commissions: {
          producer: {
            default: 0,
            maximum: 0
          },
          organizer: {
            default: 0,
            maximum: 0
          },
          superorganizer: {
            default: 0,
            maximum: 0
          }
        }
      },
      motor: {
        administratorcharge: 0,
        commissions: {
          producer: {
            default: 0,
            maximum: 0
          },
          organizer: {
            default: 0,
            maximum: 0
          },
          superorganizer: {
            default: 0,
            maximum: 0
          }
        }
      },
      home: {
        administratorcharge: 0,
        commissions: {
          producer: {
            default: 0,
            maximum: 0
          },
          organizer: {
            default: 0,
            maximum: 0
          },
          superorganizer: {
            default: 0,
            maximum: 0
          }
        }
      },
      personalaccident: {
        administratorcharge: 0,
        commissions: {
          producer: 0,
          organizer: 0,
          superorganizer: 0
        }
      }
    }
  }
};

export function producerReducer(
  state = initialProducerState,
  action: ProducerActions
): ProducerState {
  switch (action.type) {
    case ProducerActionTypes.SetCurrentProducer:
      return {
        ...state,
        code: action.payload
      };
    case ProducerActionTypes.SetCurrentProducerProfile:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
