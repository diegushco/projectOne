import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';
import CryptoJS from 'crypto-js';
import { tap } from 'rxjs/operators';

function guid() {
  const nav = window.navigator;
  const screen = window.screen;
  let aguid = nav.mimeTypes.length.toString();
  aguid += nav.userAgent.replace(/\D+/g, '').toString();
  aguid += nav.plugins.length;
  aguid += screen.height.toString() || '';
  aguid += screen.width.toString() || '';
  aguid += screen.pixelDepth.toString() || '';
  aguid += new Date().getTime().toString();

  let hash = 0,
    i,
    chr;
  if (aguid.length === 0) return hash;
  for (i = 0; i < aguid.length; i++) {
    chr = aguid.charCodeAt(i);
    // tslint:disable-next-line: no-bitwise
    hash = (hash << 5) - hash + chr;
    // tslint:disable-next-line:no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

@Injectable()
export class AuthService {
  jwt = new JwtHelperService();

  get accessToken(): string {
    const _accessToken = localStorage.getItem('access_token')?.toString();

    return _accessToken ?? '';
  }
  set accessToken(value: string) {
    localStorage.setItem('access_token', value);
  }

  constructor(private http: HttpClient) {}

  /**
   * Gets the JWT token decoded
   *
   * @returns {any}
   * @memberof AuthService
   */
  public bodyToken(): any {
    if (this.hasValidAccessToken()) {
      return this.jwt.decodeToken(
        localStorage.getItem('access_token')?.toString()
      );
    }
  }

  /**
   * Gets the JWT token and validate if it is expired
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  public isTokenExpired(): boolean {
    return this.jwt.isTokenExpired(this.accessToken);
  }

  /**
   * Gets the JWT token, and return if token need refresh before expire
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  public tokenNeedRefresh(): boolean {
    if (!this.isTokenExpired()) {
      const exp = moment(this.jwt.getTokenExpirationDate(this.accessToken));
      if (exp.diff(moment(), 'minutes') <= 15) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /**
   * Validate if the token has valid
   *
   * @returns {boolean}
   * @memberof AuthService
   */
  public hasValidAccessToken(): boolean {
    if (this.accessToken !== null) {
      if (!this.isTokenExpired()) {
        return true;
      }
    }

    return false;
  }

  private strRandom(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public generateLogoutUrl(logoutUrl: string) {
    const params = [
      'id_token_hint=' + sessionStorage.getItem('id_token'),
      'state=' + sessionStorage.getItem('state'),
      'post_logout_redirect_uri=' + logoutUrl
    ];

    return logoutUrl + '?' + params.join('&');
  }

  public generateLoginUrl(redirectUri: string, loginUrl: string) {
    const state = this.strRandom(40);
    const codeVerifier = this.strRandom(128);

    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);
    const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(
      CryptoJS.enc.Base64
    );
    const codeChallenge = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    const params = [
      'response_type=code',
      'state=' + state,
      'client_id=' + environment.oauth_clientId,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=S256',
      'redirect_uri=' + encodeURIComponent(redirectUri),
      'scope=device_' + guid() + ' ' + environment.oauth_scope
    ];

    return loginUrl + '?' + params.join('&');
  }

  public getAccessToken(code: string, callbackUrl: string): Observable<any> {
    const api_url = environment.api_root;
    const apiURL = `${api_url}/token`;

    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('code_verifier', localStorage.getItem('codeVerifier') ?? '')
      .append('redirect_uri', callbackUrl)
      .append('client_id', environment.oauth_clientId);

    return this.http
      .post(apiURL, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('access_token', res.access_token.toString());

          localStorage.setItem('refresh_token', res.refresh_token.toString());

          localStorage.setItem('scope', res.scope.toString());

          localStorage.setItem('expires_in', res.expires_in.toString());

          localStorage.setItem('token_type', res.token_type.toString());
        })
      );
  }

  public refreshToken(): Observable<any> {
    const api_url = environment.api_root;
    const apiURL = `${api_url}/token`;

    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refresh_token') ?? '');

    return this.http
      .post(apiURL, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('access_token', res.access_token.toString());

          localStorage.setItem('refresh_token', res.refresh_token.toString());

          localStorage.setItem('scope', res.scope.toString());

          localStorage.setItem('expires_in', res.expires_in.toString());

          localStorage.setItem('token_type', res.token_type.toString());
        })
      );
  }
}
