import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class DocumentationService {
  api_url: string;

  constructor(
    private http: HttpClient,
  ) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get the certificate of Coverage
   * @param {number} jobNumber  Guidewire job number
   * @returns Base64
   */
  getCoverageCertificate(jobNumber: string): Observable<any> {
    const apiURL = `${this.api_url}/documents/coveragecertificate/${jobNumber}`;
    return this.http.get(apiURL);
  }

  getVehicleQuote(jobNumber: string): Observable<any> {
    const apiURL = `${this.api_url}/documents/vehiclequote/${jobNumber}`;
    return this.http.get(apiURL);
  }

  getVehicleProducerQuote(jobNumber: string): Observable<any> {
    const apiURL = `${this.api_url}/documents/producervehiclequote/${jobNumber}`;
    return this.http.get(apiURL);
  }

  /**
   * Method used to get client policy print
   * @param {string} policynumber  Number of policy
   * @returns Base64 Document
   */
  getClientPolicyCopy(policynumber: string): Observable<any> {
    const apiURL = `${this.api_url}/documents/policycopy/${policynumber}`;
    return this.http.get(apiURL);
  }

  /**
   * Method used to get producer policy print
   * @param {string} policynumber  Number of policy
   * @returns Base64 Document
   */
  getProducerPolicyCopy(policynumber: string): Observable<any> {
    const apiURL = `${this.api_url}/documents/policyproducercopy/${policynumber}`;
    return this.http.get(apiURL);
  }
}
