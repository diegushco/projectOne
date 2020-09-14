import { AdditionalComponent } from './additional/additional.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverageComponent } from './coverage.component';
import { IMotorConfiguration } from '../../../motor/motor.config';
import JSON_CONF from '../../../motor/motor.config.json';
const routes: Routes = [
  {
    path: '',
    component: CoverageComponent,
    data: {
      config: <IMotorConfiguration[]>JSON_CONF
    },
    children: [
      {
        path: 'modal/:pkg',
        component: AdditionalComponent
        // outlet: 'modal'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverageRoutingModule {}
