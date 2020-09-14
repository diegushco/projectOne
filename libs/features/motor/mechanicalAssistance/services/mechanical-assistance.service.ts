import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@sura-platform/environments/environment';
import { Observable } from 'rxjs';
import {
  IDefaultAssistanceOptions,
  IDefaultAssistanceResponse
} from '../interfaces/mechanical-assistance.interface';

@Injectable()
export class MechanicalAssistanceService {
  private api_url = environment.api_root;

  constructor(private http: HttpClient) {}

  getDefaultAssistances(
    options: IDefaultAssistanceOptions
  ): Observable<IDefaultAssistanceResponse> {
    const { saleschannel, producer, type, date, vehicleage } = options;

    const params = {
      saleschannel,
      producer: producer?.toString(),
      type,
      date,
      vehicleage: vehicleage?.toString()
    };

    return this.http.get<IDefaultAssistanceResponse>(
      `${this.api_url}/vehicles/defaultassistance`,
      { params }
    );
  }
}
