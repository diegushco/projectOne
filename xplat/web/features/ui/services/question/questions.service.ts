import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IVehicle } from '@sura-platform/features';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Injectable()
export class QuestionsService {
  constructor(private router: Router) {}

  /**
   *
   * This method is created for handle routing when patent is valid, the idea is avoid DRY (Don´t repeat yourself);
   * @param {IVehicle} currentMotor
   * @param {IRoutes[]} routes
   * @returns
   * @memberof QuestionsService
   */
  goToNextStep(prefixRoute: string, routes: IRoutes[]) {
    // Find the next route without value.
    const nextRouteWithoutValue = routes
      .filter((p) => p.value === '' || p.value === null)[0]
      .path.split('/')[2];

    // Go to next route and make it enable.
    routes.forEach((element) => {
      if (element.path === prefixRoute + nextRouteWithoutValue) {
        element.disabled = false;
      }
    });
    // routes.forEach((element) => {
    //   if (
    //     element.path ===
    //     'motor/' + currentMotor.id + '/' + nextRouteWithoutValue
    //   ) {
    //     element.disabled = false;
    //   }
    // });

    // this.store.dispatch(new motorActions.SetRoutes(routes));

    // this.store.dispatch(
    //   new motorActions.SetActiveRoute(
    //     'motor/' + currentMotor.id + '/' + nextRouteWithoutValue + '',
    //   ),
    // );
    // return this.router.navigateByUrl(
    //   'quoting/questions/motor/' +
    //     currentMotor.id +
    //     '/' +
    //     nextRouteWithoutValue +
    //     '',
    // );
    return '';
  }

  enableRoute(currentMotor: IVehicle, routes: IRoutes[], route: string) {
    routes.forEach((element) => {
      if (element.path === 'motor/' + currentMotor.id + '/' + route) {
        element.disabled = false;
        element.value = null;
      }
    });
    // this.store.dispatch(
    //   new motorActions.SetActiveRoute('motor/' + currentMotor.id + '/' + route),
    // );
    this.router.navigateByUrl(
      'quoting/questions/motor/' + currentMotor.id + '/' + route
    );
    // this.store.dispatch(new motorActions.SetRoutes(routes));
  }
}
