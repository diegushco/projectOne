import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IUse } from '../interfaces/use.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class UseService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get uses
   * @returns Array of uses
   */
  getAllUses(): Observable<IUse[]> {
    const apiURL = `${this.api_url}/vehicles/uses`;
    return this.http.get<IUse[]>(apiURL);
  }

  /**
   * Method used to get uses from vehicle type
   * @param {string} type
   * @returns {Observable<IUse[]>}
   * @memberof UseService
   */
  getUses(type: string): Observable<IUse[]> {
    const params = new HttpParams().set('type', type);
    const apiURL = `${this.api_url}/vehicles/uses`;
    return this.http.get<IUse[]>(apiURL, { params });
  }
}
