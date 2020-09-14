import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IFiscalcondition } from '../interfaces/fiscalcondition.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class FiscalConditionService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get fiscal condition
   * @returns Array of fiscal condition
   */
  getAllFiscalCondition(): Observable<IFiscalcondition[]> {
    const apiURL = `${this.api_url}/masters/fiscalconditions`;
    return this.http.get<IFiscalcondition[]>(apiURL);
  }
}
