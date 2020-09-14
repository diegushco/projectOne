import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'sxf-textbox-search',
  templateUrl: './textbox-search.component.html',
  styleUrls: ['./textbox-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxSearchComponent),
      multi: true
    }
  ]
})
export class TextboxSearchComponent implements OnInit, ControlValueAccessor {
  @Input() value: string | number = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() maxLength = 200;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() helpFeedback: string;

  isDisabled: boolean;

  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {}

  ngOnInit() {}

  onInput(value: string | number) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouch();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '' || undefined;
    } else {
      this.value = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
