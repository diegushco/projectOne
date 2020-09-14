import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ICost, IHouse, IPackage, IPolicy } from '@sura-platform/features';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromQuote from '../quote/state';
import * as fromPolicy from '../../state/policy';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'sxf-homesummary',
  templateUrl: 'summary.component.html',
  styleUrls: ['summary.component.scss']
})
export class HomeSummaryComponent implements OnInit, OnDestroy {
  currentCost: ICost = <ICost>{};

  costsQuoteSubscription: Subscription = new Subscription();

  quoteHomeSubscription: Subscription = new Subscription();

  houses: IHouse[] = <IHouse[]>{};

  currentHouse: IHouse = <IHouse>{};

  packageSelected: IPackage = <IPackage>{};

  policy: IPolicy = <IPolicy>{};

  btnHover = {
    btnDownload: false,
    btnSave: false
  };

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    @Inject(DOCUMENT) private _document: any
  ) {}

  ngOnInit() {
    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.storeQuote.select(fromPolicy.getHouses),
      this.storeQuote.select(fromQuote.getHomeCosts),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ])
      .pipe(
        tap(([homeActive, houses, homeCosts, policy]) => {
          this.policy = policy;
          this.houses = houses;
          this.currentHouse = <IHouse>(
            this.houses.find((h) => h.id === homeActive)
          );
          const costsHome = <ICost[]>homeCosts;
          this.packageSelected = <IPackage>(
            this.houses
              ?.find((h) => h.id === homeActive)
              ?.packages?.find((pk) => pk.selected)
          );

          this.currentCost = <ICost>(
            costsHome?.find((cost) =>
              cost.externalId
                .split('&')
                .includes(
                  `${policy.productcode},${homeActive},${this.packageSelected.code}`
                )
            )
          );
          if (this.packageSelected) {
            this.packageSelected.costs = this.currentCost;
          }
        })
      )
      .subscribe();

    this._document.body.classList.add('bg-color');
  }

  ngOnDestroy() {
    if (this.quoteHomeSubscription) {
      this.quoteHomeSubscription.unsubscribe();
    }
    this._document.body.classList.remove('bg-color');
  }
}
