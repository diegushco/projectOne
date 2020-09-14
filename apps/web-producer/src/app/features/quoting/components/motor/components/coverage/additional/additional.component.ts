import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  IPolicy,
  AditionalAccessoriesService,
  IVehicle,
  QuotingService,
  UtilService,
  IMotorError
} from '@sura-platform/features';
import { Observable, of, combineLatest, EMPTY } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../../state/policy/';
import * as fromPolicyActions from '../../../../../state/policy/policy.actions';
import { switchMap, tap } from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromQuote from './../../../../quote/state/index';
import * as fromQuoteActions from './../../../../quote/state/quote.actions';
import { PolicyAdapter } from '../../../../../adapters/policy.adapter';
import cloneDeep from 'lodash/cloneDeep';
import { ICoverage } from '@sura-platform/features/coverage';
import { LogService } from '@sura-platform/core';
import * as moment from 'moment';

import { AnimationOptions } from 'ngx-lottie';
//import * as fromQuoteActions from './../../../../quote/state/quote.actions';

@Component({
  selector: 'sxf-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  /*
   * Current group selected in Tabset.
   */
  currentGroup = 0;

  /**
   * variable to get policy from store
   */
  currentPolicyCopy: IPolicy = <IPolicy>{};

  /**
   * variable to get policy from store
   */
  currentPolicy: IPolicy = <IPolicy>{};

  /**
   * Input of cover with costs
   */
  @Input() public packageValue: any;

  additionalAccesories$: Observable<any> = new Observable();

  additionalAccesoriesGroup$: Observable<any> = new Observable();

  additionalAccesories: any;

  @Output() public policyAdditionalChanges = new EventEmitter();

  allFeatures: any;

  /**
   * To show tabs additional
   */
  tabsAditional: any;

  /**
   * variable for formgroup
   */
  form: FormGroup = <FormGroup>{};

  get coveragesAdditionalAccesories(): FormArray {
    return this.form.get('addittionalaccessories') as FormArray;
  }

  showData = false;

  currentGroupCode = '';

  closeResult = '';
  modalOptions: NgbModalOptions;

  @ViewChild('mymodal', { static: true }) mymodal: AdditionalComponent = <
    AdditionalComponent
  >{};

  codePkg = '';

  coveragesAdded: any;
  /**
   * Current motor in policy
   */
  currentMotor: IVehicle = <IVehicle>{};

  currentPackageAdditionals: Array<IVehicle> = <Array<IVehicle>>[];

  CODE_GNC_DATE = 'SURA_CA7_EquipodeGNCFecVencLim';

  applyAll: FormControl = <FormControl>{};

  applyAllCoverages = false;

  /**
   * Last valueChange from Array
   */
  lastDataChg: any;

  /**
   * Por la nueva definicion, hay que enviar en el request del servicio siempre estas coberturas
   */
  COVERAGES_MANDATORY: ICoverage[] = [
    {
      pattern: {
        code: 'SURA_CA7_ContaminacionCov',
        description: ''
      },
      terms: [
        {
          code: 'SURA_CA7_ContaminacionLim',
          options: null,
          value: { current: '10000000' }
        }
      ]
    },
    {
      pattern: {
        code: 'SURA_CA7_CargaPeligrosaLimitedCov',
        description: ''
      },
      terms: [
        {
          code: 'SURA_CA7_CargaPeligrosaLimitedLim',
          options: null,
          value: { current: '10000000' }
        }
      ]
    }
  ];

  loadingCost = false;

  vehicles: IVehicle[] = <IVehicle[]>[];

  isValidFormArray = true;

  formArray: FormArray = <FormArray>{};

  validateHadAdditionalsOrAccesories = [];

  hasAdditionalOrAccesories$: Observable<any> = new Observable();

  minDateGNC: any;
  maxDateGNC: any;

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private _aditionalAccessoriesService: AditionalAccessoriesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private storeQuote: Store<fromQuote.State>,
    private quotingService: QuotingService,
    private logService: LogService,
    private utilService: UtilService,
    private policyAdapter: PolicyAdapter
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    };
  }

  ngOnInit() {
    this.utilService.getCurrentServerDate().subscribe((data) => {
      const year = data.datetime.toString().substring(0, 4);
      const month = data.datetime.toString().substring(5, 7);
      const day = data.datetime.toString().substring(8, 10);

      const minDate = moment(year + '-' + month + '-' + day).format();
      const maxDate = moment(year + '-' + month + '-' + day)
        .add(5, 'years')
        .format();

      this.minDateGNC = {
        year: parseInt(minDate.toString().substring(0, 4), 0),
        month: parseInt(minDate.toString().substring(5, 7), 0),
        day: parseInt(minDate.toString().substring(8, 10), 0)
      };

      this.maxDateGNC = {
        year: parseInt(maxDate.toString().substring(0, 4), 0),
        month: parseInt(maxDate.toString().substring(5, 7), 0),
        day: parseInt(maxDate.toString().substring(8, 10), 0)
      };
    });

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap((x) => {
          x[0]?.motor?.vehicles
            ?.filter((v) => v?.number === x[1]?.activeMotor)[0]
            ?.packages?.forEach((pk: any) => {
              if (pk?.code === this.route?.snapshot?.params?.pkg) {
                // ML: En esta variable almaceno todos los adicionales que existen en
                // la póliza excepto cláusula de ajuste y asistencia mecánica
                this.validateHadAdditionalsOrAccesories = <never[]>(
                  pk?.coverages?.filter(
                    (k: any) =>
                      k.pattern.code !== 'SURA_CA7_ClausulaDeAjusteCov' &&
                      k.pattern.code !== 'SURA_CA7_AsistenciaMecanicaCov' &&
                      k.pattern.code !== 'SURA_CA7_MobilityTheftDamageCov'
                  )
                );
              }
            });
          return of(EMPTY);
        })
      )
      .subscribe()
      .unsubscribe();

    this.formArray = this.fb.array([], [Validators.required]);

    this.form = new FormGroup({
      addittionalaccessories: this.formArray
    });

    this.form
      .get('addittionalaccessories')
      ?.valueChanges.subscribe(() => {
        // ML: Ante un cambio en el formulario:
        this.isValidFormArray = true;

        // ML: Control items del formulario
        const groupItems: any = (this.form.get(
          'addittionalaccessories'
        ) as FormArray).controls;

        groupItems.forEach((item: FormControl) => {
          const valueChg =
            parseInt(item.get('max')?.value, 0) > 0
              ? parseInt(item.get('value')?.value, 0)
              : item.get('value')?.value;

          item.patchValue(
            {
              visible: false
            },
            { onlySelf: true, emitEvent: false }
          );

          // Muestro los límites en caso de que el ítem esté tildado
          // y que el valor sea superior o inferior a los límites y
          // pongo el formulario inválido.
          if (
            item.get('chk')?.value &&
            valueChg !== '' &&
            (valueChg > parseInt(item.get('max')?.value, 0) ||
              valueChg < parseInt(item.get('min')?.value, 0))
          ) {
            this.isValidFormArray = false;
            item.patchValue(
              {
                visible: true
              },
              { onlySelf: true, emitEvent: false }
            );
          }
        });

        // hj.forEach(element => {
        //   element.value = (element.max > 0) ? parseInt(element.value, 0) : element.value;
        //   if (element.chk && element.value !== '' && (element.value > element.max || element.value < element.min)) {
        //     this.isValidFormArray = false;
        //   }
        // });
      })
      .unsubscribe();

    // ML: Esto en teoría es para aplicar estos adicionales a todos los paquetes
    this.applyAll = new FormControl(false);

    this.applyAll.valueChanges.subscribe((dataapply) => {
      this.applyAllCoverages = dataapply;
      if (this.lastDataChg !== null && this.lastDataChg !== undefined) {
        this.processValueChanges(this.lastDataChg);
      }
    });

    // ML: Obtengo el código del paquete
    this.codePkg = this.route.snapshot.params.pkg;

    if (this.codePkg !== undefined) {
      this.tabsAditional = [
        { code: 1, name: 'Adicionales' },
        { code: 2, name: 'Accesorios' }
      ];

      this.storeQuote.select(fromQuote.getQuoteAdditionals).subscribe((po) => {
        this.currentPackageAdditionals = <IVehicle[]>po;
      });

      this.additionalAccesories$ = combineLatest([
        this.storePolicy.select(fromPolicy.getPolicyData),
        this.storeQuote.select(fromQuote.getQuoteMotorData)
      ]).pipe(
        switchMap((obs) => {
          // [ policy, quoteMotorData ]
          // ML: Selecciono el vehículo actual
          this.currentMotor = obs[0].motor.vehicles.filter(
            (c) => c.number === obs[1].activeMotor
          )[0];

          // ML: Almaceno la información de la póliza
          this.currentPolicy = obs[0];

          // ML: Almaceno la información del paquete actual
          this.packageValue = this.currentMotor?.packages?.filter(
            (pkg) => pkg.code === this.codePkg
          )[0];

          // ML: Creo una copia del objeto póliza //! ¿Para?
          this.currentPolicyCopy = JSON.parse(
            JSON.stringify(this.currentPolicy)
          );

          // ML: Limpio los paquetes en la copia de la póliza
          this.currentPolicyCopy.motor.vehicles.filter(
            (vehicle) => vehicle.number === this.currentMotor.number
          )[0].packages = [];

          // ML: Agrego el paquete actual en la copiai de la póliza
          this.currentPolicyCopy?.motor?.vehicles
            ?.filter(
              (vehicle) => vehicle?.number === this.currentMotor?.number
            )[0]
            ?.packages?.push(this.packageValue);

          // ML: Almaceno la información de todos los vehículos
          this.vehicles = obs[0].motor.vehicles;

          this.groupSelected('1');
          return of(obs);
        }),
        tap(() => {
          // ML: Otra vez clono la póliza
          const filtered = cloneDeep(this.currentPolicyCopy) as IPolicy;

          const currentMotorPackages = filtered.motor.vehicles.find(
            (v) => v.number === this.currentMotor.number
          );

          if (currentMotorPackages && currentMotorPackages.packages) {
            currentMotorPackages.packages = currentMotorPackages?.packages?.filter(
              (p) => p?.code === this.codePkg
            );

            currentMotorPackages.packages[0].coverages = [
              ...(<ICoverage[]>currentMotorPackages?.packages[0]?.coverages),
              ...this.COVERAGES_MANDATORY
            ];
          }

          // const requestAdditional = cloneDeep(this.currentPolicyCopy);
          // requestAdditional.motor.vehicles
          //   .filter((x) => x.number === this.currentMotor.number)[0]
          //   .packages.map((pkg) => {
          //     if (pkg.code === this.codePkg) {
          //       const tmpCov = pkg.coverages;
          //       pkg.coverages = [];
          //       pkg.coverages = tmpCov;
          //       pkg.coverages = [...pkg.coverages, ...this.COVERAGES_MANDATORY];
          //     }
          //   });

          // const packageTemp = requestAdditional.motor.vehicles.filter(
          //   (x) => x.number === this.currentMotor.number
          // )[0].packages[0];

          // requestAdditional.motor.vehicles.filter(
          //   (x) => x.number === this.currentMotor.number
          // )[0].packages = packageTemp;

          this.additionalAccesoriesGroup$ = this._aditionalAccessoriesService
            .getAdditionalAccessorios(
              // this.policyAdapter.adaptAdditional(requestAdditional)
              this.policyAdapter.adaptAdditional(filtered)
            )
            .pipe(
              switchMap((gaa) => {
                // ML: Filtros y grupos para ordenar
                const toFilter = [
                  'SURA_CA7_RemediacionLimitadaCov',
                  'SURA_CA7_CargaPeligrosaCov',
                  'SURA_CA7_CargaPeligrosaLimpiezaCov',
                  'SURA_CA7_MobilityTheftDamageCov'
                ];
                const toOrder = [
                  'SURA_CA7_CargaPeligrosaLimitedCov',
                  'SURA_CA7_ContaminacionCov',
                  'SURA_CA7_RemediacionCov'
                ];

                this.allFeatures = gaa;
                this.additionalAccesories = this.allFeatures.motor.vehicles
                  .filter((x: any) => x.number === this.currentMotor.number)[0]
                  .package.coverages.filter((cov: any) =>
                    toFilter.indexOf(cov.pattern.code) === -1 ? true : false
                  )
                  .sort((a: any, b: any) => {
                    if (
                      toOrder.indexOf(a.pattern.code) >
                      toOrder.indexOf(b.pattern.code)
                    ) {
                      return 1;
                    }
                    return -1;
                  });

                this.proccessData(this.additionalAccesories);
                return of(this.additionalAccesories);
              }),
              tap(() => {
                this.enableValueChanges();
              })
            );
        })
      );

      this.open(this.mymodal);
    }
  }

  enableValueChanges() {
    (this.form.get(
      'addittionalaccessories'
    ) as FormArray).valueChanges.subscribe((dataChg) => {
      //si el item de un grupo esta en false (titulo), el subgrupo deberia ser todos en false..si esta en true..todos en true
      dataChg.map((zj: any, idx: any) => {
        if (dataChg[idx - 1] && zj.maincode === dataChg[idx - 1].maincode) {
          zj.chk = dataChg[idx - 1].chk;
        }
      });

      const subItemsChecks: any[] = [];
      const groupItems: any = (this.form.get(
        'addittionalaccessories'
      ) as FormArray).controls;
      groupItems.forEach((item: FormControl) => {
        /*
        Si de este item dependen otros items entonces habilitar o deshabilitar
        las dependencias
        */
        if (item.get('code')?.value === 'SURA_CA7_CargaPeligrosaLimitedCov') {
          if (item.get('chk')?.value) {
            this.enableOrDisableAdditional(
              'SURA_CA7_ContaminacionCov',
              'enable'
            );
          } else {
            this.enableOrDisableAdditional(
              'SURA_CA7_RemediacionCov',
              'disable'
            );
            this.enableOrDisableAdditional(
              'SURA_CA7_ContaminacionCov',
              'disable'
            );
          }
        }

        if (item.get('code')?.value === 'SURA_CA7_ContaminacionCov') {
          if (item.get('chk')?.value) {
            this.enableOrDisableAdditional('SURA_CA7_RemediacionCov', 'enable');
          } else {
            this.enableOrDisableAdditional(
              'SURA_CA7_RemediacionCov',
              'disable'
            );
          }
        }

        //bloque de validacion
        /*
        si un item esta activo, agrego validacion para ese item
        si un item que tiene un subgrupo esta activo, le pongo validacion a todo ese subgrupo
        menos a los item que sean del tipo detalle
         */
        if (item.get('chk')?.value) {
          const subgroup = groupItems.filter(
            (rt: any) =>
              rt.get('maincode')?.value === item.get('maincode')?.value &&
              rt.get('code')?.value.toLowerCase().indexOf('detail') === -1
          );

          if (subgroup.length > 0) {
            //debo agregar validacion a hijos
            subgroup.forEach((subItem: any) => {
              subItem.controls['value'].setValidators([Validators.required]);
              subItem.controls['value'].updateValueAndValidity({
                emitEvent: false
              });
              subItemsChecks.push(subItem.controls['code'].value);
            });
          }
        } else if (
          item.get('value')?.validator !== null &&
          !subItemsChecks.includes(item.get('code')?.value)
        ) {
          //item.get('value')?.validator({} as AbstractControl) &&
          item.get('value')?.clearValidators();
          item.get('value')?.updateValueAndValidity({ emitEvent: false });
        }
      });

      this.lastDataChg = dataChg;
      this.processValueChanges(this.lastDataChg);
    });

    // ML: Disparo un update para ocultar o mostrar los adicionales que dependen de otros
    this.form.get('addittionalaccessories')?.updateValueAndValidity();
  }

  createFormGroupAdditional(fields: any) {
    fields.map((item: any) => {
      if (item.code !== 'SURA_CA7_ClausulaDeAjusteCov')
        //formArray.push(this.createForms(item));
        this.formArray.push(this.createForms(item));
    });
  }

  open(content: any) {
    // this.initGroup();
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  closeModal(cad: any) {
    if (!cad) {
      this.router.navigate(['quoting/coverage/' + this.currentMotor.id]);
      this.modalService.dismissAll();
    }
    const arrayIfHasAdditionalsOrAccesories = [];
    this.formArray.value.forEach((arr: any) => {
      if (arr.chk) {
        arrayIfHasAdditionalsOrAccesories.push(arr);
      }
    });

    // Si no tiene ningun adicional o accesorio en el array en memoria ni en el store de policy.
    if (
      arrayIfHasAdditionalsOrAccesories.length < 1 &&
      this.validateHadAdditionalsOrAccesories.length < 1
    ) {
      return false;
    }

    if (cad === 'added') {
      //FIXME: ML - PARCHE RAPIDO
      const currentVehicle = this.currentPolicyCopy.motor.vehicles.find(
        (vehicle) => vehicle.number === this.currentMotor.number
      );

      // ML: Elimino dependencia si no existe padre
      const currentPkg = currentVehicle?.packages?.find(
        (pkg) => pkg.code === this.packageValue.code
      );

      if (
        !currentPkg?.coverages?.find(
          (cov) => cov?.pattern?.code === 'SURA_CA7_CargaPeligrosaLimitedCov'
        ) &&
        currentPkg
      )
        currentPkg.coverages = <ICoverage[]>(
          currentPkg?.coverages?.filter(
            (cov) =>
              ![
                'SURA_CA7_RemediacionCov',
                'SURA_CA7_ContaminacionCov'
              ].includes(cov?.pattern?.code)
          )
        );

      if (
        !currentPkg?.coverages?.find(
          (cov) => cov?.pattern?.code === 'SURA_CA7_ContaminacionCov'
        ) &&
        currentPkg
      )
        currentPkg.coverages = <ICoverage[]>(
          currentPkg?.coverages?.filter(
            (cov) => cov?.pattern?.code !== 'SURA_CA7_RemediacionCov'
          )
        );

      //Actualizo al paquete las nuevas coberturas en el store y recotizar
      this.loadingCost = true;

      const adapted = this.policyAdapter.adapt(this.currentPolicyCopy);

      this.quotingService
        .getCosts(adapted)
        .pipe(
          tap(() => {
            this.storePolicy.dispatch(
              new fromPolicyActions.UpdateVehicleAction(
                this.currentPolicyCopy.motor.vehicles
              )
            );
          })
        )
        .subscribe((x) => {
          if (x.motor) {
            this.storeQuote.dispatch(
              new fromQuoteActions.SetCostsResponseAction(x)
            );

            // Busco si hay errores
            if (x?.errors) {
              x?.errors?.forEach((e: IMotorError) => {
                if (this.vehicles) {
                  this.vehicles
                    ?.filter((l) => l?.number === this.currentMotor?.number)[0]
                    ?.packages?.forEach((p) => {
                      this.logService?.issue(
                        'Error en cotizar. Codigo: ' + e.code + '. Auto: {0}',
                        JSON.stringify(this.currentMotor)
                      );
                      p.costs = null;
                      p.coveragesQuoted = null;
                      p.limitrc = null;
                      p.premiums = null;
                    });
                }
              });
            } else {
              x.motor.vehicles
                ?.filter((k: any) => k.number === this.currentMotor.number)[0]
                .packages.forEach((element: any) => {
                  this.vehicles
                    ?.filter((l) => l.number === this.currentMotor.number)[0]
                    ?.packages //.filter((o) => o.group === this.currentGroup)
                    ?.forEach((p) => {
                      if (element.externalid === p.externalid) {
                        p.code = element.code;
                        p.costs = element.costs;
                        p.coveragesQuoted = element.coverages;
                        p.limitrc = element.limitrc;
                        p.premiums = element.premiums;
                      }
                    });
                });
            }

            this.storePolicy.dispatch(
              new fromPolicyActions.UpdateVehicleAction(this.vehicles)
            );

            // Actualizo packageAdditional de QUOTE en el store
            // pero agrego solo las coberturas adicionales agregadas
            // no tomo en cuenta las de defecto (clausula de ajuste y asistencia)

            const policyAdditional = cloneDeep(this.currentPackageAdditionals);

            policyAdditional
              ?.filter((xc) => xc.number === this.currentMotor?.number)[0]
              ?.packages?.map((fi) => {
                if (this.applyAllCoverages) {
                  fi.coverages = [];
                  fi.coverages = this.coveragesAdded;
                } else if (fi.code === this.codePkg) {
                  fi.coverages = [];
                  fi.coverages = this.coveragesAdded;
                }
              });
            this.storeQuote.dispatch(
              new fromQuoteActions.SetMotorPackageAdditionals(policyAdditional)
            );

            this.loadingCost = false;
            this.router.navigate(['quoting/coverage/' + this.currentMotor.id]);
            this.modalService.dismissAll();
          }
        });
    } else {
      this.router.navigate(['quoting/coverage/' + this.currentMotor.id]);
      this.modalService.dismissAll();
    }
  }
  /**
   * Initialize tabset
   */
  initGroup() {}

  /**
   * Search in the api the coverages by group
   * @param coverageGroup group clicked in the tabset
   */
  groupSelected(coverageGroup: string) {
    this.currentGroupCode =
      coverageGroup === '1'
        ? 'SURA_CA7_CobAdicionalesGrp'
        : 'SURA_CA7_AccesoriosGrp';

    this.currentGroup = parseInt(coverageGroup, 0);
  }

  proccessData(addac: any) {
    const listCoverages: any[] = [];
    addac.map((al: any) => {
      let fromPolicyStore = true;
      //si este codigo de adicional estaba ya guardado desde el store
      let chkCurrent = false;
      if (
        this.currentPolicy &&
        this.currentPolicy?.motor &&
        this.currentPolicy?.motor?.vehicles &&
        this.currentMotor &&
        this.packageValue
      ) {
        const pckMotor = this.currentPolicy?.motor?.vehicles?.filter(
          (k) => k?.number === this.currentMotor?.number
        )[0]?.packages;
        const covPckMotor = pckMotor?.filter(
          (pkg) => pkg?.code === this.packageValue?.code
        )[0]?.coverages;
        const ftlMotor = covPckMotor?.filter(
          (coverage) => coverage?.pattern?.code === al?.pattern?.code
        );
        if (ftlMotor) {
          chkCurrent = ftlMotor?.length > 0;
        }
      }

      //si no estaba guardado en el store en policy, pero puede que si
      //este guardado en package additional en quote
      if (!chkCurrent) {
        const tempPck = this.currentPackageAdditionals
          ?.filter((x) => x.number === this.currentMotor?.number)[0]
          ?.packages?.filter((df) => df.code === this.packageValue?.code)[0];
        if (tempPck?.coverages !== null) {
          const covPck = tempPck?.coverages?.filter(
            (bn) => bn.pattern.code === al.pattern.code
          );
          if (covPck) {
            chkCurrent = covPck.length > 0;
          }

          fromPolicyStore = false;
        }
      }

      //si el codigo de adicional estaba temporalmente guardado sin haber cerrado modal
      if (!chkCurrent) {
        const ftlPolicyCov = this.currentPolicyCopy?.motor?.vehicles
          ?.filter((k) => k.number === this.currentMotor?.number)[0]
          ?.packages?.filter((kj) => kj.code === this.packageValue?.code)[0]
          ?.coverages?.filter((jk) => {
            if (jk.pattern.code === al.pattern.code) return true;
            return false;
          });
        if (ftlPolicyCov) {
          chkCurrent = ftlPolicyCov.length > 0;
        }
      }

      //si ya existe en el paquete, entonces tomo el valor por defecto que trae en el paquete y no el default de la api
      let valueDefault = null;
      let maxDefault = '';
      let minDefault = '';
      let placeHolder = '';
      //sub grupos solo se crearan para accesorios.. adicionales no
      if (
        al.terms.length > 1 &&
        al.category.code === 'SURA_CA7_AccesoriosGrp'
      ) {
        //con subgrupo
        al.terms.map((sub: any) => {
          const subVal = sub.value;

          if (chkCurrent) {
            valueDefault = this.currentPolicy?.motor?.vehicles
              ?.filter((k) => k.number === this.currentMotor?.number)[0]
              ?.packages?.find((kj) => kj.code === this.packageValue?.code)
              ?.coverages?.find((jk) => jk.pattern.code === al.pattern.code)
              ?.terms.find((ui) => ui.code === sub.code)?.value?.current;

            maxDefault = subVal && subVal.max ? sub.value.max : '';
            minDefault =
              subVal && (subVal.min || subVal.min === 0) ? sub.value.min : '';
            placeHolder = sub.description;
          } else {
            valueDefault = subVal && subVal.value ? sub.value?.current : '';
            maxDefault = subVal && subVal.max ? sub.value.max : '';
            minDefault =
              subVal && (subVal.min || subVal.min === 0) ? sub.value.min : '';
            placeHolder = sub.description;
          }

          listCoverages.push({
            code: sub.code,
            maincode: al.pattern.code,
            max: maxDefault,
            min: minDefault,
            placeholder: placeHolder,
            chk: chkCurrent,
            title: al.pattern.description,
            subtitle: sub.description,
            value: valueDefault,
            category: al.category.code
          });
        });
      } else {
        const alVal = al.terms[0].value;

        if (chkCurrent) {
          if (!fromPolicyStore) {
            valueDefault = this.currentPackageAdditionals[0]?.packages
              ?.find((kj) => kj.code === this.packageValue.code)
              ?.coverages?.find((jk) => jk.pattern.code === al.pattern.code)
              ?.terms[0]?.value?.current;
          } else {
            valueDefault = this.currentPolicy?.motor?.vehicles
              ?.filter((k) => k.number === this.currentMotor.number)[0]
              ?.packages?.find((kj) => kj.code === this.packageValue.code)
              ?.coverages?.find((jk) => jk.pattern.code === al.pattern.code)
              ?.terms[0]?.value?.current;
          }

          maxDefault = alVal && alVal.max ? alVal.max : '';
          minDefault = alVal && (alVal.min || alVal.min) === 0 ? alVal.min : '';
          placeHolder = al.terms[0].description;
        } else {
          valueDefault = alVal && alVal.current ? alVal?.current : '';
          maxDefault = alVal && alVal.max ? alVal.max : '';
          minDefault = alVal && (alVal.min || alVal.min) === 0 ? alVal.min : '';
          placeHolder = al.terms[0].description;
        }

        listCoverages.push({
          code: al.pattern.code,
          maincode: al.pattern.code,
          max: maxDefault,
          min: minDefault,
          placeholder: placeHolder,
          chk: chkCurrent,
          title: al.pattern.description,
          subtitle: '',
          value: valueDefault,
          category: al.category.code
        });
      }
    });
    this.createFormGroupAdditional(listCoverages);
  }

  initLoadAdditioanlAcccesories(listItems: any) {
    this.form = new FormGroup({
      addittionalaccessories: this.fb.array([])
    });

    this.initFormArrayAdditionalAccesories(listItems);
  }

  processValueChanges(dataChg: any) {
    //codigos agregados de adicionales o accesorios
    const dataAdded = dataChg
      .filter((az: any) => az.chk === true)
      .map((ax: any) => ax.maincode);

    //codigos agregados de adicionales o accesorios
    /* const dataRemoved = dataChg
       .filter((az) => az.chk === false)
       .map((ax) => ax.maincode);
*/
    //todos los codigos de adicionales
    const allCodes = dataChg.map((ax: any) => ax.maincode);

    //filtro de coverages originales (con su estructura pattern, terms) para enviar al store, en base a los seleccionados en true
    const additionalAccesoriesAdded = this.additionalAccesories.filter(
      (zx: any) => dataAdded.includes(zx.pattern.code)
    );

    additionalAccesoriesAdded.map((ap: any) => {
      let valueGroup = -1;
      if (ap.category !== 'SURA_CA7_AccesoriosGrp') {
        valueGroup = this.coveragesAdditionalAccesories.controls
          .filter((ii) => ii.get('maincode')?.value === ap.pattern.code)
          .map((kc) => kc.get('value')?.value)[0];
      }

      if (ap.terms.length > 1) {
        ap.terms.map((sub: any) => {
          let valueSubGroup = this.coveragesAdditionalAccesories.controls
            .filter((ii) => ii.get('code')?.value === sub.code)
            .map((kc) => kc.get('value')?.value)[0];

          if (valueSubGroup !== undefined && valueSubGroup.year) {
            const isoDate =
              valueSubGroup.year +
              '-' +
              valueSubGroup.month +
              '-' +
              valueSubGroup.day;
            valueSubGroup = new Date(isoDate).toISOString();
          }

          //valido, que si es de adicionales y es subgrupo, tomen todos el valor del padre
          sub.value =
            ap.category.code === 'SURA_CA7_CobAdicionalesGrp'
              ? valueGroup
              : valueSubGroup;
        });
      } else {
        //busco el valor que puso el productor en el input text/number y lo seteo a additionalAccesoriesAdded
        ap.terms[0].value = this.coveragesAdditionalAccesories.controls
          .filter((ii) => ii.get('maincode')?.value === ap.pattern.code)
          .map((kc) => kc.get('value')?.value)[0];
      }
    });
    //this.currentPolicy

    this.currentPolicyCopy = JSON.parse(JSON.stringify(this.currentPolicy));

    this.currentPolicyCopy?.motor?.vehicles
      ?.filter((k) => k.number === this.currentMotor?.number)[0]
      ?.packages?.map((zj) => {
        if (this.applyAllCoverages) {
          //verifico si hay que aplicar a todas als coberturas o no
          const notCodes = zj?.coverages?.filter(
            (kl) => !allCodes.includes(kl.pattern.code)
          );
          const coveragesTmp = notCodes;
          zj.coverages = <ICoverage[]>[];
          zj.coverages = <ICoverage[]>(
            coveragesTmp?.concat(additionalAccesoriesAdded)
          );
        } else if (zj.code === this.packageValue.code) {
          const notCodes = zj?.coverages?.filter(
            (kl) => !allCodes.includes(kl.pattern.code)
          );
          const coveragesTmp = notCodes;
          zj.coverages = [];
          zj.coverages = <ICoverage[]>(
            coveragesTmp?.concat(additionalAccesoriesAdded)
          );
        }
      });

    this.coveragesAdded = additionalAccesoriesAdded;
  }

  initFormArrayAdditionalAccesories(fields: any) {
    const formArray = this.form.get('addittionalaccessories') as FormArray;

    fields.map((item: any) => {
      if (item.code !== 'SURA_CA7_ClausulaDeAjusteCov')
        //formArray.push(this.createForms(item));
        this.formArray.push(this.createForms(item));
    });
    this.form.setControl('addittionalaccessories', formArray);
  }

  createForms(fields: any): FormGroup {
    if (fields.code === this.CODE_GNC_DATE) {
      const _dateFromStore = fields.value.toString();
      fields.value = {
        year: parseInt(_dateFromStore.substring(0, 4), 0),
        month: parseInt(_dateFromStore.substring(5, 7), 0),
        day: parseInt(_dateFromStore.substring(8, 10), 0)
      };
    }

    //visible, es para mostrar el mensaje de error si pasa de topes max o min
    const formGroup: FormGroup = new FormGroup({
      code: new FormControl(fields.code),
      maincode: new FormControl(fields.maincode),
      min: new FormControl(fields.min),
      max: new FormControl(fields.max),
      placeholder: new FormControl(fields.placeholder),
      chk: new FormControl(fields.chk),
      title: new FormControl(fields.title),
      subtitle: new FormControl(fields.subtitle),
      value: new FormControl(parseInt(fields.value, 0)),
      category: new FormControl(fields.category),
      visible: new FormControl(false)
    });
    return formGroup;
  }

  toInt(value: any) {
    return parseInt(value, 0);
  }

  /**
   * Función para habilitar o deshabilitar los campos indicados
   *
   * @param {string} code
   * @param {('enable' | 'disable')} [action='disable']
   * @memberof AdditionalComponent
   */
  enableOrDisableAdditional(
    code: string,
    action: 'enable' | 'disable' = 'disable'
  ) {
    (this.form.get('addittionalaccessories') as FormArray).controls.forEach(
      (ctrl) => {
        if (ctrl.get('code')?.value === code) {
          if (action === 'disable') {
            ctrl.get('chk')?.setValue(false, { emitEvent: false });
            ctrl.disable({ emitEvent: false });
          } else {
            ctrl.enable({ emitEvent: false });
          }
        }
      }
    );
  }
}
