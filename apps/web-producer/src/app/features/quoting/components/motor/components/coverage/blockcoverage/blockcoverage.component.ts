import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseComponent } from '@sura-platform/core';
import { ModalComponent } from '@sura-platform/web';
import {
  IVehicle,
  IPolicy,
  VehicleGroup,
  ICost,
  IPackage,
  IMotorError
} from '@sura-platform/features';
import { IOption, ITerm, ICoverage } from '@sura-platform/features/coverage';

import { Observable, combineLatest, of, Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../../state/policy/';
import * as fromPolicyActions from '../../../../../state/policy/policy.actions';
import * as fromQuote from '../../../../quote/state';
import * as fromQuoteActions from '../../../../quote/state/quote.actions';

import cloneDeep from 'lodash/cloneDeep';
import { __importStar } from 'tslib';
import { AdditionalComponent } from '../additional/additional.component';
import { AnimationOptions } from 'ngx-lottie';
import { BACKEND_ERRORS } from '@sura-platform/core/error/error.enum';

@Component({
  selector: 'sxf-blockcoverage',
  templateUrl: 'blockcoverage.component.html',
  styleUrls: ['blockcoverage.component.scss']
})
export class BlockCoverageComponent extends BaseComponent
  implements OnInit, OnDestroy {
  @ViewChild(ModalComponent) child_component: ModalComponent = <
    ModalComponent
  >{};

  @ViewChild(AdditionalComponent)
  childAdditional: AdditionalComponent = <AdditionalComponent>{};

  @ViewChild('assistanceCombo') assistanceCombo: ElementRef = <ElementRef>{};

  @Output() control = new EventEmitter();

  @Output() assistanceIsChanging = new EventEmitter();

  assistance = new FormControl('');
  /**
   * Input of cover with costs
   */
  @Input() public packageValue: IPackage = <IPackage>{};

  /**
   * Input of cover to render
   */
  @Input() public package: any;

  @Input() public name: any;

  /**
   * boolean for show o hide more features
   */
  @Input() public morefeatures = false;

  @Input() public currentGroup = '';

  @Input() public initValues = '';

  @Input() loadingCost = false;

  /**
   * Output for fire coverage selected
   */
  @Output() selectedCoverage: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output for fire coverage to compare
   */
  @Output() compareCoverage: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output for fire assitance selected
   */
  @Output() eventAssitance: EventEmitter<any> = new EventEmitter<any>();

  /**
   * List of coverages
   */
  // listCoverage: { code: number; name: string; cover: number }[];
  listCoverage: ICoverage[] = <ICoverage[]>{};

  /**
   * Limit qty to show
   */
  limit = 0;

  /**
   * variable to get policy from store
   */
  currentPolicyCopy: IPolicy = <IPolicy>{};

  //TODO: DG: debo cambiar el tipo a cobertura.
  currentCoverage: any;

  /**
   * Array aditionals/accessories
   */
  listAditionalAccessories$: Observable<any> = new Observable();

  /**
   * Array of assistances
   */
  arrAssistance: IOption[] = <IOption[]>{};

  /**
   * Assistance selected
   */
  assistanceSelected: IOption = <IOption>{};

  /**
   * variable for formgroup
   */
  form: FormGroup = <FormGroup>{};

  /**
   * variable to show all data of packages
   */
  dataPackage: any;

  /**
   * Save price of costs.total/quotes
   */
  resultTerm = '';

  /**
   * Array to save additional or accesories selected in this package
   */
  // arrAdditionalAccessoriesAdded: any = [];

  @Input() public listFeature: any;

  /**
   * Output for add other coverage to compare
   */
  @Output() addNewCoverage: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Coverage selected for save in the Store
   */
  currentSelected: IPackage = <IPackage>{};

  /**
   * To get currentMotor from Store
   */
  currentMotor: IVehicle = <IVehicle>{};

  /**
   * variable to get policy from store
   */
  currentPolicy: IPolicy = <IPolicy>{};

  currentTerm: ITerm = <ITerm>{};

  currentPackageSelected: any;

  @Output() allowCost = new EventEmitter(false);

  /**
   * Get input with data about coverages.json, this is for titles of coverages customizables
   */
  @Input() public confPck: any;

  /**
   * The title of the package
   */
  @Input() public title = '';

  @Output() openModalAdditional: EventEmitter<any> = new EventEmitter<any>();

  mechanicalAssists$: Observable<IOption[]> = new Observable();
  additionalAccesories$: Observable<any> = new Observable();
  additionalAccesories: any;
  vehicles: IVehicle[] = <IVehicle[]>{};
  currentPackageAdditionals: IVehicle[] = <IVehicle[]>{};
  installments$: Observable<number> = new Observable();

  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/inside-inputs-loader.json'
  };

  itemGroup = {
    RC: 'Resp Civil',
    BASIC: 'Totales',
    TC: 'Terceros Completos',
    TR: 'Todo Riesgo'
  };

  /**
   * Flag used to enable or disable additional
   * button
   *
   * @type {boolean}
   * @memberof BlockCoverageComponent
   */
  withAdditional = false;

  initialSubscription: Subscription = new Subscription();
  quoteAdditionalsSubscription: Subscription = new Subscription();
  policyDataSubscription: Subscription = new Subscription();
  assistanceInputSubscription: Subscription = new Subscription();
  costsResponseSubscription: Subscription = new Subscription();

  currentCost: ICost = <ICost>{};

  currentMotorError: IMotorError = <IMotorError>{};

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>
  ) {
    super();
  }

  ngOnInit(): void {
    this.additionalAccesories$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap(([policy, quote]) => {
        if (
          policy.motor.vehicles.filter(
            (p) => p.number === quote.activeMotor
          )[0] &&
          (!policy.motor.vehicles.filter(
            (p) => p.number === quote.activeMotor
          )[0].added ||
            !policy.motor.vehicles.filter(
              (p) => p.number === quote.activeMotor
            )[0].packages)
        ) {
          return of(null);
        }

        if (
          policy.motor.vehicles.filter(
            (p) => p.number === quote.activeMotor
          )[0] &&
          policy.motor.vehicles.filter((p) => p.number === quote.activeMotor)[0]
            .packages &&
          policy?.motor?.vehicles
            ?.filter((p) => p.number === quote.activeMotor)[0]
            ?.packages?.filter((pk) => pk.code === this.packageValue.code)[0]
            ?.coverages !== undefined &&
          policy?.motor?.vehicles
            ?.filter((p) => p.number === quote.activeMotor)[0]
            ?.packages?.filter((pk) => pk.code === this.packageValue.code)[0]
            ?.coverages !== null
        ) {
          const additionalOrAccesories = policy?.motor?.vehicles
            ?.filter((p) => p.number === quote.activeMotor)[0]
            ?.packages?.filter((pk) => pk.code === this.packageValue.code)[0]
            ?.coverages?.filter((cov) => {
              const excludedCoverages = [
                'SURA_CA7_ClausulaDeAjusteCov',
                'SURA_CA7_AsistenciaMecanicaCov',
                'SURA_CA7_MobilityTheftDamageCov',
                'SURA_CA7_MobilityDeathCov',
                'SURA_CA7_MobilityIncapacityCov',
                'SURA_CA7_MobilityBoneFractureCov',
                'SURA_CA7_MobilityInterIncomeCov',
                'SURA_CA7_MobilityDamageToThirdCov',
                'SURA_CA7_MobilityTheftPersonalEffectsCov',
                'SURA_CA7_MobilityTheftPersonalDocCov',
                'SURA_CA7_MobilityTheftElectronicEquipCov'
              ];
              const excludedCategories = [
                'SURA_CA7_CobMandatoriaGrp',
                'SURA_CA7_BeneficiosGrp'
              ];

              return (
                !excludedCoverages.includes(cov.pattern.code) &&
                !excludedCategories.includes(<string>cov['category']?.code)
              );
            });

          if (
            quote?.packageAdditionals
              ?.filter((p) => p.number === quote.activeMotor)[0]
              ?.packages?.filter((pk) => pk.code === this.packageValue.code)[0]
              ?.coverages
          ) {
            const additionalQuote = quote?.packageAdditionals
              ?.filter((p) => p.number === quote.activeMotor)[0]
              ?.packages?.filter((pk) => pk.code === this.packageValue.code)[0]
              ?.coverages;

            additionalQuote?.forEach((rt) => {
              const codePattern = rt.pattern.code;
              const addi = additionalOrAccesories?.filter(
                (gh) => gh.pattern.code === codePattern
              )[0];

              if (addi === undefined && additionalOrAccesories) {
                additionalOrAccesories.push(rt);
              }
            });
          }

          return of(additionalOrAccesories);
        }
        return of(null);
      })
    );

    this.quoteAdditionalsSubscription = combineLatest(
      this.storeQuote.select(fromQuote.getQuoteAdditionals),
      this.storeQuote.select(fromQuote.getPackageSelected)
    ).subscribe((po) => {
      this.currentPackageAdditionals = <IVehicle[]>po[0];
      this.currentPackageSelected = po[1];
    });

    this.installments$ = this.storePolicy
      .select(fromPolicy.getPaymentTerm)
      .pipe(
        filter((x: any) => x),
        map((x) => x.maximumnumberofinstallments)
      );

    this.initialSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.storeQuote.select(fromQuote.getQuoteAdditionals)
    ]).subscribe((data) => {
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];
      this.vehicles = data[0].motor.vehicles;

      //esto es para saber cuantos adicionales hay agregado por paquete
      this.currentPackageAdditionals = <IVehicle[]>data[2];
      if (this.currentMotor) {
        this.checkIfVehicleCanHaveAdditional(
          <VehicleGroup>this.currentMotor.group
        );
      }
    });

    this.policyDataSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getMotorErrors)
    ]).subscribe(([data, errors]) => {
      this.currentPolicy = data;

      this.currentMotorError = <IMotorError>(
        errors?.find((error) =>
          error.externalId
            .split('&')
            .includes(
              `${this.currentPolicy.productcode},${this.currentMotor.number},${this.packageValue.code}`
            )
        )
      );

      //validacion para activar el paquete para poder ser seleccionado cuando es con UW...
      if (
        this.currentMotorError &&
        this.currentMotorError.code === BACKEND_ERRORS.UNDERWRITER
      ) {
        this.packageValue.costs = <ICost>{ ...this.packageValue.costs };
      }

      if (this.currentMotor) {
        // Find mechanical assistance by package and set value on the form control.
        const query = data?.motor?.vehicles
          ?.find((x) => x.number === this.currentMotor.number)
          ?.packages?.find((p) => p.code === this.packageValue.code);
        if (query && query.coverages !== null) {
          const assistances = query.coverages.find(
            (cov) => cov.pattern.description === 'Asistencia Mecánica'
          );
          const assistancesCopy: any = cloneDeep(assistances);
          if (!assistances) return;

          this.assistance.setValue(
            assistances.terms[0].value === undefined
              ? 'SOSBasic'
              : assistancesCopy.terms[0].value.current
              ? assistancesCopy.terms[0].value.current
              : assistancesCopy.terms[0].value,
            { emitEvent: false }
          );
        }
      }
    });

    //limite de US
    this.limit = 8;

    // FIXME: JC hasta que tenga la api de asistencias por paquete.
    let assists: any;
    if (this.packageValue.coverages !== null) {
      assists = this.packageValue.coverages.find((pkg) => {
        return pkg.pattern.description === 'Asistencia Mecánica';
      });
    }

    this.mechanicalAssists$ = this.storeQuote
      .select(fromQuote.getMechanicalAssists)
      .pipe(
        switchMap((gh) => {
          const assistsClone = cloneDeep(gh);
          let mechanicalAssist: IOption[] = [];
          if (this.currentMotor) {
            mechanicalAssist = <IOption[]>(
              assistsClone?.filter(
                (vb) => vb.number === this.currentMotor.number
              )[0]?.mechanicalAssists
            );
          }
          return of(mechanicalAssist);
        })
      );

    this.assistanceInputSubscription = this.assistance.valueChanges.subscribe(
      (data) => {
        if (assists) this.changeAssistance(data);
        this.allowCost.emit(true);
      }
    );

    this.costsResponseSubscription = combineLatest([
      this.storeQuote.select(fromQuote.getCosts),
      this.storeQuote.select(fromQuote.getMotorErrors)
    ]).subscribe(([costs, errors]) => {
      // Detectar el costo del period actual
      this.currentCost = <ICost>(
        costs?.find((cost) =>
          cost.externalId
            .split('&')
            .includes(
              `${this.currentPolicy.productcode},${this.currentMotor.number},${this.packageValue.code}`
            )
        )
      );

      // Detectar error sobre el period actual
      this.currentMotorError = <IMotorError>(
        errors?.find((error) =>
          error.externalId
            .split('&')
            .includes(
              `${this.currentPolicy.productcode},${this.currentMotor.number},${this.packageValue.code}`
            )
        )
      );
    });
  }

  ngOnDestroy() {
    if (this.initialSubscription) {
      this.initialSubscription.unsubscribe();
    }
    if (this.quoteAdditionalsSubscription) {
      this.quoteAdditionalsSubscription.unsubscribe();
    }
    if (this.policyDataSubscription) {
      this.policyDataSubscription.unsubscribe();
    }
    if (this.assistanceInputSubscription) {
      this.assistanceInputSubscription.unsubscribe();
    }
    if (this.costsResponseSubscription) {
      this.costsResponseSubscription.unsubscribe();
    }
  }

  addCoverage() {
    this.addNewCoverage.emit();
  }

  closeModal(reason: any) {
    if (reason === 'added') {
      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(
          this.currentPolicyCopy.motor.vehicles
        )
      );
      //recotizo despues de agregar o borrar adicionales/accesorios
      this.allowCost.emit(true);
    }

    this.child_component.closeModal();
  }

  openModal() {
    this.childAdditional.initGroup();
    this.child_component.openModal();
  }

  /**
   * Method to select coverage
   * @param coverage coverage clicked
   */
  changeAssistance(assistance: string) {
    const mechanicalCov = this.currentMotor?.packages
      ?.find((pkg) => pkg.code === this.packageValue.code)
      ?.coverages?.find(
        (cov) => cov.pattern.description === 'Asistencia Mecánica'
      );

    if (
      mechanicalCov &&
      mechanicalCov.terms[0] &&
      mechanicalCov.terms[0].value
    ) {
      mechanicalCov.terms[0].value.current = assistance || 'NoAssistance';
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );
  }

  coverageSelected() {
    let autoSelected = null;
    if (this.currentPackageSelected) {
      autoSelected = this.currentPackageSelected.filter(
        (hj: any) => hj.number === this.currentMotor.number
      )[0];
    }

    if (autoSelected) {
      this.currentPackageSelected = this.currentPackageSelected.map(
        (jk: any) => {
          let pckSelected = jk;
          if (jk.number === this.currentMotor.number) {
            pckSelected = {
              code: this.packageValue.code,
              number: this.currentMotor.number
            };
          }
          return pckSelected;
        }
      );
    } else if (
      this.currentPackageSelected &&
      this.currentPackageSelected.length > 0
    ) {
      this.currentPackageSelected.push({
        code: this.packageValue.code,
        number: this.currentMotor.number
      });
    } else {
      this.currentPackageSelected = [];
      this.currentPackageSelected.push({
        code: this.packageValue.code,
        number: this.currentMotor.number
      });
    }
    this.storeQuote.dispatch(
      new fromQuoteActions.SetPackageSelectedAction(this.currentPackageSelected)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateCostsAction([this.currentCost])
    );

    const _packages: IPackage[] = <IPackage[]>(
      cloneDeep(this.currentMotor.packages)
    );

    _packages.forEach((pkg) => {
      pkg.selected = pkg.code === this.packageValue.code ? true : false;
      pkg.premiums = this.packageValue.premiums;
    });

    if (this.vehicles) {
      const fndV = this.vehicles.find(
        (v) => v.number === this.currentMotor.number
      );
      if (fndV) {
        fndV.packages = _packages;
      }
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );
  }

  /**
   *
   * @param coverage coverage current selected
   * @param remove boolean to add or remove the coverage in the array of compare
   */
  manageCompare(coverage: any = null, remove: boolean = false) {
    this.compareCoverage.emit({ coverage: coverage, remove: remove });
  }

  /**
   * Match if coverage exist in the package...
   * @param pk
   */
  belongPackage(pk: any): boolean[] {
    if (this.packageValue.coveragesQuoted) {
      if (
        this.packageValue.coveragesQuoted.filter(
          (x) => x.pattern.code === pk.code
        )[0]
      ) {
        return [true, false];
      } else {
        //esto es por si es una cobertura adicional, debe marcarla como ok,
        //ademas converti en un array de boolean el return, porque asi se en el html si es adicional o no

        const pckValid = this.currentPackageAdditionals
          ?.filter((c) => c.number === this.currentMotor?.number)[0]
          ?.packages?.filter((zx) => zx.code === this.packageValue?.code)[0];

        if (pckValid !== null && pckValid !== undefined) {
          const tmpPck = this.currentPackageAdditionals
            ?.filter((c) => c.number === this.currentMotor?.number)[0]
            ?.packages?.filter((zx) => zx.code === this.packageValue?.code)[0]
            ?.coverages;

          if (
            tmpPck !== null &&
            tmpPck?.filter((gh) => gh?.pattern?.code === pk?.code).length === 1
          ) {
            return [true, true];
          }
        }
      }
      return [false, false];
    }
    return [false, false];
  }

  /**
   * Send pkg to open modal additional and accesories
   * @param pkgValue
   */
  openModalAdditionalMethod(pkgValue: any) {
    this.openModalAdditional.emit(pkgValue);
  }

  /**
   * Function used to detect if a vehicle
   * can have additional
   *
   * @param {VehicleGroup} group
   * @memberof BlockCoverageComponent
   */
  checkIfVehicleCanHaveAdditional(group: VehicleGroup): void {
    //TODO: utilizar archivo de configuración
    const acceptedVehicles: VehicleGroup[] = [
      VehicleGroup.AUTO,
      VehicleGroup.PICKUP,
      VehicleGroup.OTRO,
      VehicleGroup.CAMION
    ];

    this.withAdditional = acceptedVehicles.includes(group);
  }
}
