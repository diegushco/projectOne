import { Injectable } from '@angular/core';
import { environment } from '@sura-platform/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMaintenanceResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class MaintenanceService {
  url: string = environment.api_root;

  constructor(private http: HttpClient) {}

  maintenanceStatus(): Observable<IMaintenanceResponse> {
    return this.http.get<IMaintenanceResponse>(`${this.url}/utils/status`);
  }
}
