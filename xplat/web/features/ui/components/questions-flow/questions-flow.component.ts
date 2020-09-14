import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionFlowBaseComponent } from '@sura-platform/features/ui/base/question-flow.base-component';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Component({
  selector: 'sxf-questions-flow',
  templateUrl: './questions-flow.component.html',
  styleUrls: ['./questions-flow.component.scss']
})
export class QuestionsFlowComponent extends QuestionFlowBaseComponent
  implements OnInit {
  @Input() routes: IRoutes[];
  @Input() routeActive = '';
  @Output() currentRoute: EventEmitter<string> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit() {}

  setCurrentRoute(route: string) {
    this.routeActive = route;
    this.currentRoute.emit(route);
  }
}
