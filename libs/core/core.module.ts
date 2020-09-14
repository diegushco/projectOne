import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
// libs
import { NxModule } from '@nrwl/nx';
import { throwIfAlreadyLoaded } from '@sura-platform/utils';

// app
import { environment } from '@sura-platform/environments/environment';
import { CORE_PROVIDERS } from './services';
import { LogService } from './services/log.service';
import { NotificationService } from './services/notification.service';
import { PushNotificationsService } from './services/push.notification.service';
import { ErrorsModule } from './error';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './services/request.interceptor';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LoadableModule } from 'ngx-loadable';
import localeAr from '@angular/common/locales/es-AR';

registerLocaleData(localeAr, 'es-AR');

/**
 * DEBUGGING
 */
LogService.DEBUG.LEVEL_4 = !environment.production;

export const BASE_PROVIDERS: any[] = [
  ...CORE_PROVIDERS,
  {
    provide: APP_BASE_HREF,
    useValue: '/'
  }
];

@NgModule({
  imports: [
    CommonModule,
    ErrorsModule,
    LoadableModule,
    NxModule.forRoot(),
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    NotificationService,
    PushNotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ]
})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and others per platform
  static forRoot(
    configuredProviders: Array<any>
  ): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...BASE_PROVIDERS, ...configuredProviders]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
