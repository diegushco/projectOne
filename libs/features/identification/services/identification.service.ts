import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IDocument } from '../interfaces/document.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class IdentificationService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get locations from province
   * @param {number} province  Province to filter locations
   * @returns Array of locations
   */
  getDocumentTypes(): Observable<IDocument[]> {
    const apiURL = `${this.api_url}/masters/officialid`;
    return this.http.get<IDocument[]>(apiURL);
  }
}
