import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class UtilService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  getCurrentServerDate(): Observable<{ datetime: string }> {
    const apiURL = `${this.api_url}/utils/date`;
    return this.http.get<{ datetime: string }>(apiURL);
  }

  isOffline(): Observable<any> {
    return this.http.get('./app_offline.json').pipe(
      map(() => {
        return of(true);
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
