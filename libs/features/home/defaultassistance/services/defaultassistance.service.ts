import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IDefaultAssistance } from '../interfaces/defaultassistance.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class DefaultAssistanceService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Get default assistance - Home
   *
   * @returns {Observable<IDefaultAssistance[]>}
   * @memberof HomeUsesService
   */
  getDefaultAssistance(
    saleschannel: string,
    producercode: string
  ): Observable<IDefaultAssistance> {
    const params = new HttpParams()
      .set('saleschannel', saleschannel)
      .set('producercode', producercode);

    const apiURL = `${this.api_url}/homes/defaultassistance`;

    return this.http.get<IDefaultAssistance>(apiURL, { params });
  }
}
