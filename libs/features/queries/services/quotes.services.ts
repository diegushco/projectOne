import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IQuotesRequest } from '../interfaces/motor/quotes.request.interface';
import { IQuotesResponse } from '../interfaces/motor/quotes.response.interface';
import { IQuotesUnderwritersRequest } from '../interfaces/motor/quotes.underwriters.request.interface';
import { IQuotesUnderwritersResponse } from '../interfaces/motor/quotes.underwriters.response.interface';
import { Observable } from 'rxjs';
import { IPolicy } from '../../quoting/interfaces/policy.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class QuotesService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get quotes
   * @returns Array of quotes
   */
  getQuotes(request: IQuotesRequest): Observable<IQuotesResponse[]> {
    const apiURL = `${this.api_url}/policies/quotes/search`;
    return this.http.post<IQuotesResponse[]>(apiURL, request);
  }

  /**
   * Method used to get quotes underwriters
   * @returns Array of underwriters
   */
  getQuotesUnderwriters(
    request: IQuotesUnderwritersRequest
  ): Observable<IQuotesUnderwritersResponse[]> {
    const apiURL = `${this.api_url}/policies/quotes/underwriters`;
    return this.http.post<IQuotesUnderwritersResponse[]>(apiURL, request);
  }

  getQuote(jobNumber: string): Observable<Partial<IPolicy>> {
    const request = {
      job: {
        number: jobNumber
      }
    };
    const apiURL = `${this.api_url}/policies/quotes/retrieve`;
    return this.http.post<Partial<IPolicy>>(apiURL, request);
  }
}
