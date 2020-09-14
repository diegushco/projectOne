import { IComission } from './comission.interface';
import { IProfile } from './profile.interface';

export interface IProducer {
  code: string;
  description: string;
  profile: IProfile;
  commission: IComission;
}
