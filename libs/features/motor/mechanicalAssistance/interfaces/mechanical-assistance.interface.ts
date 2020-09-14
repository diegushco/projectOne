export interface IDefaultAssistanceResponse {
  id?: number;
  default: string;
  assistances?: ICoverageAssistance[];
}

export interface ICoverageAssistance {
  code: string;
  description: string;
  assistance: string;
}

export interface IDefaultAssistanceOptions {
  /**
   * The sales channel, for example 'AMBA'
   */
  saleschannel: string;

  /**
   * Producer code
   */
  producer: string;

  /**
   * The vehicle type, for example 'Auto'
   */
  type: string;

  /**
   * Should be in next format: day/month/year
   */
  date: string;

  /**
   * The vehicle age in number, for example "8", for eight years.
   */
  vehicleage: number;
}
