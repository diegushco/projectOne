import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NoRefreshGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (this.router.navigated) {
      return true;
    }

    return this.router.parseUrl('/queries/quotes');
  }
}
