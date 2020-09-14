import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

import { TabsetStepBaseComponent } from '@sura-platform/features';

@Component({
  selector: 'sxf-tabset-step',
  templateUrl: 'tabset-step.component.html'
})
export class TabsetStepComponent extends TabsetStepBaseComponent {
  @Input() tabTitle: string;
  @Input() tabValue: number;
  @Input() active = false;
  @Input() disabled = false;
  @Input() bypassDOM = false;
  @Input() customPaneClass = '';
  @Input() urlImage = '';
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  constructor() {
    super();
  }
}
