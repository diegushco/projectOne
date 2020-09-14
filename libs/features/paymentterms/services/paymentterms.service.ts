import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { IPaymentTerms } from '../interfaces/paymentterms.interface';
import { Observable, of } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PaymentTermsService {
  api_url: string;

  constructor() { // private http: HttpClient,
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get payment terms
   * @returns Array of payment terms
   */
  getAllPaymentTerms(): Observable<IPaymentTerms[]> {
    const arr: IPaymentTerms[] = new Array<IPaymentTerms>(
      {
        code: 1,
        name: '3'
      },
      {
        code: 2,
        name: '5'
      }
    );

    return of(arr);
    // const apiURL = `${this.api_url}/+`;
    // return this.http.get<IPaymentTerms[]>(apiURL);
  }
}
