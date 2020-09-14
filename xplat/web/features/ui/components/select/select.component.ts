import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { SelectBaseComponent } from '@sura-platform/features';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import filter from 'lodash/filter';
import { AnimationOptions } from 'ngx-lottie';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sxf-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent extends SelectBaseComponent
  implements OnDestroy, ControlValueAccessor {
  /*
   * It recieve items array.
   */

  private _items: any[] | Observable<any[]>;
  subject: BehaviorSubject<any> = new BehaviorSubject<boolean>(true);

  public subscription;
  public elementsInSelect;

  @Input() set items(value: any[] | Observable<any[]>) {
    this._items = value;
    if (value instanceof Observable) {
      //! MP: Parche HORRIBLE si alguien encuentra una forma de comparar un Observable vacio para evaluarlo mejor seria un golazo
      if (!JSON.parse(JSON.stringify(this._items)).source) {
        this._items = null;
        this.subject.next(false);
      } else {
        this.subject.next(true);
      }
      if (this._items !== null) {
        this.subscription = (<Observable<any[]>>this._items).subscribe(
          (items) => {
            this.subject.next(false);
            this.elementsInSelect = items;
          }
        );
      }
    }

    if (value instanceof Array) {
      this.subject.next(true);
      if (value !== null) {
        this.elementsInSelect = value;
        if (this.markFirst === 'true') {
          this.writeValue(value[0][this.bindValue]);
        }
        this.loadComplete.emit(value);
        this.subject.next(false);
      }
    }
  }

  get items(): any[] | Observable<any[]> {
    return this._items;
  }

  /*
   * When Items is observable this property return the Observable
   */
  get observable(): Observable<any[]> {
    if (this._items instanceof Observable) {
      return this._items;
    } else {
      return null;
    }
  }

  /*
   * Object property to use for label. Default label
   */
  @Input() bindLabel: string;
  /*
   * Object property to use for selected model. By default binds to whole object.
   */
  @Input() bindValue: string;
  /*
   * Allows to select multiple items.
   */
  @Input() multiple = false;
  /*
   * Class for select, by default is custom.
   */
  @Input() class: string;
  /*
   * Placeholder text.
   */
  @Input() placeholder: string;
  /*
   * HelpFeedback text.
   */
  @Input() helpFeedback: string;
  /*
   * Allow to search for value. Default true
   */
  @Input() searchable = false;
  /*
   * Set the dropdown position on open.
   */
  @Input() dropdownPosition: string;
  /*
   * Set disabled on empty items.
   */
  @Input() disabledOnEmpty: string;

  /*
   * Set disabled.
   */
  @Input() disabled: boolean;

  /*
   * Emit value to parent component.
   */
  @Output() getTextsearch: EventEmitter<string> = new EventEmitter<string>();

  /*
   * Emit value when select load datacomplete.
   */
  @Output() loadComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Allow to clear selected value.
   */
  @Input() clearable = false;

  /**
   * markFirst element when Items load complete
   */
  @Input() markFirst = 'false';

  public selected: any;

  public _value: any;

  // Para activar el loading a potestad del programador
  @Input() loading = false;
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/inside-inputs-loader.json'
  };

  onChangeValue = (event) => {
    this.onChange(event[this.bindValue]);
  };

  onChange = (_value: any) => {};

  onTouched = () => {};

  constructor() {
    super();
  }

  ngOnDestroy() {
    if (this.subscription !== undefined && this.subscription !== null) {
      this.subscription.unsubscribe();
    }

    this.subject.unsubscribe();
  }

  getValue(): any {
    if (this.items instanceof Array) {
      if (this.items !== null) {
        return filter(this.items, [this.bindValue, this.selected])[0];
      }
    }

    if (this.items instanceof Observable) {
      return (<Observable<any[]>>this.items).pipe(
        map((items) => {
          return filter(items, [this.bindValue, this.selected])[0];
        })
      );
    }
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  customSearchFn(term: string, item: any) {
    let result = false;
    let obj: string[] = Object.values(item);
    obj = obj.map(String);

    term = term.toLowerCase();
    obj = obj.map((obt) => obt.toLowerCase());

    if (obj[0] && obj[0].includes(term)) {
      result = true;
    } else if (obj[1] && obj[1].includes(term)) {
      result = true;
    }
    this.getTextsearch.emit(term);

    return result;
  }
}
