import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotingComponent } from './containers/quoting.component';
import { MotorComponent } from './components/motor/motor.component';
import { ThankyouComponent } from './components/emission/components/thankyou/thankyou.component';
import { InspectionComponent } from './components/motor/components/inspection/inspection.component';

const routes: Routes = [
  {
    path: '',
    component: QuotingComponent,
    children: [
      {
        path: 'quote',
        loadChildren: () =>
          import('../quoting/components/quote/quote.module').then(
            (m) => m.QuoteModule
          )
      },
      {
        path: 'coverage/:id',
        loadChildren: () =>
          import(
            '../quoting/components/motor/components/coverage/coverage.module'
          ).then((m) => m.CoverageModule)
      },
      {
        path: '',
        component: MotorComponent,
        outlet: 'motor'
      },
      {
        path: 'mobility',
        loadChildren: () =>
          import('./components/mobility/mobility.module').then(
            (m) => m.MobilityModule
          )
      },
      {
        path: 'emission',
        loadChildren: () =>
          import('./components/emission/emission.module').then(
            (m) => m.EmissionModule
          )
      },
      {
        path: 'thankyou',
        component: ThankyouComponent
      },
      {
        path: 'inspection',
        component: InspectionComponent
      },
      {
        path: 'home/coverage/:id',
        loadChildren: () =>
          import(
            '../quoting/components/home/components/coverage/coverage.module'
          ).then((m) => m.HomeCoverageModule)
      },
      {
        path: 'summary',
        loadChildren: () =>
          import('../quoting/components/summary/summary.module').then(
            (m) => m.SummaryModule
          )
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuotingRoutingModule {}
