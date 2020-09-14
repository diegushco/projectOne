import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IBondholder } from '../interfaces/bondholder.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class BondholderService {
  api_url: string;
  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  getBondHolders(): Observable<IBondholder[]> {
    const apiURL = `${this.api_url}/masters/bondholders`;
    return this.http.get<IBondholder[]>(apiURL);
  }
}
