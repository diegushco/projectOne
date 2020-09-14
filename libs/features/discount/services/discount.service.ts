import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IDiscount,
  IAvailableDiscounts
} from '../interfaces/discount.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class DiscountService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get payment methods
   * @returns Array of payment methods
   */
  getAllDiscounts(request: {
    job: {
      number: string;
    };
  }): Observable<IDiscount[]> {
    const apiURL = `${this.api_url}/policies/discounts`;
    return this.http.post<IDiscount[]>(apiURL, request);
  }
  /**
   * Method used to get available discounts
   *
   * @returns {Observable<IAvailableDiscounts>}
   * @memberof DiscountService
   */
  getAvailableDiscounts(request: {
    job: {
      number: string;
    };
  }): Observable<IAvailableDiscounts> {
    const apiURL = `${this.api_url}/policies/discounts/available`;
    return this.http.post<IAvailableDiscounts>(apiURL, request);
  }
}
