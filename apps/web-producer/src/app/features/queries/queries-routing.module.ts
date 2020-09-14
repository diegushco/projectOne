import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueriesComponent, QuotesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: QueriesComponent,
    children: [
      {
        path: 'quotes',
        component: QuotesComponent
      },
      {
        path: 'quotes/:view',
        component: QuotesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QueriesRoutingModule {}
