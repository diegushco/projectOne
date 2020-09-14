import { Component, OnInit } from '@angular/core';
import { AuthService } from '@sura-platform/web';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoringService, BaseService } from '@sura-platform/core';
import { environment } from '@sura-platform/apps/web-producer/src/environments/environment';

@Component({
  selector: 'sxf-callback',
  templateUrl: 'callback.component.html'
})
export class CallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private monitoringService: MonitoringService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.state) {
      const state = this.route.snapshot.queryParams.state;

      if (state !== localStorage.getItem('state')) {
        alert('Invalid state');
        return;
      }

      this.authService
        .getAccessToken(
          this.route.snapshot.queryParams.code,
          environment.oauth_redirectUri
        )
        .subscribe((res) => {
          this.monitoringService.setUserId(
            this.baseService.getUser(res.access_token)
          );

          this.router.navigate(['/queries/quotes']);
        });

      localStorage.setItem('auth_code', 'true');
    } else {
      localStorage.setItem(
        'access_token',
        this.route.snapshot.queryParams.access_token
      );

      localStorage.setItem(
        'refresh_token',
        this.route.snapshot.queryParams.refresh_token
      );

      localStorage.setItem('scope', this.route.snapshot.queryParams.scope);

      localStorage.setItem(
        'expires_in',
        this.route.snapshot.queryParams.expires_in
      );

      localStorage.setItem(
        'token_type',
        this.route.snapshot.queryParams.token_type
      );

      this.monitoringService.setUserId(
        this.baseService.getUser(this.route.snapshot.queryParams.access_token)
      );

      this.router.navigate(['/queries/quotes']);
    }
  }

  logout() {
    const url = this.authService.generateLogoutUrl(environment.oauth_logoutUrl);
    window.location.href = url;
  }
}
