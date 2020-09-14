import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { BaseComponent } from '@sura-platform/core';

@Component({
  selector: 'sxf-comparecoverage',
  templateUrl: 'comparecoverage.component.html',
  styleUrls: ['comparecoverage.component.scss']
})
export class Comparecoverage extends BaseComponent implements OnInit {
  @Input() public compareCoveragePane: any;
  @Output() slideCompare: EventEmitter<any> = new EventEmitter<any>();
  @Output() showCardsCompare: EventEmitter<any> = new EventEmitter<any>();
  @Output() compareCoverageList: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeCoverFromCompare: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Array with coverage to compare, with all data
   */
  compareCoverageArr: any = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    /*
    for (let i = 0; i < 4; i++) {
      this.compareCoveragePane.push({
        code: 0,
        title: 'Agregar cobertura',
        description: 'Hasta 4'
      });

      this.compareCoverageArr.push({
        code: 0
      });
    }
    this.compareCoverageList.emit(this.compareCoveragePane);
    */
  }

  /**
   * Method to show blocks coverages to compare
   */
  showBlockCompare() {
    //this.slideCompare = false;
    this.slideCompare.emit(false);
    //this.showCardsCompare = true;
    this.showCardsCompare.emit(true);
  }

  removeCompare() {
    //slideCompare = false
    this.slideCompare.emit(false);
  }

  removeCompareCoverage(data) {
    this.removeCoverFromCompare.emit(data);
  }
}
