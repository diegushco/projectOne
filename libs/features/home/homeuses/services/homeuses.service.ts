import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHomeUses } from '../interfaces/homeuses.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class HomeUsesService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Get list of home uses
   *
   * @returns {Observable<IHomeUses[]>}
   * @memberof HomeUsesService
   */
  getUses(): Observable<IHomeUses[]> {
    const apiURL = `${this.api_url}/homes/uses`;

    return this.http.get<IHomeUses[]>(apiURL);
  }
}
