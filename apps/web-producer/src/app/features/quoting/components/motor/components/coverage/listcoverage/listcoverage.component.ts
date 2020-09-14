import { Component, OnInit, Input } from '@angular/core';

import { BaseComponent } from '@sura-platform/core';

@Component({
  selector: 'sxf-listcoverage',
  templateUrl: 'listcoverage.component.html',
  styleUrls: ['listcoverage.component.scss']
})
export class ListCoverageComponent extends BaseComponent implements OnInit {
  /**
   * List of coverages
   */
  listCoverage: { code: number; name: string }[];

  /**
   * Limit qty to show
   */
  limit: number;

  @Input() public morefeatures: boolean;

  @Input() public listFeature: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    // this.limit = 8;
  }
}
