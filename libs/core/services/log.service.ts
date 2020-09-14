// angular
import { Injectable, Injector, Type } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import * as Sentry from '@sentry/browser';
import { environment } from '@sura-platform/environments/environment';

export interface IDebug {
  LEVEL_1: boolean;
  LEVEL_2: boolean;
  LEVEL_3: boolean;
  LEVEL_4: boolean;
  LEVEL_5: boolean;
}

@Injectable()
export class LogService {
  public static DEBUG: IDebug = {
    LEVEL_1: false, // .warn only
    LEVEL_2: false, // .error only
    LEVEL_3: false, // .log + all the above
    LEVEL_4: false, // .log + all the above + info
    LEVEL_5: false // just info (excluding all else)
  };

  constructor(private injector: Injector) {}

  public initialize() {
    if (environment.env !== 'localhost') {
      Sentry.init({
        dsn: 'https://397dbfc4fe4b466991d5ed1c36d94494@sentry.io/1807576',
        environment: environment.env,
        release: 'producer@' + environment.release.replace(/\s/g, '')
      });
    }
  }
  // info (extra messages like analytics)
  // use LEVEL_5 to see only these
  public info(...msg: Array<any>) {
    if (LogService.DEBUG.LEVEL_5 || LogService.DEBUG.LEVEL_4) {
      // extra messages
      console.info(msg);
    }
  }

  // debug (standard output)
  public debug(...msg: Array<any>) {
    if (LogService.DEBUG.LEVEL_4 || LogService.DEBUG.LEVEL_3) {
      // console.debug does not work on {N} apps... use `log`
      console.log(msg);
    }
  }

  // error
  public error(exception: Error) {
    console.error(exception);
  }

  public issue(...err: Array<any>) {
    if (environment.env === 'localhost') return;

    const errorToSend = this.addContextInfo(err);
    Sentry.withScope((scope) => {
      Sentry.setUser({ email: errorToSend.user, username: errorToSend.user });
      scope.setExtra('data', errorToSend);
      Sentry.captureException(err);
    });
  }

  public feedback() {
    if (environment.env === 'localhost') return;
    const baseService = this.injector.get(BaseService);
    const errorToSend = this.addContextInfo(
      new Error('Feedback reportado por:' + baseService.getUser())
    );
    Sentry.withScope((scope) => {
      Sentry.setUser({ email: errorToSend.user, username: errorToSend.user });
      scope.setExtra('data', errorToSend);
      const eventId = Sentry.captureMessage(
        'Feedback reportado por: ' + errorToSend.user
      );
      Sentry.showReportDialog({
        eventId: eventId,
        title: 'Dejanos tu comentario',
        labelName: 'Nombre',
        labelEmail: 'Email',
        labelComments: 'Comentarios',
        labelClose: 'Cerrar',
        labelSubmit: 'Enviar',
        subtitle: '',
        subtitle2: ''
      });
    });
  }
  // warn
  public warn(...warn: Array<any>) {
    if (
      LogService.DEBUG.LEVEL_4 ||
      LogService.DEBUG.LEVEL_3 ||
      LogService.DEBUG.LEVEL_1
    ) {
      console.warn(warn);
    }
  }

  addContextInfo(error) {
    const baseService = this.injector.get(BaseService);

    const name = error.name || null;
    const appId = 'Producer';
    const user = baseService.getUser();
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get<LocationStrategy>(
      (LocationStrategy as unknown) as Type<LocationStrategy>
    );

    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : error; //FIXME: MP: StackTraceParser.parse(error);

    const errorWithContext = {
      name,
      appId,
      user,
      time,
      id,
      url,
      status,
      message,
      stack
    };
    return errorWithContext;
  }
}
