import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LottieModule } from 'ngx-lottie';

// libs
import { UISharedModule } from '@sura-platform/features';
import { UI_COMPONENTS } from './components';
import { UI_DIRECTIVES } from './directives';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  suppressScrollY: true
};
// import { UI_SERVICES } from './services';

export function playerFactory() {
  return import('lottie-web');
}

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  UISharedModule,
  NgSelectModule,
  NgbModule,
  RouterModule,
  TextMaskModule,
  NgxDatatableModule,
  LottieModule.forRoot({ player: playerFactory }),
  PerfectScrollbarModule
];

@NgModule({
  imports: [...MODULES],
  declarations: [...UI_COMPONENTS, ...UI_DIRECTIVES],
  exports: [...MODULES, ...UI_COMPONENTS, ...UI_DIRECTIVES],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UIModule {}
