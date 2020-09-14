import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {
  AuthGuard,
  NoRefreshGuard,
  ExpiredComponent,
  MaintenanceGuard
} from '@sura-platform/web';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CallbackComponent } from './features/auth/callback/callback.component';
import { MaintenanceComponent } from './features/maintenance/maintenance.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'quoting',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, MaintenanceGuard, NoRefreshGuard],
    loadChildren: () =>
      import('./features/quoting/quoting.module').then((m) => m.QuotingModule)
  },
  {
    path: 'queries',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard, MaintenanceGuard],
    loadChildren: () =>
      import('./features/queries/queries.module').then((m) => m.QueriesModule)
  },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'expired', component: ExpiredComponent },
  { path: 'login', component: LoginComponent },
  { path: 'maintenance', component: MaintenanceComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  declarations: [HomeComponent],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
