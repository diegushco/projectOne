import { Component } from '@angular/core';
import { AuthService } from '@sura-platform/web';
import { PushNotificationsService } from '@sura-platform/core/services/push.notification.service';
import { environment } from '@sura-platform/apps/web-producer/src/environments/environment';

@Component({
  selector: 'sxf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private _pushNotifications: PushNotificationsService
  ) {}

  logout() {
    const url = this.authService.generateLogoutUrl(environment.oauth_logoutUrl);
    window.location.href = url;
  }

  notify() {
    this._pushNotifications.generateNotification([
      {
        title: 'Solicitud Aprobada',
        alertContent:
          'La Solicitud numero 15123123 fue aprobada y puede continuar con la emision'
      }
    ]);
  }
}
