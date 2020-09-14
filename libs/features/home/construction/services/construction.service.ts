import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IConstruction } from '../interfaces/construction.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ConstructionService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Get list type construction home
   *
   * @returns {Observable<IConstruction[]>}
   * @memberof HomeUsesService
   */
  getAllConstructions(): Observable<IConstruction[]> {
    const apiURL = `${this.api_url}/homes/constructions`;

    return this.http.get<IConstruction[]>(apiURL);
  }
}
