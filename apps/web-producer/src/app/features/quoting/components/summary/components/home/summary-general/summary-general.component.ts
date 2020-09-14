import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { IPackage, ICost, IPolicy } from '@sura-platform/features';
@Component({
  selector: 'sxf-summary-general',
  templateUrl: './summary-general.component.html',
  styleUrls: ['./summary-general.component.scss']
})
export class SummaryGeneralComponent implements OnInit, OnDestroy {
  @Input() packageSelected: IPackage = <IPackage>{};
  @Input() policy: IPolicy = <IPolicy>{};

  /**
   * Active home number
   *
   * @type {number}
   * @memberof SummaryGeneralComponent
   */
  currentHome = 0;

  /**
   * Show/Hide Premio Total info
   *
   * @memberof SummaryGeneralComponent
   */
  expandPremioTotal = false;

  /**
   * Current Cost
   *
   * @type {ICost}
   * @memberof SummaryGeneralComponent
   */
  currentCost: ICost = <ICost>{};

  /**
   * Comission of producer
   *
   * @memberof SummaryGeneralComponent
   */
  producerComission = 0;

  constructor() {}

  ngOnInit() {
    this.currentCost = <ICost>this.packageSelected.costs;
    this.producerComission = this.policy.home.commission.producer;
  }

  /**
   * Toggle Premio Total info
   *
   * @memberof SummaryGeneralComponent
   */
  togglePremioTotal() {
    this.expandPremioTotal = !this.expandPremioTotal;
  }

  ngOnDestroy(): void {}
}
