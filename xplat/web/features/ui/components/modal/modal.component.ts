import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

import { ModalBaseComponent } from '@sura-platform/features';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sxf-modal',
  templateUrl: 'modal.component.html'
})
export class ModalComponent extends ModalBaseComponent {
  closeResult: string;

  @Input() public title: string;
  @Input() public textButton: string;
  /**
   * Options passed to modal
   * https://ng-bootstrap.github.io/#/components/modal/api#NgbModalOptions
   * @type {NgbModalOptions}
   * @memberof ModalComponent
   */
  @Input() public options: NgbModalOptions = {};
  @Output() public closed: EventEmitter<void> = new EventEmitter();

  @ViewChild('content') refModal: ElementRef;

  modalReference: any;

  constructor(private modalService: NgbModal) {
    super();
  }

  openModal() {
    // Set default options
    this.options['size'] = 'size' in this.options ? this.options['size'] : 'lg';
    this.options['ariaLabelledBy'] = 'modal-basic-title';
    this.modalReference = this.modalService
      .open(this.refModal, this.options)
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.closed.emit();
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal() {
    //this.modalReference.close();
    this.modalService.dismissAll();
  }
}
