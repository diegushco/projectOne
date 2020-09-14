import { NgModule } from '@angular/core';
import { UI_PIPES } from './pipes';

const MODULES = [];

@NgModule({
  imports: [...MODULES],
  declarations: [...UI_PIPES],
  exports: [...MODULES, ...UI_PIPES]
})
export class UISharedModule {}
