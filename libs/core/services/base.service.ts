import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  token: string;
  helper: JwtHelperService;

  constructor() {
    this.token = localStorage.getItem('access_token');
    this.helper = new JwtHelperService();
  }

  getThisYear(): number {
    const decodedToken = this.helper.decodeToken(this.token);

    return moment.unix(decodedToken.iat).year();
  }

  getThisMonth(): number {
    const decodedToken = this.helper.decodeToken(this.token);

    return moment.unix(decodedToken.iat).month();
  }

  getThisDay(): number {
    const decodedToken = this.helper.decodeToken(this.token);

    return moment.unix(decodedToken.iat).day();
  }

  getUser(token?: string): string {
    if (token) {
      this.token = token;
    }
    const decodedToken = this.helper.decodeToken(this.token);
    return decodedToken.sub;
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }
}
