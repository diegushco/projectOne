import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as fromPolicy from '../../../../state/policy';
import { Store } from '@ngrx/store';
import { Subscription, of, combineLatest } from 'rxjs';
import { NgbAccordionConfig, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import {
  InspectionService,
  IInspectionRequest,
  IVehicle
} from '@sura-platform/features';
import { Router } from '@angular/router';
import { ModalComponent } from '@sura-platform/web';
import { catchError, switchMap } from 'rxjs/operators';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { InspectionStatus } from './inspectionStatus.enum';
import * as fromQuote from './../../../../components/quote/state/index';
@Component({
  selector: 'sxf-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss'],
  providers: [NgbAccordionConfig]
})
export class InspectionComponent implements OnInit, OnDestroy {
  /**
   * Acordeon of inspection options
   */
  @ViewChild('inspeccionPrevia', { static: true })
  inspeccionPrevia: NgbAccordion;

  /**
   * Reference to modal error
   */
  @ViewChild('modalError')
  modalError: ModalComponent;

  /**
   * Config animation button
   */
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    loop: false,
    autoplay: false
  };

  /**
   * Button Label for autoinspection and photoup
   */
  buttonLabel = 'Enviar link';

  /**
   * Variable to animation
   */
  buttonAnimated: any;
  /**
   * Loading data
   */
  loadingData = false;

  /**
   * FormControl for first option to inspection
   */
  autoinspeccion = new FormControl(true);

  /**
   * FormControl for second option to inspection
   */
  photoup = new FormControl(false);

  /**
   * FormControl for third option to inspection
   */
  policyFront = new FormControl(false);

  /**
   * FormControl for fourth option to inspection
   */
  phone = new FormControl(false);

  /**
   * FormControl to email photoup
   */
  emailPhotoUp = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    Validators.maxLength(80)
  ]);

  /**
   * FormControl to email autoinspection
   */
  emailAutoInspection = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    Validators.maxLength(80)
  ]);

  /**
   * Form for phone option
   */
  formPhone: FormGroup;

  /**
   * Variable to get policy from store
   */
  policy$: Subscription;

  /**
   * Obj for send request services of inspection
   */
  inspectionReq: IInspectionRequest = {
    job: {
      number: null
    },
    inspection: {
      email: null,
      phone: {
        number: null
      },
      files: null
    }
  };

  /**
   * Variable to save current email client for autoinspection online
   */
  currentEmailClient: string;

  /**
   * variable to label phone option
   */
  buttonLabelPhone = 'Aceptar';
  PENDING = InspectionStatus.PENDING; //PreEmision
  REQUESTNONBLOCKING = InspectionStatus.REQUESTNONBLOCKING; //PosEmision
  currentTypeInspection: string;

  photoUpSubscription$: Subscription;
  phoneSubscription$: Subscription;

  /**
   * Title to show in modal option selected
   */
  labelTittleModal: string;

  /**
   * Lets walk no-happy
   */
  allowOnlyPhone = false;

  /**
   * File to upload
   */
  fileUpload: File = null;

  form = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  /**
   * Flag to know when there is a file above the drop zone
   */
  overButton = false;

  /**
   * Title to show in option policyFront
   */
  buttonLabelFrontPolicy = 'Enviar';

  /**
   * Current vehicles
   */
  vehicles: IVehicle[];

  constructor(
    private router: Router,
    private storePolicy: Store<fromPolicy.State>,
    config: NgbAccordionConfig,
    private _inspectionService: InspectionService,
    private fb: FormBuilder,
    private storeQuote: Store<fromQuote.State>
  ) {
    config.closeOthers = true;
    //config.type = 'info';
  }

  ngOnInit() {
    this.formPhone = this.fb.group({
      prefixInspection: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/)
        ]
      ],
      phoneInspection: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ]
    });

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap((x) => {
          this.inspectionReq.inspection.files = [
            {
              vehiclenumber: x[1].activeMotor,
              name: '',
              content: ''
            }
          ];

          return of(x[0]);
        })
      )
      .subscribe((data: any) => {
        this.inspectionReq.job.number = data.job.number;
        this.currentEmailClient = data.client.email;
        this.emailAutoInspection.setValue(this.currentEmailClient);
        this.currentTypeInspection = data.inspection.status;
      });

    this.policy$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((policy) => {
        this.vehicles = policy.motor.vehicles;
      });

    this.autoinspeccion.valueChanges.subscribe((value: boolean) => {
      this.inspeccionPrevia.collapseAll();
      this.photoup.setValue(false, { emitEvent: false });
      this.policyFront.setValue(false, { emitEvent: false });
      this.phone.setValue(false, { emitEvent: false });
      value
        ? this.inspeccionPrevia.expand('autoinspeccionPanel')
        : this.inspeccionPrevia.collapse('autoinspeccionPanel');

      this.labelTittleModal = 'Autoinspección online';
    });

    this.photoup.valueChanges.subscribe((value: boolean) => {
      this.inspeccionPrevia.collapseAll();
      this.autoinspeccion.setValue(false, { emitEvent: false });
      this.policyFront.setValue(false, { emitEvent: false });
      this.phone.setValue(false, { emitEvent: false });
      value
        ? this.inspeccionPrevia.expand('photoupPanel')
        : this.inspeccionPrevia.collapse('photoupPanel');

      this.labelTittleModal = 'Photo up';
    });

    this.policyFront.valueChanges.subscribe((value: boolean) => {
      this.inspeccionPrevia.collapseAll();
      this.photoup.setValue(false, { emitEvent: false });
      this.autoinspeccion.setValue(false, { emitEvent: false });
      this.phone.setValue(false, { emitEvent: false });
      value
        ? this.inspeccionPrevia.expand('pollicyFrontPanel')
        : this.inspeccionPrevia.collapse('pollicyFrontPanel');

      this.labelTittleModal = 'Frente de póliza';
    });

    this.phone.valueChanges.subscribe((value: boolean) => {
      this.inspeccionPrevia.collapseAll();
      this.photoup.setValue(false, { emitEvent: false });
      this.policyFront.setValue(false, { emitEvent: false });
      this.autoinspeccion.setValue(false, { emitEvent: false });
      value
        ? this.inspeccionPrevia.expand('phonePanel')
        : this.inspeccionPrevia.collapse('phonePanel');

      this.labelTittleModal = 'Coordinar por teléfono';
    });

    this.emailPhotoUp.valueChanges.subscribe((bn) => {
      this.inspectionReq.inspection.email = bn;
    });
    this.labelTittleModal = 'Autoinspección online';
  }

  /**
   * Captures the event when the dragged file is in the drag zone
   */
  onDragOver(event) {
    this.overButton = true;
    event.preventDefault();
  }

  /**
   * Captures the event when the dragged file is not in the drag zone
   */
  onDragLeave(event) {
    this.overButton = false;
    event.preventDefault();
  }

  /**
   * Capture the dragged file
   * @param event drag file
   */
  onDropSuccess(event) {
    this.overButton = false;
    this.onFileChange(event.dataTransfer.files);
    event.preventDefault();
  }

  /**
   * Method to set file to upload
   */
  onFileChange(event) {
    let comeEvent = event;
    if (comeEvent.target) {
      //si se hizo drag and drop no se hace aqui
      comeEvent = comeEvent.target.files;
    }

    for (let i = 0; i < comeEvent.length; i++) {
      this.fileUpload = comeEvent[i];
    }
  }

  /**
   * Remove button for delete file (policy front)
   */
  removeImage() {
    this.fileUpload = null;
  }

  /**
   * Method action for autoinspection option
   */
  linkAutoInspection() {
    this.inspectionReq.inspection.email = this.emailAutoInspection.value;
    this.linkAutoInspectionPhotoUp();
  }

  /**
   * Method action for photoUp option
   */
  linkAutoInspectionPhotoUp() {
    this.loadingData = true;
    this.buttonLabel = 'Enviando link';
    this.buttonAnimated.playSegments([[0, 119]], true);

    this.photoUpSubscription$ = this._inspectionService
      .getLinkPhotoUpAndAutoInspection(this.inspectionReq)
      .pipe(
        catchError((err) => {
          return of([err]);
        })
      )
      .subscribe((xv) => {
        this.buttonAnimated.playSegments([[120, 175]], false);
        setTimeout(() => {
          this.buttonLabel = 'Enviado link';
        }, 2000);
        this.loadingData = false;
        if (xv.code && xv.code === '0') {
          this.router.navigateByUrl('quoting/thankyou');
        } else {
          this.modalError.openModal();
        }
      });
  }

  /**
   * Method action for Phone option
   */
  acceptPhone() {
    this.loadingData = true;
    this.buttonLabelPhone = 'Enviando';
    this.buttonAnimated.playSegments([[0, 119]], true);

    const phone =
      this.formPhone.get('prefixInspection').value +
      this.formPhone.get('phoneInspection').value;

    this.inspectionReq.inspection.phone.number = phone;
    this.phoneSubscription$ = this._inspectionService
      .sendPhone(this.inspectionReq)
      .pipe(
        catchError((err) => {
          return of([err]);
        })
      )
      .subscribe((xv) => {
        this.buttonAnimated.playSegments([[120, 175]], false);
        setTimeout(() => {
          this.buttonLabelPhone = 'Aceptar';
        }, 2000);
        this.loadingData = false;
        if (xv.code && xv.code === '0') {
          this.router.navigateByUrl('quoting/thankyou');
        } else {
          this.modalError.openModal();
        }
      });
  }

  /**
   * Method to call service for send file with option policy front
   */
  sendFrontPolicy() {
    this.inspectionReq.inspection.files[0].name = this.fileUpload.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = () => {
      //el split es para eliminar la cabecera del tipo de archivo (.split(',')[1])
      //necesario para que la api funcione
      this.inspectionReq.inspection.files[0].content = reader.result
        .toString()
        .split(',')[1];

      this.loadingData = true;
      this.buttonLabelFrontPolicy = 'Enviando';
      this.buttonAnimated.playSegments([[0, 119]], true);

      this.phoneSubscription$ = this._inspectionService
        .policyFileUp(this.inspectionReq)
        .pipe(
          catchError((err) => {
            return of([err]);
          })
        )
        .subscribe((xv) => {
          this.buttonAnimated.playSegments([[120, 175]], false);
          setTimeout(() => {
            this.buttonLabelFrontPolicy = 'Enviar';
          }, 2000);
          this.loadingData = false;
          if (xv.code && xv.code === '0') {
            this.router.navigateByUrl('quoting/thankyou');
          } else {
            this.modalError.openModal();
          }
        });
    };
  }

  /**
   * Control lottie animation
   */
  animationCreated(animationItem: AnimationItem): void {
    this.buttonAnimated = animationItem;
  }

  /**
   * Function for close modal error and option phone is mandatory
   */
  closeModal() {
    this.modalError.closeModal();
    //this.allowOnlyPhone = true;
    //this.photoup.disable();
    //this.autoinspeccion.disable();
    //this.policyFront.disabled();
    //this.phone.setValue(true);
    this.router.navigateByUrl('quoting/thankyou');
  }

  get isPlural() {
    return this.vehicles.length > 1;
  }

  /**
   * Destroy subscriptions
   */
  ngOnDestroy() {
    if (this.photoUpSubscription$) this.photoUpSubscription$.unsubscribe();
    if (this.phoneSubscription$) this.phoneSubscription$.unsubscribe();
    this.policy$?.unsubscribe();
  }
}
