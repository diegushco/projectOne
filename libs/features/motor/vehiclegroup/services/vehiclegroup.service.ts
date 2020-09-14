import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IVehicleGroup } from '../interfaces/vehiclegroup.interface';
import { HttpClient } from '@angular/common/http';
import { VehicleGroup } from '@sura-platform/features';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class VehicleGroupService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get list of vehicle groups, from selected year
   * @returns Array of vehicle groups
   */
  getAllVehicleGroups(): Observable<IVehicleGroup[]> {
    const apiURL = `${this.api_url}/vehicles/groups`;
    return this.http.get<IVehicleGroup[]>(apiURL);
  }

  /**
   * Method used to get list of vehicle groups sell by producer
   * @returns Array of vehicle groups
   */
  getAllVehicleGroupsBySell(
    producercode: string
  ): Observable<{ name: VehicleGroup; count: number }[]> {
    const apiURL = `${this.api_url}/vehicles/groups/sales?producer=${producercode}`;
    return this.http.get<{ name: VehicleGroup; count: number }[]>(apiURL);
  }
}
