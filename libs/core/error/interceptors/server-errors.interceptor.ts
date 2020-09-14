import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {
  AuthFailError,
  BadInputError,
  NotFoundError,
  ServerError,
  AccessDeniedError
} from '../errors/';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, retryWhen, mergeMap, delay } from 'rxjs/operators';
import {
  UNAUTHORIZED,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  BAD_GATEWAY
} from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor() {}
  handleError = (err: HttpErrorResponse) => {
    if (err instanceof HttpErrorResponse) {
      let appError;
      const httpErrorCode = err.status;
      switch (httpErrorCode) {
        case 0:
          appError = new NotFoundError(err.message);
          break;
        case UNAUTHORIZED:
          appError = new AuthFailError(err.message);
          break;
        case BAD_REQUEST:
          appError = new BadInputError(err.message);
          break;
        case FORBIDDEN:
          appError = new AccessDeniedError(
            'Ha ocurrido un error, intentelo mas tarde'
          );
          break;
        case NOT_FOUND:
          appError = new NotFoundError('not found');
          break;
        case INTERNAL_SERVER_ERROR:
          //! This code validates when server returns an uncontrolled exeption, for instance (errorCode, errorMessage)
          if (!err.error.error) {
            appError = new ServerError(
              'Ha ocurrido un error, intentelo mas tarde',
              -1
            );
          } else {
            appError = new ServerError(
              err.error.error.description,
              err.error.error.code
            );
          }
          break;
        case BAD_GATEWAY:
          appError = new ServerError(
            'Ha ocurrido un error, intentelo mas tarde',
            -1
          );
          break;
        default:
          appError = new Error(err.message);
      }

      return throwError(appError);
    }
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((err, i) => {
            if (i > 0) return throwError(err);
            if (err instanceof HttpErrorResponse && err.status === 504) {
              return of(err).pipe(delay(5000));
            } else {
              return throwError(err);
            }
          })
        );
      }),
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.error) {
            const err = new ServerError(
              evt.body.error.description,
              evt.body.error.code
            );
            err.applicationStatus = evt.body.error.code;
            return throwError(err);
          }
        }
      }),
      catchError(this.handleError)
    );
  }
}
