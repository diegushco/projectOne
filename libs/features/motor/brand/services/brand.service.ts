import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IBrand } from '../interfaces/brand.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class BrandService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get list of brands, from selected year
   * @param {number} year  Year of car to filter brands
   * @param {string} group  Vehicle Group to filter brands (Example: Car, Pickups, etc)
   * @returns Array of brands
   */
  getBrands(year: any, group?: string): Observable<IBrand[]> {
    let params;

    if (group) {
      params = new HttpParams().set('year', year).set('group', group);
    } else {
      params = new HttpParams().set('year', year);
    }

    const apiURL = `${this.api_url}/vehicles/brands`;
    return this.http.get<IBrand[]>(apiURL, { params });
  }

  /**
   * Method used to obtain the list of the best selling brands of the channel
   *
   * @param {string} channel
   * @returns {Observable<{
   *     code: number;
   *     count: number;
   *   }>}
   * @memberof BrandService
   */
  getBrandsBySell(
    channel: string
  ): Observable<
    [
      {
        code: number;
        count: number;
      }
    ]
  > {
    const apiURL = `${this.api_url}/vehicles/brands/sales?channel=${channel}`;
    return this.http.get<any>(apiURL);
  }
}
