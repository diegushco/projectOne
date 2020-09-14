export interface IProfile {
  planid: string;
  channel: string;
  codeProvince: string;
  city: string;
  province: string;
  lines: {
    motor: boolean;
    home: boolean;
    personalaccident: boolean;
  };
  catalogs: {
    motor: number;
  };
}
