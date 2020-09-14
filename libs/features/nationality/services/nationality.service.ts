import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { INationality } from '../interfaces/nationality.interface';
import { shareReplay } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class NationalityService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get locations from province
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getNationalities(): Observable<INationality[]> {
    const apiURL = `${this.api_url}/masters/nationalities`;
    return this.http.get<INationality[]>(apiURL).pipe(shareReplay(1));
  }
}
