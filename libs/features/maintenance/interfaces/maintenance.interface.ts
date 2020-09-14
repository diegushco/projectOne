export interface IMaintenanceResponse {
  systems: IMaintenanceSystem[];
}

export interface IMaintenanceSystem {
  name: string;
  elements: IMaintenanceElement[];
}

export interface IMaintenanceElement {
  module: string;
  state: string;
  comment?: string;

  /**
   * Format yyyy-MM-ddTHH:mm:ssZ
   */
  dateSince?: string;

  /**
   * Format yyyy-MM-ddTHH:mm:ssZ
   */
  dateUntil?: string;
}
