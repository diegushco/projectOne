import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ISumInsured } from '../interfaces/suminsured.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class SumInsuredService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get sum insured from selected brad, model and version
   *
   * @param {number} producercode
   * @param {string} fleet
   * @param {string} type
   * @param {string} destination
   * @param {number} statedamount
   * @returns Object with default, maximum and minimum sum insured
   * @memberof SumInsuredService
   */
  getSumInsured(
    producercode: string,
    fleet: string,
    type: string,
    statedamount: number
  ): Observable<ISumInsured> {
    const params = new HttpParams()
      .set('producercode', producercode)
      .set('fleet', fleet)
      .set('type', type)
      .set('statedamount', statedamount.toString());

    const apiURL = `${this.api_url}/vehicles/amountlimits`;
    return this.http.get<ISumInsured>(apiURL, { params });
  }
}
