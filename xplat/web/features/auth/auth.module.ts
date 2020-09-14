import { NgModule } from '@angular/core';
import { AuthModule as SharedAuthModule } from '@sura-platform/features/auth';
import { UIModule } from '../ui/ui.module';
import { EXPIRED_COMPONENTS } from './components';
import { AUTH_SERVICES, TokenInterceptor } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [SharedAuthModule, UIModule],
  declarations: [...EXPIRED_COMPONENTS],
  exports: [...EXPIRED_COMPONENTS],
  providers: [
    ...AUTH_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
