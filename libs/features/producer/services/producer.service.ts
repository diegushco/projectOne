import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IProducer } from '../interfaces/producer.interface';
import { Observable } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get producer list asociated with the user
   * @returns Array of producers
   */
  getAllProducers(): Observable<IProducer[]> {
    const apiURL = `${this.api_url}/producers/codes`;
    return this.http.get<IProducer[]>(apiURL);
  }

  /**
   * Method used to get producer list asociated with the user
   * @returns Array of producers
   */
  getProfile(code: string): Observable<IProfile> {
    const apiURL = `${this.api_url}/producers/` + code;
    return this.http.get<IProfile>(apiURL);
  }
}
