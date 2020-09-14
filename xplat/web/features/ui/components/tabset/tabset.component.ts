import {
  Component,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  QueryList
} from '@angular/core';

import { TabsetBaseComponent } from '@sura-platform/features';
import { TabsetStepComponent } from '../tabset-step/tabset-step.component';

@Component({
  selector: 'sxf-tabset',
  templateUrl: 'tabset.component.html',
  styleUrls: ['tabset.component.scss']
})
export class TabsetComponent extends TabsetBaseComponent
  implements AfterContentInit {
  @ContentChildren(TabsetStepComponent) public tabs: QueryList<
    TabsetStepComponent
  >;

  @Input() disableStyle = false;
  @Input() customNavClass = '';
  @Input() customTabsClass = '';
  @Output() emitSelect = new EventEmitter();
  @Output() tabSelectedValue = new EventEmitter();
  @Input() urlImage = '';

  constructor() {
    super();
  }

  // contentChildren are set
  public ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(
      (tab: TabsetStepComponent) => tab.active
    );

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      if (this.tabs.first) {
        this.selectTab(this.tabs.first);
      }
    }
  }

  public selectTab(tabToSelect: TabsetStepComponent): void {
    if (tabToSelect.disabled === true || tabToSelect.active === true) {
      return;
    }

    // deactivate all tabs
    this.tabs
      .toArray()
      .forEach((tab: TabsetStepComponent) => (tab.active = false));

    // activate the tab the user has clicked on.
    tabToSelect.active = true;
    this.emitSelect.emit(this.tabs.toArray().indexOf(tabToSelect));
  }

  changeData(data: any) {
    this.tabSelectedValue.emit(data);
  }
}
