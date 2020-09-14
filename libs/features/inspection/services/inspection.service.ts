import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IInspectionRequest } from '../interfaces/inspection.interface';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class InspectionService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get link photoUp and AutoInspection
   */
  getLinkPhotoUpAndAutoInspection(
    request: IInspectionRequest
  ): Observable<any> {
    const apiURL = `${this.api_url}/policies/inspections/emailphotoup`;
    return this.http.post<IInspectionRequest[]>(apiURL, request);
  }

  /**
   * Method used to send phone
   */
  sendPhone(request: IInspectionRequest): Observable<any> {
    const apiURL = `${this.api_url}/policies/inspections/phonecordination`;
    return this.http.post<IInspectionRequest[]>(apiURL, request);
  }

  /**
   * Method used to policy front
   */
  policyFileUp(request: IInspectionRequest): Observable<any> {
    const apiURL = `${this.api_url}/policies/inspections/policyfilesup`;
    return this.http.post<IInspectionRequest[]>(apiURL, request);
  }
}
