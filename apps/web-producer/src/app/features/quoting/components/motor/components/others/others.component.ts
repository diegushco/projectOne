import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import { combineLatest, of, Subject, Subscription, Observable } from 'rxjs';

import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromQuote from '../../../quote/state/index';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromEmission from '../../../emission/state';
import * as fromEmissionActions from '../../../emission/state/emission.actions';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IVehicle,
  CarService,
  DomainSearch,
  IPolicy,
  PatentBlackListService,
  PatentUseService,
  IBondholder,
  BondholderService
} from '@sura-platform/features';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowRouteEmissionService } from '../../../emission/services/flow-route-emission.service';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { catchError, take, distinctUntilKeyChanged } from 'rxjs/operators';
import { ModalComponent } from '@sura-platform/web';
import {
  patentPatternAutos,
  patentPatternMotos,
  patentPatternOtros
} from '../../components/patent/patent.component';

@Component({
  selector: 'sxf-others-motor',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersMotorComponent extends BaseComponent
  implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    loop: false,
    autoplay: false
  };
  @ViewChild('modalNoGNC', { static: true }) modalNoGNC: ModalComponent;

  @ViewChild('modalPatentInUse', { static: true })
  modalPatentInUse: ModalComponent;

  @ViewChild('modalUW', { static: true }) modalUW: ModalComponent;

  form: FormGroup;

  formClient: FormGroup;

  formGNC: FormGroup;

  vehicles: IVehicle[];

  currentMotor: IVehicle;

  routes: IRoutes[];

  currentPolicy: IPolicy;

  showGNC = false;
  minDateGNC: any;
  disabledValidate = false;

  _CODE_GNC = 'SURA_CA7_EquipodeGNCCov';
  _CODE_SUMMA_GNC = 'SURA_CA7_EquipodeGNCLim';
  _CODE_EXPIRATION = 'SURA_CA7_EquipodeGNCFecVencLim';

  hiddenFormPatent = true;
  loadingPatent$: Subject<boolean> = new Subject();
  currentBlackList = false;
  loadingPatent = false;
  buttonLabel = 'Validar';
  buttonAnimated: any;
  applyBondHolderFlag: boolean;
  bondHoldersQuotesQuantity = [];
  bondHoldersTypes$: Observable<IBondholder[]>;
  openedModalPatentInUse = false;
  maxLength = 11;
  /**
   * Flag used to disable fields when
   * policy comes from quotes list
   *
   * @type {boolean}
   * @memberof OthersMotorComponent
   */
  disabledByRetrieve: boolean;

  /**
   * Flag used for hidde the GNC
   * check input
   *
   * @type {boolean}
   * @memberof OthersMotorComponent
   */
  gncNotRequired: boolean;

  /**
   * Subscription to emission store
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  emissionSubscription: Subscription;

  /**
   * Subscription to quote store
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  policyQuoteSubscription: Subscription;

  /**
   * Subscription to route changes on
   * emission store
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  emissionRoutesSubscription: Subscription;

  /**
   * Subscription to value changes on
   * patent input
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  patentInputSubscription: Subscription;

  /**
   * Subscription to value changes on
   * clientIsDriver check input
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  clientIsDriverCheckSubscription: Subscription;

  /**
   * Subscription to value changes on
   * gnc check input
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  gncCheckSubscription: Subscription;

  /**
   * Subscription to value changes on
   * expiration input
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  expirationInputSubscription: Subscription;

  /**
   * Subscription to value changes on
   * creditor prendario check input
   *
   * @type {Subscription}
   * @memberof OthersMotorComponent
   */
  creditorPrendarioInputSubscription: Subscription;

  /**
   * stores the pattern corresponding to the type of vehicle
   * Default car pattern
   * @memberof OthersMotorComponent
   */
  patentPattern = patentPatternAutos;
  clientType = '';
  constructor(
    private fb: FormBuilder,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private flowRouteEmissionService: FlowRouteEmissionService,
    private storeEmission: Store<fromEmission.State>,
    private patentBlackListService: PatentBlackListService,
    private patentUseService: PatentUseService,
    private bondHolderService: BondholderService
  ) {
    super();
  }

  ngOnInit() {
    this.loadingPatent$.next(false);

    this.route.params.subscribe(({ id }) => {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetCurrentMotorAction(Number(id))
      );
    });

    this.policyQuoteSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData).pipe(take(1)),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe(([policy, quote]) => {
      console.log('Recargando data');

      this.currentPolicy = policy;
      this.currentMotor = policy.motor.vehicles.find(
        (c) => c.number === quote.activeMotor
      );
      this.vehicles = policy.motor.vehicles;

      this.currentMotor.bondholder.type !== null
        ? (this.applyBondHolderFlag = true)
        : (this.applyBondHolderFlag = false);

      if (
        this.currentMotor.chasis !== null &&
        this.currentMotor.motor !== null
      ) {
        this.hiddenFormPatent = false;
      }

      if (
        this.currentMotor.driver.clientIsDriver &&
        this.currentPolicy.client.type === 'Person'
      ) {
        this.currentMotor.driver.firstname = this.currentPolicy.client.firstname;
        this.currentMotor.driver.lastname = this.currentPolicy.client.lastname;
      }

      const _dateFromStoreVigencia = this.currentPolicy.period.start.toString();
      const dateGNC = {
        year: parseInt(_dateFromStoreVigencia.substring(0, 4), 0),
        month: parseInt(_dateFromStoreVigencia.substring(5, 7), 0),
        day: parseInt(_dateFromStoreVigencia.substring(8, 10), 0)
      };

      this.minDateGNC = dateGNC;

      if (this.currentMotor.group === 'MOTO') {
        this.gncNotRequired = true;
        this.patentPattern = patentPatternMotos;
      } else {
        if (this.currentMotor.group === 'OTRO') {
          this.patentPattern = patentPatternOtros;
        } else {
          this.patentPattern = patentPatternAutos;
        }
      }
    });

    this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .pipe(distinctUntilKeyChanged('activeMotor'))
      .subscribe(() => this.initializeForms());

    this.emissionRoutesSubscription = this.storeEmission
      .select(fromEmission.getRoutes)
      .subscribe((data) => {
        this.routes = data;
      });

    this.bondHoldersTypes$ = this.bondHolderService.getBondHolders();
    let index = 0;

    while (index < 100) {
      index++;
      this.bondHoldersQuotesQuantity.push({
        code: index,
        description: index
      });
    }

    this.emissionSubscription = this.storeEmission
      .select(fromEmission.getEmission)
      .subscribe((x) => {
        const job = x.jobNumberFromQuotes;
        const approved = x.approvedEmission;
        this.clientType = x.client.type;
        this.disabledByRetrieve = job && approved ? true : false;

        if (this.disabledByRetrieve) {
          this.form.get('gnc').disable();
          this.form.get('creditorPrendario').disable();
          this.form.get('clientIsDriver').disable();
          this.formClient.disable();
          this.form.get('bondHolderType').disable();
          this.form.get('bondHolderQuotas').disable();
        }
      });
  }

  initializeForms() {
    console.log('Inicializo los formularios');
    // Vehicle form
    this.form = this.fb.group({
      gnc: [this.currentMotor.gnc, Validators.required],
      creditorPrendario: [this.applyBondHolderFlag],
      patent: [
        this.currentMotor.license,
        [Validators.required, Validators.pattern(this.patentPattern)]
      ],
      bondHolderType: [this.currentMotor.bondholder.type],
      bondHolderQuotas: [this.currentMotor.bondholder.quotas],
      engineNumber: [
        this.currentMotor.motor,
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ],
      chassisNumber: [
        this.currentMotor.chasis,
        [
          Validators.required,
          // Por definicion del PO el minimo de caracteres es 10.
          Validators.minLength(10),
          Validators.maxLength(17)
        ]
      ],
      clientIsDriver: [this.currentMotor.driver.clientIsDriver]
    });

    // Driver form
    this.formClient = this.fb.group({
      driverName: [this.currentMotor.driver.firstname, Validators.required],
      driverLastName: [this.currentMotor.driver.lastname, Validators.required]
    });

    this.currentMotor.packages
      .filter((op) => op.selected)
      .map((jk) => {
        //si tiene agregado GNC en accesorios
        const gncCov = jk.coverages.filter(
          (ik) => ik.pattern.code === this._CODE_GNC
        );
        if (gncCov.length === 1) {
          const valueSumma = gncCov[0].terms.filter(
            (op) => op.code === this._CODE_SUMMA_GNC
          )[0].value;
          const valueExpiration = gncCov[0].terms.filter(
            (op) => op.code === this._CODE_EXPIRATION
          )[0].value;

          const _dateFromStore = valueExpiration.toString();
          const dateGNC = {
            year: parseInt(_dateFromStore.substring(0, 4), 0),
            month: parseInt(_dateFromStore.substring(5, 7), 0),
            day: parseInt(_dateFromStore.substring(8, 10), 0)
          };

          this.formGNC = this.fb.group({
            summa: [valueSumma, Validators.required],
            expiration: [dateGNC, Validators.required]
          });

          this.form.patchValue(
            {
              gnc: true
            },
            { onlySelf: true, emitEvent: false }
          );
          this.showGNC = true;
        } else {
          //no tiene GNC agregado
          this.formGNC = this.fb.group({
            summa: [0, Validators.required],
            expiration: [, Validators.required]
          });
        }
      });

    // if (!this.hiddenFormPatent) {
    //   this.form.markAllAsTouched();
    // }

    // Subscribe form inputs
    this.unsubscribeForm();

    this.patentInputSubscription = this.form
      .get('patent')
      .valueChanges.subscribe(() => {
        this.currentBlackList = false;
        this.hiddenFormPatent = true;
        this.disabledValidate = false;
        this.form.get('chassisNumber').setValue([]);
        this.form.get('engineNumber').setValue([]);
        this.form
          .get('creditorPrendario')
          .setValue(false, { emitEvent: false });
        this.applyBondHolderFlag = false;
        this.form.get('bondHolderType').setValue([]);
        this.form.get('bondHolderQuotas').setValue([]);
        this.form.get('bondHolderQuotas').clearValidators();
        this.currentMotor.license = null;
        this.buttonLabel = 'Validar';
      });

    this.clientIsDriverCheckSubscription = this.form
      .get('clientIsDriver')
      .valueChanges.subscribe((data) => {
        if (data) {
          this.formClient
            .get('driverName')
            .setValue(this.currentPolicy.client.firstname);
          this.formClient
            .get('driverLastName')
            .setValue(this.currentPolicy.client.lastname);
          this.vehicles.forEach((v) => {
            if (v.number === this.currentMotor.number) {
              v.driver.firstname = this.currentPolicy.client.firstname;
              v.driver.lastname = this.currentPolicy.client.lastname;
              v.driver.clientIsDriver = data;
            }
          });
          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(this.vehicles)
          );
        } else {
          this.formClient
            .get('driverName')
            .setValue(
              this.disabledByRetrieve
                ? this.currentMotor.driver.firstname
                : null
            );
          this.formClient
            .get('driverLastName')
            .setValue(
              this.disabledByRetrieve ? this.currentMotor.driver.lastname : null
            );

          this.vehicles.forEach((v) => {
            if (v.number === this.currentMotor.number) {
              v.driver.firstname = this.formClient.get('driverName').value;
              v.driver.lastname = this.formClient.get('driverLastName').value;
              v.driver.clientIsDriver = data;
            }
          });
          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(this.vehicles)
          );
        }
      });

    this.gncCheckSubscription = this.form
      .get('gnc')
      .valueChanges.subscribe((data: boolean) => {
        this.showGNC = false;
        if (data && this.formGNC.get('summa').value === 0) {
          //muestro modal y lo envio a coverage de nuevo
          this.openModalNoGNC();
        } else {
          this.vehicles.forEach((v) => {
            if (v.number === this.currentMotor.number) {
              v.gnc = data;
            }
          });

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(this.vehicles)
          );
        }
      });

    this.expirationInputSubscription = this.formGNC
      .get('expiration')
      .valueChanges.subscribe((data) => {
        let isoDate = data.year + '-' + data.month + '-' + data.day;
        isoDate = new Date(isoDate).toISOString();

        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.packages
              .filter((op) => op.selected)[0]
              .coverages.filter((ik) => ik.pattern.code === this._CODE_GNC)[0]
              .terms.filter(
                (op) => op.code === this._CODE_EXPIRATION
              )[0].value.current = isoDate;
          }
        });

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(this.vehicles)
        );
      });

    this.creditorPrendarioInputSubscription = this.form
      .get('creditorPrendario')
      .valueChanges.subscribe((value) => {
        this.applyBondHolderFlag = value;
        //!Si se marca el tilde, no debe poder continuar si el dato obligatorio no está cargado.
        //!Si se cargaron datos (tipo de acreedor o cuotas) y se destilda la opción de acreedor prendario esos datos vuelven a null.
        //! US5752 Validation.
        if (this.applyBondHolderFlag) {
          this.form
            .get('bondHolderQuotas')
            .setValidators([Validators.required]);
          this.form.get('bondHolderQuotas').updateValueAndValidity();
        } else {
          this.form.get('bondHolderQuotas').clearValidators();
          this.form.get('bondHolderQuotas').updateValueAndValidity();
          this.form.get('bondHolderQuotas').reset();
          this.form.get('bondHolderType').reset();
        }
      });
  }

  unsubscribeForm() {
    this.patentInputSubscription?.unsubscribe();
    this.clientIsDriverCheckSubscription?.unsubscribe();
    this.gncCheckSubscription?.unsubscribe();
    this.expirationInputSubscription?.unsubscribe();
  }

  ngOnDestroy() {
    this.emissionSubscription?.unsubscribe();
    this.policyQuoteSubscription?.unsubscribe();
    this.emissionRoutesSubscription?.unsubscribe();

    this.unsubscribeForm();
  }

  continuePatentValidate() {
    this.carService
      .getCar(this.form.get('patent').value)
      .pipe(
        catchError(() => {
          //No existe esa petente
          //muestro formulario
          this.hiddenFormPatent = false;
          this.loadingPatent$.next(false);
          this.loadingPatent = false;
          return of(null);
        })
      )
      .subscribe((vehicleData) => {
        this.buttonAnimated.playSegments([[120, 175]], false);
        setTimeout(() => {
          this.buttonLabel = 'Validado';
        }, 2000);
        this.hiddenFormPatent = false;
        this.loadingPatent = false;
        this.loadingPatent$.next(false);
        this.checkBlackList(vehicleData);
      });
  }

  validatePatent() {
    this.openedModalPatentInUse = false;

    this.disabledValidate = true;
    this.loadingPatent$.next(true);
    this.loadingPatent = true;
    this.buttonLabel = 'Validando';
    this.buttonAnimated.playSegments([[0, 119]], true);

    const startDatecurrentPolicy = new Date(
      this.currentPolicy.period.start.toString()
    );
    const startDate =
      startDatecurrentPolicy.getDate() +
      '-' +
      ('0' + (startDatecurrentPolicy.getMonth() + 1)).slice(-2) +
      '-' +
      startDatecurrentPolicy.getFullYear();
    startDatecurrentPolicy.setMonth(startDatecurrentPolicy.getMonth() + 3);
    const endDate =
      startDatecurrentPolicy.getDate() +
      '-' +
      ('0' + (startDatecurrentPolicy.getMonth() + 1)).slice(-2) +
      '-' +
      startDatecurrentPolicy.getFullYear();

    this.patentUseService
      .validePatentInUse(this.form.get('patent').value, startDate, endDate)
      .subscribe((data) => {
        const patentInUse = data;
        if (
          patentInUse !== null &&
          patentInUse.length > 0 &&
          patentInUse[0].fixedid !== ''
        ) {
          this.openModalPatentInUse();
          this.openedModalPatentInUse = true;
        } else {
          this.continuePatentValidate();
        }
      });
  }

  checkBlackList(vehicleData: DomainSearch) {
    this.patentBlackListService
      .validePatent(this.form.get('patent').value)
      .subscribe((res) => {
        this.loadingPatent$.next(false);

        this.currentBlackList = false;
        if (res !== null && res.length > 0) {
          this.currentBlackList = true;
        }

        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            v.blacklist = this.currentBlackList;
          }
        });

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(this.vehicles)
        );

        if (this.currentBlackList) {
          this.modalUW.openModal();
        } else {
          setTimeout(() => {
            this.buttonLabel = 'Validado';
          }, 2000);
        }
      });

    if (vehicleData) {
      this.form.get('chassisNumber').setValue(vehicleData.chassis);
      this.form.get('engineNumber').setValue(vehicleData.motor);
      this.form.markAllAsTouched();
    }
  }

  onEnterPatent() {
    if (this.form.get('patent').valid) {
      this.validatePatent();
    }
  }

  onEnter() {
    if (this.form.valid) {
      this.continue();
    }
  }

  /**
   * Continue to next vehicle or payment method
   *
   * @returns
   * @memberof OthersMotorComponent
   */
  continue() {
    const {
      patent,
      engineNumber,
      chassisNumber,
      bondHolderType,
      bondHolderQuotas,
      gnc
    } = this.form.value;

    const { driverLastName, driverName } = this.formClient.value;

    this.currentMotor.license = patent;
    this.currentMotor.motor = engineNumber;
    this.currentMotor.chasis = chassisNumber;

    this.currentMotor.bondholder = {
      ...this.currentMotor.bondholder,
      type: this.applyBondHolderFlag ? bondHolderType : null,
      quotas: this.applyBondHolderFlag ? bondHolderQuotas : null
    };

    this.currentMotor.driver = {
      ...this.currentMotor.driver,
      lastname: driverLastName,
      firstname: driverName
    };

    if (gnc) {
      const currentPackage = this.currentMotor.packages.find(
        (pkg) => pkg.selected
      );
      this.flowRouteEmissionService.enableRoute(this.routes, 'payment-method');

      this.storeEmission.dispatch(
        new fromEmissionActions.SetActiveRoute('payment-method')
      );

      this.routes.forEach((element) => {
        if (element.path === 'aditionalauto') {
          element.value =
            this.form.get('chassisNumber').value.toString().toUpperCase() +
            ' - ' +
            this.form.get('engineNumber').value.toString().toUpperCase();
        }
      });

      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.driver.lastname = this.formClient.get('driverLastName').value;
          v.driver.firstname = this.formClient.get('driverName').value;
          v.license = this.form.get('patent').value.toString().toUpperCase();
          v.motor = this.form.get('engineNumber').value;
          v.chasis = this.form.get('chassisNumber').value;
          if (this.applyBondHolderFlag) {
            v.bondholder.type = this.form.get('bondHolderType').value;
            v.bondholder.quotas = this.form.get('bondHolderQuotas').value;
          } else {
            v.bondholder.type = null;
            v.bondholder.quotas = null;
          }
        }
      });

      currentPackage.coverages = currentPackage.coverages.filter(
        (cov) => cov.pattern.code !== this._CODE_GNC
      );
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    // En caso de no ser el último vehículo, paso al siguiente
    if (this.currentMotor.number < this.vehicles.length) {
      this.router.navigateByUrl(
        `quoting/emission/questions/aditionalauto/${
          this.currentMotor.number + 1
        }`
      );
      return;
    }

    // En caso de ser el último vehículo, voy a método de pago
    this.flowRouteEmissionService.enableRoute(this.routes, 'payment-method');

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('payment-method')
    );

    if (this.form.valid) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetFormEmissionOthersIsValidAction(true)
      );
    }

    // Cambio el nombre del título de la ruta
    this.changeRouteTitleValue();

    this.router.navigateByUrl('quoting/emission/questions/payment-method');
  }

  /**
   * Change title for aditional route
   *
   * @memberof OthersMotorComponent
   */
  changeRouteTitleValue() {
    const aditionalRoute = this.routes.find((route) =>
      route.path.includes('aditionalauto')
    );

    const { license, chasis, motor } = this.currentMotor;

    aditionalRoute.value = `${
      this.vehicles.length > 0 ? license.toUpperCase() + ': ' : ''
    }${chasis.toUpperCase()} - ${motor.toUpperCase()}`;
  }

  closeModalNoGNC() {
    this.form.patchValue(
      {
        gnc: false
      },
      { onlySelf: true, emitEvent: true }
    );
    this.modalNoGNC.closeModal();
  }

  openModalNoGNC() {
    this.modalNoGNC.openModal();
  }

  redirectCoverage() {
    const pckCode = this.currentMotor.packages.filter((op) => op.selected)[0]
      .code;
    this.modalNoGNC.closeModal();
    this.router.navigateByUrl(
      'quoting/coverage/' + this.currentMotor.id + '/modal/' + pckCode
    );
  }
  /**
   * Control lottie animation
   */
  animationCreated(animationItem: AnimationItem): void {
    this.buttonAnimated = animationItem;
  }

  closeModalPatentInUse() {
    this.loadingPatent = false;
    this.buttonAnimated.playSegments([[120, 175]], false);
    this.buttonLabel = 'Validar';
    this.modalPatentInUse.closeModal();
  }

  openModalPatentInUse() {
    this.modalPatentInUse.openModal();
  }

  closeUWModal(action?: string) {
    if (action === 'continue') {
      this.modalUW.closeModal();
      return;
    }
    this.loadingPatent = false;
    this.buttonAnimated.playSegments([[120, 175]], false);
    this.buttonLabel = 'Validar';

    this.form.get('patent').setValue('');
    this.modalUW.closeModal();
  }
}
