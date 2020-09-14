import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSummaryComponent } from './summary.component';
const routes: Routes = [
  {
    path: '',
    component: HomeSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeSummaryRoutingModule {}
