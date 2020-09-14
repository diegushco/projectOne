import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAccount } from '../interfaces/account.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class AccountService {
  api_url: string;
  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }
  /**
   * Method used to get comissions
   * @returns Array of comissions
   */
  getAccounts(request: {
    officialid: {
      type: string;
      value: string;
    };
  }): Observable<IAccount> {
    const params = new HttpParams()
      .set('officialidtype', request.officialid.type)
      .set('officialidvalue', request.officialid.value);

    const apiURL = `${this.api_url}/accounts`;
    return this.http.get<IAccount>(apiURL, { params });
  }

  getPaymentInstruments(account: string): Observable<any[]> {
    const params = new HttpParams().set('accountnumber', account);
    const apiURL = `${this.api_url}/paymentinstruments`;
    return this.http.get<any>(apiURL, { params });
  }
}
