import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHomeType } from '../interfaces/hometype.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class HomeTypesService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Get list of home uses
   *
   * @returns {Observable<IHomeType[]>}
   * @memberof HomeTypesService
   */
  getTypes(): Observable<IHomeType[]> {
    const apiURL = `${this.api_url}/homes/types`;

    return this.http.get<IHomeType[]>(apiURL);
  }
}
