import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import * as motorActions from '../state/motor.actions';
// import * as fromMotorReducer from '../state/motor.reducer';
import * as fromQuote from '../../quote/state';
import * as fromQuoteActions from '../../quote/state/quote.actions';
import { Router } from '@angular/router';
import { IVehicle } from '@sura-platform/features';
import { IRoutesMotor } from '../../motor/interfaces/routes-motor.interface';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Injectable()
export class FlowRouteService {
  constructor(
    // private store: Store<fromMotorReducer.State>,
    private storeQuote: Store<fromQuote.State>,
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
  goToNextStep(currentMotor: IVehicle, routes: IRoutesMotor[]) {
    const nextRouteWithoutValue = routes
      .filter((p) => p.value === '' || p.value === null)[0]
      .path.split('/')[2];

    routes.forEach((element) => {
      if (
        element.path ===
        'motor/' + currentMotor.id + '/' + nextRouteWithoutValue
      ) {
        element.disabled = false;
      }
    });

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(routes));

    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor(
        'motor/' + currentMotor.id + '/' + nextRouteWithoutValue + ''
      )
    );

    return this.router.navigateByUrl(
      'quoting/quote/questions/motor/' +
        currentMotor.id +
        '/' +
        nextRouteWithoutValue +
        ''
    );
  }

  enableRoute(currentMotor: IVehicle, routes: IRoutesMotor[], route: string) {
    routes.forEach((element) => {
      if (element.path === 'motor/' + currentMotor.id + '/' + route) {
        element.disabled = false;
        element.value = null;
      }
    });

    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor(
        'motor/' + currentMotor.id + '/' + route
      )
    );

    this.router.navigateByUrl(
      'quoting/quote/questions/motor/' + currentMotor.id + '/' + route
    );

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(routes));
  }

  enableHomeRoute(
    currentHome: number,
    routes: IRoutes[],
    nextRoute: string,
    currentRoute: string,
    currentValue: string
  ) {
    routes.forEach((element) => {
      if (element.path === 'home/' + currentHome + '/' + currentRoute) {
        element.disabled = false;
        element.value = currentValue;
      }
    });

    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteHomeAction(
        'home/' + currentHome + '/' + nextRoute
      )
    );
    this.router.navigateByUrl(
      'quoting/quote/questions/home/' + currentHome + '/' + nextRoute
    );

    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesHome(routes));
  }
}
