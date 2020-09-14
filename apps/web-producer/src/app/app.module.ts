import { NgModule } from '@angular/core';

// libs
import { environment } from '@sura-platform/environments/environment';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AuthModule,
  AuthService,
  NgbDateMomentParserFormatter,
  MaintenanceModule
} from '@sura-platform/web';
// ngrx
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { reducers, QuotingModule } from './features/quoting';
import { EffectsModule } from '@ngrx/effects';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { QuotesService, MaintenanceService } from '@sura-platform/features';
import { UnderwritterTaskService } from './underwritter.task';
import { LottieModule } from 'ngx-lottie';
import { LoginComponent } from './features/auth/login/login.component';
import { MaintenanceComponent } from './features/maintenance/maintenance.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    CoreModule,
    AuthModule,
    MaintenanceModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Portales App',
      maxAge: 25, //TODO: MP: Verificar si es correcto
      logOnly: environment.production
    }),
    LottieModule.forRoot({ player: playerFactory }),
    QuotingModule
  ],
  declarations: [AppComponent, LoginComponent, MaintenanceComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useValue: new NgbDateMomentParserFormatter('DD/MM/YYYY')
    },
    AuthService,
    MaintenanceService,
    QuotesService,
    UnderwritterTaskService
  ]
})
export class AppModule {}
