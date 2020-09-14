import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';
// State for this feature (Product)
export class DomainSearch {
  domain: string;
  motor: string;
  chassis: string;
  year: number;
  brand: {
    code: string;
    description: string;
  };
  model: {
    code: string;
    name: string;
  };
  version: {
    code: string;
    description: string;
  };
}
@Injectable()
export class CarService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  getCar(domain: string): Observable<DomainSearch> {
    //TODO: JC: Marcos la validacion que tengo en el front es que cuando no venga nada deberias pasarme el valor '' o null
    const apiURL = `${this.api_url}/vehicles/domains/${domain}`;
    return this.http.get<DomainSearch>(apiURL);
  }
}
