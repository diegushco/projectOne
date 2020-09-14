import {
  AfterContentInit,
  Directive,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[sxfAutoFocus]'
})
export class AutoFocusDirective
  implements OnInit, AfterContentInit, AfterViewInit {
  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {}
  // public constructor() {}

  ngOnInit(): void {
    if (this.el.nativeElement.children) {
      this.el.nativeElement.children[0].focus();
    }

    // this.viewportScroller.scrollToPosition([0, 0]);
  }

  public ngAfterContentInit() {
    // this.el.nativeElement.scrollIntoView();
  }

  ngAfterViewInit(): void {
    // alert(this.el.nativeElement.scrollHeight);
    // this.el.nativeElement.scroll(0, this.el.nativeElement.scrollHeight);
    window.scrollBy(0, 70);
  }
}
