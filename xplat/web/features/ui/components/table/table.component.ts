import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ColumnMode } from '@swimlane/ngx-datatable/';

export const columnMode = ColumnMode;

@Component({
  selector: 'sxf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() class = 'material';
  @Input() rows: any;
  @Input() columns: any;
  @Input() columnMode: ColumnMode;
  @Input() loadingIndicator: boolean;
  @Output() row: EventEmitter<any> = new EventEmitter();

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}

  onActivate(event) {
    this.row.next(event);
  }
}
