import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilityComponent } from './mobility.component';

const routes: Routes = [{ path: '', component: MobilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class MobilityRoutingModule {}
