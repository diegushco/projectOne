import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    if (this.authService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean {
    if (this.authService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
