import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { IPolicy, IHouse, IPackage } from '@sura-platform/features';
import * as fromPolicy from './../../../../../state/policy';
import { Store } from '@ngrx/store';
import * as fromQuote from './../../../../quote/state';

@Component({
  selector: 'sxf-plandetail',
  templateUrl: './planDetails.component.html',
  styleUrls: ['./planDetails.component.scss']
})
export class PlanDetailComponent implements OnInit, OnDestroy {
  @Input() policy: IPolicy = <IPolicy>{};
  @Input() packageSelected: IPackage = <IPackage>{};

  policySubscription: Subscription = new Subscription();

  currentHome: number | null = 0;

  housePolicy: IHouse = <IHouse>{};

  quoteHome: any = {};

  moreCoverage = false;

  limit = 11;

  constructor(private storePolicy: Store<fromPolicy.State>) {}

  ngOnInit() {
    this.policySubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.storePolicy.select(fromQuote.getQuoteHomeData)
    ]).subscribe((dat: any) => {
      this.currentHome = dat[0];
      this.quoteHome = dat[1];
      if (this.policy.home) {
        this.housePolicy = <IHouse>(
          this.policy.home.dwellings.find(
            (h: any) => h.number === this.currentHome
          )
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.policySubscription) this.policySubscription.unsubscribe();
  }
}
