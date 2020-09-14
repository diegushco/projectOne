import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCoverageComponent } from './coverage.component';
const routes: Routes = [
  {
    path: '',
    component: HomeCoverageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeCoverageRoutingModule {}
