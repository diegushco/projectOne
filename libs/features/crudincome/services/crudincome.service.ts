import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICrudIncome } from '../interfaces/crudincome.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class CrudIncomeService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get fiscal condition
   * @returns Array of fiscal condition
   */
  getAllCrudIncome(): Observable<ICrudIncome[]> {
    const apiURL = `${this.api_url}/masters/iibb`;
    return this.http.get<ICrudIncome[]>(apiURL);
  }
}
