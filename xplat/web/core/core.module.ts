import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from '@sura-platform/utils';
import {
  CoreModule,
  PlatformLanguageToken,
  PlatformWindowToken
} from '@sura-platform/core';

import { ErrorModule } from '@sura-platform/web/features/error';

export function winFactory() {
  return window;
}

export function platformLangFactory() {
  const browserLang = window.navigator.language || 'en'; // fallback English
  // browser language has 2 codes, ex: 'en-US'
  return browserLang.split('-')[0];
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot([
      {
        provide: PlatformLanguageToken,
        useFactory: platformLangFactory
      },
      {
        provide: PlatformWindowToken,
        useFactory: winFactory
      }
    ]),
    HttpClientModule,
    ErrorModule
  ]
})
export class SxfCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SxfCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'SxfCoreModule');
  }
}
