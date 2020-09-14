import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'sxf-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  constructor() { }

  ngOnInit() {

  }
}
