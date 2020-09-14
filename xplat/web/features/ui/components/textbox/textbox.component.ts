import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Optional,
  Host,
  SkipSelf
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ControlContainer,
  AbstractControl
} from '@angular/forms';

export enum types {
  text,
  number
}

export interface IconConfig {
  display: boolean;
  type?: string;
  color?: string;
  tooltip?: string;
  url?: string;
  width?: string;
  height?: string;
}
@Component({
  selector: 'sxf-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    }
  ]
})
export class TextboxComponent implements OnInit, ControlValueAccessor {
  iconAppend: IconConfig = {
    display: false
  };

  iconPrepend: IconConfig = {
    display: false
  };

  @Input() value: string | number = '';
  @Input() placeholder = '';
  @Input() type: types = types.text;
  @Input() maxLength = 200;
  @Input() minLength = 0;
  @Input() mask: any = false;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() helpFeedback: string;
  @Input() validFeedback: string;
  @Input() invalidFeedback: string;
  @Input() placement: string;
  @Input() messageTooltips: string;
  @Input() min: string;
  @Input() max: string;
  @Input() allowkey = true;
  @Input() inputStyle: string;
  @Input() formControl: AbstractControl;
  @Input() formControlName: string;
  @Input() specialChar = true;
  @Input() iconConfig = {
    append: this.iconAppend,
    prepend: this.iconPrepend
  };

  onChange = (_: any) => {};
  onTouch = () => {};

  tooltipDisabled = () => {
    return true;
  };

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer.control.get(
          this.formControlName
        );
      }
    }
  }

  onInput(value: string) {
    this.value = value;
    this.onTouch();

    if (this.mask) {
      this.onChange(
        this.value
          .split(' ')
          .join('')
          .split('_')
          .join('')
          .split('$')
          .join('')
          .split(',')
          .join('')
          .split('.')
          .join('')
      );
    } else {
      this.onChange(this.value);
    }
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
    this.disabled = isDisabled;
  }

  onKeyUp() {
    //this logic is for input number when it dont need
    const isTrueSet = String(this.allowkey) === 'true';
    if (!isTrueSet) {
      return false;
    }
  }

  omit_special_char(event) {
    if (this.specialChar.toString() === 'true') {
      return event.charCode;
    } else {
      let k;
      k = event.charCode;
      return (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k === 8 ||
        (k >= 48 && k <= 57)
      );
    }
  }
}
