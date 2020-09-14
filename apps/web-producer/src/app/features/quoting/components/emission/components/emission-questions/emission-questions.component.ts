import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromEmissionReducer from '../../state/emission.reducer';
import * as fromEmission from '../../state';
import * as fromEmissionActions from '../../state/emission.actions';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Component({
  selector: 'sxf-emission-questions',
  templateUrl: './emission-questions.component.html',
  styleUrls: ['./emission-questions.component.scss']
})
export class EmissionQuestionsComponent implements OnInit {
  routes: IRoutes[] = [];
  routeActive = '';
  constructor(private store: Store<fromEmissionReducer.EmissionState>) {}

  ngOnInit() {
    this.store.select(fromEmission.getRoutes).subscribe((data: IRoutes[]) => {
      this.routes = data;
    });

    this.store.select(fromEmission.getActiveRoute).subscribe((data: string) => {
      this.routeActive = data;
      if (data === '') {
        this.store.dispatch(new fromEmissionActions.SetActiveRoute('client'));
        this.routeActive = 'client';
      }
    });
  }

  currentRoute(event: string) {
    this.store.dispatch(new fromEmissionActions.SetActiveRoute(event));
  }
}
