import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddressType } from '../interfaces/addresstype.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class AddressTypeService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get address type
   * @returns Array of addresstype
   */
  getAddressType(): Observable<IAddressType[]> {
    const apiURL = `${this.api_url}/masters/addresstypes`;
    return this.http.get<IAddressType[]>(apiURL);
  }
}
