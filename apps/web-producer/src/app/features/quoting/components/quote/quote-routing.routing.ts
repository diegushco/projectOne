import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteComponent } from './containers/quote.component';

import { QuestionsComponent } from './components/questions/questions.component';
import { PatentComponent } from '../motor/components/patent/patent.component';
import { YearComponent } from '../motor/components/year/year.component';
import { BrandComponent } from '../motor/components/brand/brand.component';
import { ModelComponent } from '../motor/components/model/model.component';
import { VersionComponent } from '../motor/components/version/version.component';
import { LocationComponent } from '../motor/components/location/location.component';
import { UsedestinationComponent } from '../motor/components/usedestination/usedestination.component';
import { SumComponent } from '../motor/components/sum/sum.component';
// import { QuestionsComponent } from './components/questions/questions.component';
// import { PatentComponent, YearComponent, BrandComponent, ModelComponent, VersionComponent, LocationComponent, UsedestinationComponent, SumComponent, MotorComponent } from '..';
import { AgeComponent } from '../motor/components/age/age.component';

import JSON_CONF from '../motor/motor.config.json';
import { IMotorConfiguration } from '../motor/motor.config';
//import { HomeBuildingComponent } from '../home/components/building/building.component';
import { lineGroup } from './../../../quoting/containers/line.enum';
import { HomeUseConstructionComponent } from '../home/components/useconstruction/useconstruction.component';
import { M2Component } from '../home/components/m2/m2.component';
import { ZonesComponent } from '../zones/zones.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteComponent,
    children: [
      {
        path: 'questions',
        component: QuestionsComponent,
        children: [
          {
            path: 'motor/:id/patent',
            component: PatentComponent,
            data: {
              question: '¿Sabes la patente del vehiculo?',
              show: true,
              visible: true,
              disabled: false,
              car: '',
              value: '',
              shortName: 'Patente',
              config: <IMotorConfiguration>JSON_CONF,
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/year',
            component: YearComponent,
            data: {
              question: '¿Cuál es el año del vehiculo?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Año',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/brand',
            component: BrandComponent,
            data: {
              question: '¿Cual es la marca?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Marca',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/model',
            component: ModelComponent,
            data: {
              question: '¿Cual es el modelo?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Modelo',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/version',
            component: VersionComponent,
            data: {
              question: '¿Cual es la version?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Version',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/location',
            component: LocationComponent,
            data: {
              question: '¿Cual es la ubicacion del vehiculo?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Ubicacion',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/use',
            component: UsedestinationComponent,
            data: {
              question: '¿Cuál es el uso y destino?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Uso',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/sum',
            component: SumComponent,
            data: {
              question: '¿Estas de acuerdo con la suma asegurada?',
              show: true,
              visible: true,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Suma Asegurada',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'motor/:id/age',
            component: AgeComponent,
            data: {
              question: '¿Cúal es la edad del conductor?',
              show: true,
              visible: false,
              disabled: true,
              car: '',
              value: '',
              shortName: 'Edad del conductor',
              line: lineGroup.MOTOR
            }
          },
          {
            path: 'home/:id/zones',
            component: ZonesComponent,
            data: {
              question: '¿Cuál es es el código postal de la vivienda?',
              show: true,
              visible: true,
              disabled: true,
              value: '',
              shortName: 'Ubicación',
              line: lineGroup.HOME
            }
          },
          {
            path: 'home/:id/useconstruction',
            component: HomeUseConstructionComponent,
            data: {
              question: '¿Cuáles son los detalles de la vivienda?',
              show: true,
              visible: true,
              disabled: true,
              value: '',
              shortName: 'Detalles de la vivienda',
              line: lineGroup.HOME
            }
          },
          {
            path: 'home/:id/m2',
            component: M2Component,
            data: {
              question: '¿Cuántos m2 tiene la vivienda?',
              show: true,
              visible: true,
              disabled: true,
              value: '',
              shortName: 'Metros de vivienda',
              line: lineGroup.HOME
            }
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QuoteRoutingModule {}
