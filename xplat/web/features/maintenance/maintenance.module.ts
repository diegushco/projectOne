import { NgModule } from '@angular/core';
import { MaintenanceGuard } from './services';

@NgModule({
  imports: [],
  providers: [MaintenanceGuard]
})
export class MaintenanceModule {}
