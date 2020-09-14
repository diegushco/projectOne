// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  step: 5,

  oauth_issuer: 'https://apidev.segurossura.com.ar:8243/oauth2',
  oauth_loginUrl: 'https://apidev.segurossura.com.ar:8243/authorize',
  oauth_logoutUrl: 'https://apilab.segurossura.com.ar:9443/oauth2/logout',
  oauth_redirectUri: 'http://localhost:4200/callback',
  gaTagManager: 'GTM-MR72PV2',
  env: 'localhost',
  enableDebug: 'true'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
