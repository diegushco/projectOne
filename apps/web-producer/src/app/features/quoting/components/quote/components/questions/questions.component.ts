import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import * as fromQuote from '../../state';
import * as fromQuoteActions from '../../state/quote.actions';
import { Store } from '@ngrx/store';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { combineLatest, Subscription } from 'rxjs';
import { lineGroup } from '../../../../containers/line.enum';

@Component({
  selector: 'sxf-quote-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private router: Router
  ) {}

  // @ViewChild('perfectscroll') perfectscroll;

  routes: IRoutes[] = <IRoutes[]>{};
  routeActive = '';
  line = '';

  quoteSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.quoteSubscription = combineLatest(
      this.storeQuote.select(fromQuote.getCurrentLine),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.storeQuote.select(fromQuote.getQuoteHomeData)
    ).subscribe(([currentLine, motorData, homeData]) => {
      this.line = currentLine;
      let quoteData = null;
      if (this.line === lineGroup.MOTOR) {
        quoteData = motorData;
      } else if (this.line === lineGroup.HOME) {
        quoteData = homeData;
      }

      this.routeActive = quoteData?.activeRoute as string;

      this.routes = quoteData?.routes as IRoutes[];
      if (quoteData?.activeRoute === '') {
        this.storeQuote.dispatch(
          new fromQuoteActions.SetActiveRouteMotor(this.line + '/1/patent')
        );
      }
    });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.directiveRef?.scrollToElement('.questionactive', 0, 200);
        }, 200);
      });
  }

  currentRoute(event: any) {
    if (this.line === lineGroup.MOTOR) {
      this.storeQuote.dispatch(new fromQuoteActions.SetActiveRouteMotor(event));
    } else if (this.line === lineGroup.HOME) {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetActiveRouteHomeAction(event)
      );
    }
  }

  scroll(el: HTMLElement) {
    // this.perfectscroll.scrollToElement(el);
    console.log(el);
    // this.scrollbar.directiveRef.scrollToBottom(0, 500); // 500ms is the speed
    // el.scrollIntoView();
  }

  ngOnDestroy(): void {
    if (this.quoteSubscription) {
      this.quoteSubscription.unsubscribe();
    }
  }
}
