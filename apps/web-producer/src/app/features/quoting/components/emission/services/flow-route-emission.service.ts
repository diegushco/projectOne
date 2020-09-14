import { Injectable } from '@angular/core';
import * as fromEmission from '../state';
import * as fromEmissionActions from '../state/emission.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Injectable()
export class FlowRouteEmissionService {
  constructor(
    private storeEmission: Store<fromEmission.State>,
    private router: Router
  ) {}

  /**
   *
   * This method is created for handle routing when patent is valid, the idea is avoid DRY (Don´t repeat yourself);
   * @param {IVehicle} currentMotor
   * @param {IRoutes[]} routes
   * @returns
   * @memberof FlowRouteService
   */
  goToNextStep(routes: IRoutes[]) {
    const nextRouteWithoutValue = routes
      .filter((p) => p.value === '' || p.value === null)[0]
      .path.split('/')[2];

    routes.forEach((element) => {
      if (element.path === nextRouteWithoutValue) {
        element.disabled = false;
      }
    });

    this.storeEmission.dispatch(new fromEmissionActions.SetRoutes(routes));

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute(nextRouteWithoutValue)
    );

    return this.router.navigateByUrl(
      'quoting/emission/questions/' + nextRouteWithoutValue + ''
    );
  }

  enableRoute(routes: IRoutes[], route: string) {
    routes.forEach((element) => {
      if (element.path === route) {
        element.disabled = false;
        element.value = null;
      }
    });

    this.storeEmission.dispatch(new fromEmissionActions.SetActiveRoute(route));

    this.router.navigateByUrl('quoting/emission/questions/' + route);

    this.storeEmission.dispatch(new fromEmissionActions.SetRoutes(routes));
  }
}
