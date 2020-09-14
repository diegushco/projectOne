import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPaymentPlan } from '../interfaces/paymentplans.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PaymentPlansService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get payment plans
   * @returns Array of payment plans
   */
  getAllPaymentPlans(
    currency: string,
    paymentMethod: string,
    producer: string,
    periodStart: string,
    periodEnd: string
  ): Observable<IPaymentPlan[]> {
    // Parche para que ande los planes de pago..
    switch (paymentMethod) {
      case 'BankingDebt':
        paymentMethod = 'ACH';
        break;
      case 'Coupon':
        paymentMethod = 'Responsive';
        break;
      default:
        break;
    }
    const request = {
      currency: currency,
      payment: {
        method: paymentMethod
      },
      producer: {
        code: producer
      },
      period: {
        start: periodStart,
        end: periodEnd
      }
    };
    const apiURL = `${this.api_url}/policies/paymentplans`;
    return this.http.post<IPaymentPlan[]>(apiURL, request);
  }
}
