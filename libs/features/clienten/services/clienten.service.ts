import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IClienteN } from '../interfaces/clienten.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ClienteNService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get fiscal condition
   * @returns Array of fiscal condition
   */
  validateClientN(officialidvalue: string): Observable<IClienteN[]> {
    const params = new HttpParams().set('officialidvalue', officialidvalue);

    const apiURL = `${this.api_url}/contacts/blacklist`;
    return this.http.get<IClienteN[]>(apiURL, { params });
  }
}
