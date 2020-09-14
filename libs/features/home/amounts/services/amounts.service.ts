import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IAmounts } from '../interfaces/amounts.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class AmountsService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Get array suggested amounts of coverage
   *
   * @returns {Observable<IAmounts>}
   * @memberof HomeUsesService
   */
  getAmounts(
    type: string,
    meters?: number,
    city?: string,
    postalcode?: string,
    sumfireprorata?: number,
    sumfirefirstrisk?: number
  ): Observable<IAmounts> {
    let params = new HttpParams().set('type', type);

    if (meters) {
      params = params.set('meters', meters.toString());
    }
    if (city) {
      params = params.set('city', city);
    }
    if (postalcode) {
      params = params.set('postalcode', postalcode);
    }
    if (sumfireprorata) {
      params = params.set('sumfireprorata', sumfireprorata.toString());
    }
    if (sumfirefirstrisk) {
      params = params.set('postalcode', sumfirefirstrisk.toString());
    }

    const apiURL = `${this.api_url}/homes/amounts`;

    return this.http.get<IAmounts>(apiURL, { params });
  }
}
