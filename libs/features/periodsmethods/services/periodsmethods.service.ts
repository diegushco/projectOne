import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPeriodMethod } from '../interfaces/periodmethod.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PeriodMethodService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get period methods
   * @returns Array of period methods
   */
  getAllPeriodMethods(request: {
    job: {
      number: string;
    };
  }): Observable<IPeriodMethod[]> {
    const apiURL = `${this.api_url}/policies/periodsmethods`;
    return this.http.post<IPeriodMethod[]>(apiURL, request);
  }
}
