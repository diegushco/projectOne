import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IGender } from '../interfaces/gender.interface';
import { shareReplay } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class GenderService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get locations from province
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getGenders(): Observable<IGender[]> {
    const apiURL = `${this.api_url}/masters/genders`;
    return this.http.get<IGender[]>(apiURL).pipe(shareReplay(1));
  }
}
