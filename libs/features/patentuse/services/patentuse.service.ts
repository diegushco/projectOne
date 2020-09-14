import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IPatentUse } from '../interfaces/patentuse.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class PatentUseService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get patent if is use or not
   * @returns Array of patent in use
   */
  validePatentInUse(
    domain: string,
    datesince: string,
    dateuntil: string
  ): Observable<IPatentUse[]> {
    const params = new HttpParams()
      .set('domain', domain)
      .set('datesince', datesince)
      .set('dateuntil', dateuntil);

    const apiURL = `${this.api_url}/vehicles/domains/search`;
    return this.http.get<IPatentUse[]>(apiURL, { params });
  }
}
