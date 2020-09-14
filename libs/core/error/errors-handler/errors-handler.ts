import { ErrorHandler, Injectable, Injector } from '@angular/core';
// import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { LogService } from '../../services/log.service';
import { MonitoringService } from '../../services/monitoring.service';

import {
  AuthFailError,
  ServerError,
  BadInputError,
  AccessDeniedError
} from '../errors';
import { BACKEND_ERRORS } from '../error.enum';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  logService: LogService;
  monitoringService: MonitoringService;

  constructor(private injector: Injector) {
    this.logService = this.injector.get(LogService);
    this.monitoringService = this.injector.get(MonitoringService);

    this.logService.initialize();
  }

  handleError(error: any) {
    const notificationService = this.injector.get(NotificationService);

    if (!navigator.onLine) {
      // No hay conexion a internet
      return notificationService.notify({
        code: 0,
        description: 'No hay conexion a internet'
      });
    }
    switch (error.constructor) {
      case AuthFailError:
        notificationService.notify({
          code: error.code,
          description: 'Su Sesion ha expirado, se actualizara la pagina.'
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);
        break;
      case AccessDeniedError:
        notificationService.notify({
          code: error.code,
          description:
            'Ha ocurrido un error al tratar de cotizar, usted no tiene acceso para realizar esta operacion'
        });
        break;
      case ServerError:
        if (error.description === undefined && error.code === -1) {
          notificationService.notify({
            code: error.code,
            description:
              'Ha ocurrido un error al tratar de cotizar, por favor intentelo mas tarde'
          });
          this.logService.issue(error);
        } else if (error.description !== undefined && error.code === -1) {
          notificationService.notify({
            code: error.code,
            description: error.description
          });
          this.logService.issue(error);
        } else if (error.code === BACKEND_ERRORS.DATABASE) {
          notificationService.notify({
            code: error.code,
            description:
              'Ha ocurrido un error de comunicación. Por favor volvé a intentarlo más tarde.'
          });
          this.logService.issue(error);
        } else if (
          error.code === BACKEND_ERRORS.SYSTEM ||
          error.code === BACKEND_ERRORS.GENERIC
        ) {
          notificationService.notify({
            code: error.code,
            description:
              'Ha ocurrido un error y estamos trabajando para solucionarlo. Te invitamos a dejarnos tus datos de contacto para poder avisarte cuando haya sido solucionado.'
          });
          this.logService.issue(error);
        } else if (error.code === BACKEND_ERRORS.UNDERWRITER) {
          notificationService.notify({
            code: error.code,
            description: error.description
          });
        } else if (error.code === BACKEND_ERRORS.BUSINESS) {
          notificationService.notify({
            code: error.code,
            description: error.vehicles[0].description
          });
        } else {
          notificationService.notify({
            code: -1,
            description: 'Ha ocurrido un error, por favor intentelo mas tarde'
          });
          this.logService.issue(error);
        }

        this.monitoringService.trackException(error);

        break;
      case BadInputError:
        notificationService.notify({
          code: -1,
          description: 'Ha ocurrido un error, por favor intentelo mas tarde'
        });
        break;
      default:
        console.error(error);
        this.logService.issue(error);
        throw error;
    }
  }
}
