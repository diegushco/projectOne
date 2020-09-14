import { Component, Input, Output, EventEmitter } from '@angular/core';

import { WizardStepBaseComponent } from '@sura-platform/features';

@Component({
  selector: 'sxf-wizard-step',
  templateUrl: 'wizard-step.component.html'
})
export class WizardStepComponent extends WizardStepBaseComponent {
  /**
   * title of step wizard
   * @property title
   */
  @Input() title: string;

  /**
   * icon of step wizard (font awesome)
   * @property icon
   */
  @Input() icon: string;

  /**
   * Boolean hidden
   * @property hidden
   */
  @Input() hidden = false;
  /**
   * test
   * @class test
   */
  @Input() isValid = true;
  /**
   * Boolean for show next
   * @property showNext
   */
  @Input() showNext = true;

  /**
   * test
   * @class test
   */
  @Input() completeTitle: string;
  /**
   * Boolean for show preovious
   * @property showPrev
   */
  @Input() showPrev = true;
  /**
   * Boolean for set step completed
   * @property stepCompleted
   */
  @Input() stepCompleted = false;
  /**
   * Event emitter of next
   * @property Next
   */
  @Output() Next: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Event emitter of previous
   * @property Prev
   */
  @Output() Prev: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Event emitter of complete
   * @property Complete
   */
  @Output() Complete: EventEmitter<any> = new EventEmitter<any>();

  public _isActive = false;
  /**
   * test
   * @class test
   */
  isDisabled = false;

  @Input('isDisabled')
  set setIsDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  constructor() {
    super();
  }
  /**
   * test
   * @class test
   */
  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }
  /**
   * return active step
   */
  get isActive(): boolean {
    return this._isActive;
  }
}
