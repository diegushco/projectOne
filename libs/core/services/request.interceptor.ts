import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonitoringService } from '.';
import { environment } from '@sura-platform/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(public monitoringService: MonitoringService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: request.headers.set('Accept', '*/*')
    });

    const start = performance.now();

    return next.handle(authReq).pipe(
      map((res) => {
        const url = request.url.match(
          /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
        );
        if (url !== null) {
          if (url.length > 5) {
            this.monitoringService.trackMetric(
              url[5],
              performance.now() - start,
              {
                environment: environment.env,
                request: request,
                response: res
              }
            );
          }
        }

        return res;
      })
    );
  }
}
