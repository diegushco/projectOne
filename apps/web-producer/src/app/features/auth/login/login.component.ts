import { Component, OnInit } from '@angular/core';
import { AuthService } from '@sura-platform/web';
import { environment } from '@sura-platform/apps/web-producer/src/environments/environment';

@Component({
  selector: 'sxf-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.goToLoginPage();
  }

  /**
   * Redirect to wso2 to login page to autenticate with authorization code
   *
   * @memberof LoginComponent
   */
  goToLoginPage() {
    const url = this.authService.generateLoginUrl(
      environment.oauth_redirectUri,
      environment.oauth_loginUrl
    );
    window.location.href = url;
  }
}
