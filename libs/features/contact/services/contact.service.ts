import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IContactReq } from '../interfaces/contact.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ContactsService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get contacts from GW
   * @returns list of contacts
   */
  getContacts(request: IContactReq): Observable<any> {
    const params = new HttpParams()
      .set('firstname', request.firstname ? request.firstname : '')
      .set('lastname', request.lastname ? request.lastname : '')
      .set('companyname', request.companyname ? request.companyname : '')
      .set('type', request.type ? request.type : '')
      .set('officialidvalue', request.officialid ? request.officialid : '');

    const apiURL = `${this.api_url}/contacts`;
    return this.http.get<IContactReq[]>(apiURL, { params });
  }
}
