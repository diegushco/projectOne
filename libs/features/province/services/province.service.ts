import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IProvince } from '../interfaces/province.interface';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ProvinceService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get provinces
   * @returns Array of provinces
   */
  getAllProvinces(): Observable<IProvince[]> {
    const apiURL = `${this.api_url}/zones/states`;
    return this.http.get<IProvince[]>(apiURL).pipe(shareReplay(1));
  }
}
