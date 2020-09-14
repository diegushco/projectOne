import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
  OnInit,
  Optional,
  SkipSelf,
  Host
} from '@angular/core';

import { DatetimepickerBaseComponent } from '@sura-platform/features';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ControlContainer
} from '@angular/forms';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sxf-datetimepicker',
  templateUrl: 'datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true
    }
  ]
})
export class DatetimepickerComponent extends DatetimepickerBaseComponent
  implements OnInit, ControlValueAccessor {
  @Input() value: NgbDateStruct;
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() disabled: boolean;
  @Input() helpFeedback: string;
  @Input() label: string;
  @Input() navigation = 'arrows';
  @Input() formControl: AbstractControl;
  @Input() formControlName: string;

  @ViewChild('input') el: ElementRef;
  data: any;
  isDisabled: boolean;

  constructor(
    config: NgbDatepickerConfig,
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    super();
    config.minDate = this.minDate; // { year: 1930, month: 1, day: 1 };
    config.maxDate = this.maxDate;
  }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer.control.get(
          this.formControlName
        );
      }
    }
  }

  onChange = (_value: any) => {};
  onTouched = () => {};

  onChangeValue = (event) => {
    const v = this.el.nativeElement.value;
    if (v.match(/^\d{2}$/) !== null) {
      this.el.nativeElement.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      this.el.nativeElement.value = v + '/';
    }

    this.onChange(event);
  };

  writeValue(obj: any): void {
    this.data = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
