import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IDestination } from '../interfaces/destination.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class DestinationService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get destinations
   * @returns Array of destinations
   */
  getAllDestinations(): Observable<IDestination[]> {
    const apiURL = `${this.api_url}/vehicles/destinations`;
    return this.http.get<IDestination[]>(apiURL);
  }

  /**
   * Method used to get destinations from vehicle type and use
   *
   * @param {string} type Vehicle type
   * @param {number} use Use
   * @returns {Observable<IDestination[]>}
   * @memberof DestinationService
   */
  getDestinations(type: string, use: number): Observable<IDestination[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('use', use.toString());
    const apiURL = `${this.api_url}/vehicles/destinations`;
    return this.http.get<IDestination[]>(apiURL, { params });
  }
}
