import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorsHandler } from './errors-handler/errors-handler';
import { ServerErrorsInterceptor } from './interceptors/server-errors.interceptor';
import { NotificationService } from '../services/notification.service';

@NgModule({
  imports: [],
  providers: [
    NotificationService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    }
  ]
})
export class ErrorsModule {}
