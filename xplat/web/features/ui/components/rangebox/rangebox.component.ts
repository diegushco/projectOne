import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'sxf-rangebox',
  templateUrl: 'rangebox.component.html',
  styleUrls: ['./rangebox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeboxComponent),
      multi: true
    }
  ]
})
export class RangeboxComponent implements OnInit, ControlValueAccessor {
  @Input() value = 0;
  @Input() maxLength = 200;
  @Input() disabled: boolean;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() prepend = '';
  @Input() append = '';
  @Input() disabledDecrement = false;
  @Input() disabledIncrement = false;

  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(value: any): void {
    if (value) {
      this.value = value || 0 || undefined;
    } else {
      this.value = 0;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Increase the value according to the step
   */
  increment() {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
      this.onChange(this.value);
    }
  }

  /**
   * Decrease the value according to the step
   */
  decrement() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
      this.onChange(this.value);
    }
  }
}
