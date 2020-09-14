import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPaymentMethod } from '../interfaces/paymentmethod.interface';
import { Observable } from 'rxjs';
import { ICreditCard } from '../interfaces/creditcard.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PaymentMethodService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get payment methods
   * @returns Array of payment methods
   */
  getAllPaymentMethods(request): Observable<IPaymentMethod[]> {
    const data = {
      job: {
        number: request.number
      }
    };

    const apiURL = `${this.api_url}/policies/paymentmethods`;
    return this.http.post<IPaymentMethod[]>(apiURL, data);
  }

  getCreditCards(bin: string): Observable<ICreditCard[]> {
    const apiURL = `${this.api_url}/paymentinstruments/creditcards?bin=${bin}`;
    return this.http.get<ICreditCard[]>(apiURL);
  }
}
