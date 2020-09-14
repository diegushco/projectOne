import { Component, Input } from '@angular/core';

import { IconBaseComponent } from '@sura-platform/features';

@Component({
  selector: 'sxf-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent extends IconBaseComponent {
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() class: string;
  @Input() size: string;
  constructor() {
    super();
  }
}
