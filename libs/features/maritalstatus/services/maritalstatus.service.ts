import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IMaritalStatus } from '../interfaces/maritalstatus.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class MaritalStatusService {
  api_url: string;
  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get locations from province
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getMaritalStatus(): Observable<IMaritalStatus[]> {
    const apiURL = `${this.api_url}/masters/maritalstatus`;
    return this.http.get<IMaritalStatus[]>(apiURL);
  }
}
