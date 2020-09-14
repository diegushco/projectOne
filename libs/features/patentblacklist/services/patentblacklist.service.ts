import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IPatentBlackList } from '../interfaces/patentblacklist.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PatentBlackListService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get fiscal condition
   * @returns Array of fiscal condition
   */
  validePatent(
    domain: string,
    motor?: string,
    chassis?: string
  ): Observable<IPatentBlackList[]> {
    const params = new HttpParams()
      .set('domain', domain)
      .set('motor', motor)
      .set('chassis', chassis);

    const apiURL = `${this.api_url}/vehicles/blacklist`;
    return this.http.get<IPatentBlackList[]>(apiURL, { params });
  }
}
