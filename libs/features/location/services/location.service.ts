import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ILocation } from '../interfaces/location.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class LocationService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get locations from province
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getLocations(province?: string): Observable<ILocation[]> {
    const params = new HttpParams().set('state', province);
    const apiURL = `${this.api_url}/zones/`;
    return this.http.get<ILocation[]>(apiURL, { params });
  }

  /**
   * Method used to get province and location from postalCode
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getLocationAndProvince(postalCode: number): Observable<ILocation[]> {
    const params = new HttpParams().set('postalcode', postalCode.toString());
    //TODO: MP: No funciona la API reveer con Kevin
    const apiURL = `${this.api_url}/zones/`;
    return this.http.get<ILocation[]>(apiURL, { params });
  }
}
