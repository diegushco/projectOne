import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IComission } from '../interfaces/comission.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ComissionService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get comissions
   * @returns Array of comissions
   */
  getAllComissions(request: {
    job: {
      number: string;
    };
  }): Observable<IComission> {
    const apiURL = `${this.api_url}/policies/commissions`;
    return this.http.post<IComission>(apiURL, request);
  }
}
