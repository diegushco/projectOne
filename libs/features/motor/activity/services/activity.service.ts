import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IActivity } from '../interfaces/activity.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ActivityService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get activities
   * @returns Array of activities
   */
  getAllActivities(): Observable<IActivity[]> {
    const apiURL = `${this.api_url}/vehicles/activities`;
    return this.http.get<IActivity[]>(apiURL);
  }

  /**
   * Method used to get activities from vehicle type, use and destination
   *
   * @param {string} type
   * @param {string} use
   * @param {string} destination
   * @returns {Observable<IActivity[]>}
   * @memberof ActivityService
   */
  getActivities(
    type: string,
    use: number,
    destination: number
  ): Observable<IActivity[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('use', use.toString())
      .set('destination', destination.toString());
    const apiURL = `${this.api_url}/vehicles/activities`;
    return this.http.get<IActivity[]>(apiURL, { params });
  }
}
