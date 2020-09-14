import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl
} from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {
  IHomeCoverages,
  IHouse,
  IAmounts,
  AmountsService
} from '@sura-platform/features';
import { blockTypeCoverages } from '../listcoverages.enum';
import { Store } from '@ngrx/store';
import * as fromQuote from '../../../../quote/state';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import * as fromPolicy from '../../../../../state/policy';
import { ITerm, ICoverage } from '@sura-platform/features/coverage';
import * as fromQuoteActions from '../../../../quote/state/quote.actions';
import * as fromPolicyActions from '../../../../../state/policy/policy.actions';
import { tap, debounceTime } from 'rxjs/operators';
import { HOME_CONF } from '../../../home.config';

@Component({
  selector: 'sxf-homelistcoverage',
  templateUrl: 'listcoverage.component.html',
  styleUrls: ['listcoverage.component.scss']
})
export class HomeListCoverageComponent implements OnInit, OnDestroy {
  @Input() public listItems: IHomeCoverages[] = [];

  @Output()
  msgIncendio = new EventEmitter<boolean>();

  /**
   * Emit if collapse Others block
   *
   * @memberof HomeListCoverageComponent
   */
  @Output() showOthersStatus = new EventEmitter<boolean>(false);

  /**
   * Emit if collapse Premiums block
   *
   * @memberof HomeListCoverageComponent
   */
  @Output() showPremiumsStatus = new EventEmitter<boolean>(false);

  /**
   * Emit check uncheck checkbox
   *
   * @memberof HomeListCoverageComponent
   */
  @Output() checkUncheckCoverage = new EventEmitter<any[]>(false);

  listCheckUncheckCoverage: any[] = [];

  /**
   * variable for formgroup
   */
  form: FormGroup = <FormGroup>{};

  formArrayBlockOne: FormArray = new FormArray([]);

  formArrayBlockTwo: FormArray = new FormArray([]);

  formArrayBlockThree: FormArray = new FormArray([]);

  /**
   * For use blockTypeCoverages enum on template
   *
   * @memberof HomeListCoverageComponent
   */
  blkTypeCoverages = blockTypeCoverages;

  /**
   * True show Others Coverages items
   * False not show Others Coverages items
   *
   * @memberof HomeListCoverageComponent
   */
  showOthersCoveragesValue = false;

  /**
   * True show Premiums Coverage items
   * False not show Premiums Coverage items
   *
   * @memberof HomeListCoverageComponent
   */
  showPremiumsCoveragesValue = false;

  /**
   * Configure mask to textinput money
   *
   * @type {*}
   * @memberof HomeListCoverageComponent
   */
  moneyMask: any;

  controlMedic: any;

  quoteHomeSubscription: Subscription = new Subscription();

  /**
   * Current house number
   */
  currentHome: number | null = 0;

  /**
   * All houses
   */
  houses: IHouse[] = <IHouse[]>{};

  /**
   * All houses default by check and no check
   */
  housesDefault: IHouse[] = <IHouse[]>{};

  /**
   * Current House of houses vector
   */
  currentHouse: IHouse = <IHouse>{};

  /**
   * Current currentHouseDefaultValues of houses vector in quote
   */
  currentHouseDefaultValues: IHouse = <IHouse>{};

  callCosts$ = new BehaviorSubject<boolean>(false);

  callCostsSubscription: Subscription = new Subscription();

  @Output() allowCost = new EventEmitter(false);

  homeAssistance: ICoverage = <ICoverage>{};

  _loadingAdditional: boolean | undefined = undefined;

  _isAllLoad: boolean | undefined = undefined;

  allSums: IAmounts = <IAmounts>{};

  sumSuggestSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private amountService: AmountsService
  ) {}

  @Input()
  public set loadingAdditionals(loadingAdditionals: boolean) {
    this._loadingAdditional = loadingAdditionals;
    if (!loadingAdditionals && this.isAllLoad) {
      //al estar todos los formarray creados
      //reviso los checks, para llamada a costs
      this.callCosts$.next(true);
    }
  }

  public get loadingAdditionals(): boolean {
    return <boolean>this._loadingAdditional;
  }

  @Input()
  public set isAllLoad(isAllLoad: boolean) {
    this._isAllLoad = isAllLoad;
    if (isAllLoad && !this.loadingAdditionals) {
      //al estar todos los formarray creados
      //reviso los checks, para llamada a costs
      this.callCosts$.next(true);
    }
  }

  public get isAllLoad(): boolean {
    return <boolean>this._isAllLoad;
  }

  ngOnInit() {
    this.moneyMask = createNumberMask({
      prefix: '$ ',
      thousandsSeparatorSymbol: '.'
    });
    this.formArrayBlockOne = this.fb.array([], [Validators.required]);
    this.formArrayBlockTwo = this.fb.array([], [Validators.required]);
    this.formArrayBlockThree = this.fb.array([], [Validators.required]);

    this.form = new FormGroup({
      coveragesBenefits: this.formArrayBlockOne,
      coveragesOthers: this.formArrayBlockTwo,
      coveragesPremiums: this.formArrayBlockThree
    });

    this.sumSuggestSubscription = this.storeQuote
      .select(fromQuote.getsuggestedSums)
      .pipe(
        tap((data: any) => {
          this.allSums = data;
          if (data && this.coveragesBenefits.value.length === 0) {
            this.createFormArray(this.listItems);
          } else {
            //actualizo datos min y max
            this.setMinMax();
          }
        })
      )
      .subscribe();

    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeData),
      this.storeQuote.select(fromPolicy.getHouses),
      this.storePolicy.select(fromQuote.getCoverageDefault),
      this.storePolicy.select(fromQuote.getHomeAssistance)
    ]).subscribe(([homeData, houses, housesDefault, assistance]) => {
      this.currentHome = homeData.activeHome;
      this.housesDefault = <IHouse[]>housesDefault;
      this.houses = houses;
      this.homeAssistance = <ICoverage>assistance;
      this.currentHouse = <IHouse>(
        this.houses.find((h) => h.id === this.currentHome)
      );
      this.currentHouseDefaultValues = <IHouse>(
        this.housesDefault.find((h) => h.id === this.currentHome)
      );
    });

    this.callCostsSubscription = this.callCosts$
      .pipe(
        debounceTime(1000),
        //distinctUntilChanged(),
        tap((val) => {
          if (val) {
            this.setChecksValuesInStore();
          }
        })
      )
      .subscribe((val) => {
        if (val) {
          this.allowCost.emit(true);
        }
      });
  }

  setMinMax() {
    const controlBenefits = this.form.get('coveragesBenefits') as FormArray;
    const controlOthers = this.form.get('coveragesOthers') as FormArray;
    const controlPremium = this.form.get('coveragesPremiums') as FormArray;
    this.listItems.forEach((lt) => {
      let controlTemp = controlBenefits?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );
      this.setValueControl(controlTemp, lt);

      controlTemp = controlOthers?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );
      this.setValueControl(controlTemp, lt);

      controlTemp = controlPremium?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );
      this.setValueControl(controlTemp, lt);
    });
  }

  setValueControl(controlTemp: any, lt: any) {
    if (controlTemp) {
      const showMinMax =
        lt.terms[0].value.min === null && lt.terms[0].value.max === null
          ? false
          : true;

      // Según US 8316 si la suma sugerida es menor al min entonces debe ser min
      // si la suma sugerida es mayor a max entonces debe ser max
      const suggestedSum = this.suggestedToMinOrMax(
        controlTemp.get('suggested').value,
        lt.terms[0].value.min,
        lt.terms[0].value.max,
        showMinMax
      );

      controlTemp.get('min').setValue(lt.terms[0].value.min);
      controlTemp.get('max').setValue(lt.terms[0].value.max);
      controlTemp.get('showMinMax').setValue(showMinMax);
      controlTemp
        .get('suggested')
        .setValue(suggestedSum, { onlySelf: true, emitEvent: false });

      if (showMinMax) {
        controlTemp
          ?.get('suggested')
          ?.setValidators([
            Validators.min(lt.terms[0].value.min),
            Validators.max(lt.terms[0].value.max),
            Validators.pattern(/^((?!(0))[0-9].*)$/),
            Validators.required
          ]);
      } else {
        controlTemp
          ?.get('suggested')
          ?.setValidators([
            Validators.pattern(/^((?!(0))[0-9].*)$/),
            Validators.required
          ]);
      }
      controlTemp?.get('suggested')?.updateValueAndValidity();
    }
  }

  get coveragesBenefits(): FormArray {
    return this.form.get('coveragesBenefits') as FormArray;
  }

  get coveragesOthers(): FormArray {
    return this.form.get('coveragesOthers') as FormArray;
  }

  get coveragesPremiums(): FormArray {
    return this.form.get('coveragesPremiums') as FormArray;
  }

  fillArrayCoverage(dataCoverage: any, active: boolean) {
    return {
      chk: active,
      code: dataCoverage.pattern.code,
      description: dataCoverage.pattern.description,
      suggested: dataCoverage.terms[0].value.suggested,
      categoryBlock: dataCoverage.category.block,
      categoryCode: dataCoverage.category.code,
      visible: dataCoverage.category.visible,
      editable: dataCoverage.category.editable,
      inherit: dataCoverage.inherit,
      child: dataCoverage.inherit ? dataCoverage.child : null,
      min: dataCoverage.terms[0].value.min
        ? dataCoverage.terms[0].value.min
        : null,
      max: dataCoverage.terms[0].value.max
        ? dataCoverage.terms[0].value.max
        : null
    };
  }

  createFormArray(listSum: IHomeCoverages[]) {
    const listCoverageBenefits: any = [];
    const listCoverageOthers: any = [];
    const listCoveragePremiums: any = [];
    this.formArrayBlockOne.clear();
    this.formArrayBlockTwo.clear();
    this.formArrayBlockThree.clear();
    listSum.forEach((ls) => {
      if (ls.category.block === blockTypeCoverages.BENEFITS) {
        //true, quiere decir que por default
        //estaran activas todas estas coberturas
        listCoverageBenefits.push(this.fillArrayCoverage(ls, true));
      } else if (ls.category.block === blockTypeCoverages.PREMIUM) {
        listCoveragePremiums.push(this.fillArrayCoverage(ls, true));
      } else {
        listCoverageOthers.push(this.fillArrayCoverage(ls, false));
      }
    });
    this.createFormGroupCoverages(
      listCoverageBenefits,
      listCoverageOthers,
      listCoveragePremiums
    );
  }

  createFormGroupCoverages(
    listSumBenefits: IHomeCoverages[],
    listSumOthers: IHomeCoverages[],
    listSumPremums: IHomeCoverages[]
  ) {
    listSumBenefits.map((item: IHomeCoverages) => {
      this.formArrayBlockOne.push(this.createForms(item));
    });

    listSumOthers.map((item: IHomeCoverages) => {
      this.formArrayBlockTwo.push(this.createForms(item));
    });

    //desactivando gastos medicos por defecto segun US7912
    const controlOthers = this.form.get('coveragesOthers') as FormArray;
    this.controlMedic = controlOthers?.at(
      this.form
        ?.get('coveragesOthers')
        ?.value.findIndex((fi: any) => fi.code === 'SURA_HOE_GastosMedicosCov')
    );

    this.controlMedic.disable();

    listSumPremums.map((item: IHomeCoverages) => {
      this.formArrayBlockThree.push(this.createForms(item));
    });
  }

  createForms(coverage: any): FormGroup {
    const formGroup: FormGroup = new FormGroup({
      chk: new FormControl(coverage.chk),
      code: new FormControl(coverage.code),
      description: new FormControl(coverage.description),
      suggested: new FormControl(coverage.suggested),
      categoryBlock: new FormControl(coverage.categoryBlock),
      categoryCode: new FormControl(coverage.categoryCode),
      editable: new FormControl(coverage.editable),
      visible: new FormControl(coverage.visible),
      inherit: new FormControl(coverage.inherit),
      child: new FormControl(coverage.child),
      min: new FormControl(coverage.min),
      max: new FormControl(coverage.max),
      // Se coloca true por defecto ya que en la primera carga no vienen valores de min y max
      // de esta manera se muestran min y max en 0 hasta que se carguen los valores desde
      // additionals
      showMinMax: new FormControl(true)
    });
    return formGroup;
  }

  showOthersCoverages() {
    this.showOthersCoveragesValue = !this.showOthersCoveragesValue;
    this.showOthersStatus.emit(this.showOthersCoveragesValue);
  }

  showPremiumsCoverages() {
    this.showPremiumsCoveragesValue = !this.showPremiumsCoveragesValue;
    this.showPremiumsStatus.emit(this.showPremiumsCoveragesValue);
  }

  checkIncendio() {
    //validacion de US-7912
    const chkIE = this.form.value.coveragesBenefits.find(
      (ic: any) => ic.code === 'SURA_HOE_IncendioEdiCov'
    );
    const chkIC = this.form.value.coveragesBenefits.find(
      (ic: any) => ic.code === 'SURA_HOE_IncendioConPRCov'
    );
    !chkIE.chk && !chkIC.chk
      ? this.msgIncendio.emit(true)
      : this.msgIncendio.emit(false);
  }

  checkGastosMedicos(control: any) {
    let activeGastosMedicos = false;
    if (
      control.value.code === 'SURA_HOE_AccidentesPerCov' ||
      control.value.code === 'SURA_HOE_AccidentesPerDCov'
    ) {
      const chkAP = this.form.value.coveragesOthers.find(
        (ic: any) => ic.code === 'SURA_HOE_AccidentesPerCov'
      );

      const chkAPD = this.form.value.coveragesOthers.find(
        (ic: any) => ic.code === 'SURA_HOE_AccidentesPerDCov'
      );

      chkAP.chk || chkAPD.chk
        ? (activeGastosMedicos = true)
        : (activeGastosMedicos = false);

      if (activeGastosMedicos) {
        this.controlMedic.get('editable').setValue(true);
        this.controlMedic.enable();
      } else {
        this.controlMedic.get('editable').setValue(false);
        this.controlMedic.get('chk').setValue(false);
        this.activeAllGastosMedicos();
        this.controlMedic.disable();
      }
    }
  }

  onClickCheckboxBenefits(event: any) {
    const control: any = (this.form.get(
      'coveragesBenefits'
    ) as FormArray).controls.find(
      (c) => c?.get('code')?.value === event.target.id
    );
    this.checkIncendio();
    this.setControlValueDefault(event.target.checked, control);

    this.setListCheckUncheckCoverage(control);
    this.callCosts$.next(true);
  }

  onClickCheckboxOthers(event: any) {
    const control: any = (this.form.get(
      'coveragesOthers'
    ) as FormArray).controls.find(
      (c) => c?.get('code')?.value === event.target.id
    );

    this.setControlValueDefault(event.target.checked, control);

    this.checkGastosMedicos(control);

    if (control.value.code === 'SURA_HOE_GastosMedicosCov') {
      this.activeAllGastosMedicos();
    }

    this.setListCheckUncheckCoverage(control);
    this.callCosts$.next(true);
  }

  activeAllGastosMedicos() {
    const chkGM = this.form.value.coveragesOthers.find(
      (ic: any) => ic.code === 'SURA_HOE_GastosMedicosCov'
    );
    if (chkGM.chk) {
      //activaron gastos medicos
      const blockCovMedico = this.listItems.find(
        (bm) => bm.pattern.code === 'SURA_HOE_GastosMedicosCov'
      );

      this.currentHouseDefaultValues?.packages?.forEach((cp) => {
        if (cp.code === 'premium' || cp.code === 'basic') {
          const covTemp = cp.coverages;
          const termsMed: ITerm[] = [];
          termsMed.push({
            code: <string>blockCovMedico?.terms[0]?.code,
            value: {
              current: <string>blockCovMedico?.terms[0]?.value?.suggested
            },
            options: null
          });
          covTemp?.push({
            pattern: {
              code: <string>blockCovMedico?.pattern?.code,
              description: <string>blockCovMedico?.pattern?.description
            },
            terms: termsMed
          });
          cp.coverages = covTemp;
        }
      });
      this.storePolicy.dispatch(
        new fromQuoteActions.SetDefaultCoverageByPckAction(this.housesDefault)
      );
    } else {
      this.currentHouseDefaultValues?.packages?.forEach((cp) => {
        const covTemp = cp?.coverages?.filter(
          (ct) => ct.pattern.code !== 'SURA_HOE_GastosMedicosCov'
        );
        if (covTemp) {
          cp.coverages = covTemp;
        }
      });
      this.storePolicy.dispatch(
        new fromQuoteActions.SetDefaultCoverageByPckAction(this.housesDefault)
      );
    }
  }

  setControlValueDefault(checked: boolean, control: AbstractControl) {
    if (checked) {
      let suggestedSum = this.listItems?.find(
        (item: any) => control?.get('code')?.value === item.pattern.code
      )?.terms[0]?.value?.suggested;

      // Según US 8316 si la suma sugerida es menor al min entonces debe ser min
      // si la suma sugerida es mayor a max entonces debe ser max
      suggestedSum = this.suggestedToMinOrMax(
        <number>(<unknown>suggestedSum),
        control?.get('min')?.value,
        control?.get('max')?.value,
        control?.get('showMinMax')?.value
      ).toString();

      control
        ?.get('suggested')
        ?.setValue(suggestedSum, { onlySelf: true, emitEvent: false });
    } else {
      control
        ?.get('suggested')
        ?.setValue('0', { onlySelf: true, emitEvent: false });
    }
  }

  setListCheckUncheckCoverage(control: AbstractControl) {
    const currentControl = this.listCheckUncheckCoverage.find(
      (ctl: any) => ctl.code === control?.get('code')?.value
    );

    if (currentControl) {
      currentControl.checked = control?.get('chk')?.value;
    } else {
      this.listCheckUncheckCoverage.push({
        code: control?.get('code')?.value,
        checked: control?.get('chk')?.value
      });
    }

    // Emite si un checkbox fue marcado/desmarcado.
    // En principio esto servirá para dar uniformidad
    // a los estilos entre listCoverages y blockCoverages
    this.checkUncheckCoverage.emit(this.listCheckUncheckCoverage);
  }

  /**
   * Setear coverage para llamada de costs
   */
  setChecksValuesInStore() {
    //limpio los coverages de cada pck
    //para poner los coverages que solo estan check = true
    this.currentHouse?.packages?.forEach((cp) => {
      cp.coverages = [];
      if (this.homeAssistance) {
        cp.coverages.push(this.homeAssistance);
      }

      //borro todos los coverages, dejo solo asistencia de hogar que siempre va
    });

    const controlBenefits = this.form.get('coveragesBenefits') as FormArray;
    const controlOthers = this.form.get('coveragesOthers') as FormArray;
    const controlPremium = this.form.get('coveragesPremiums') as FormArray;

    //itero sobre cada item..
    this.listItems.forEach((lt) => {
      let controlTemp = controlBenefits?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );

      if (controlTemp) {
        //si esta check, va a coverage de policy
        //si pertenece a los default..sino no
        this.addCoverageToCurrentHouse(controlTemp, lt);
      }

      controlTemp = controlOthers?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );

      if (controlTemp) {
        this.addCoverageToCurrentHouse(controlTemp, lt);
      }

      controlTemp = controlPremium?.controls.find(
        (control: any) => control.value.code === lt.pattern.code
      );

      if (controlTemp) {
        this.addCoverageToCurrentHouse(controlTemp, lt);
      }
    });
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );
  }

  addCoverageToCurrentHouse(controlTemp: any, lt: any) {
    this.currentHouse?.packages?.forEach((cp) => {
      const pckValueDefault = this.currentHouseDefaultValues?.packages?.find(
        (pa) => pa.code === cp.code
      )?.coverages;

      const isCov = pckValueDefault?.find(
        (cv) => cv.pattern.code === lt.pattern.code
      );
      //si esta check, y ademas la cobertura es posible
      //en este paquete se agrega
      if (isCov && controlTemp.get('chk')?.value) {
        isCov.terms[0].value.current = controlTemp.get('suggested')?.value;

        cp?.coverages?.push(isCov);

        //reviso si tiene coberturas hijas
        const searchInherit = HOME_CONF.codesInheritable.find(
          (ci) => ci.code === lt.pattern.code
        );
        if (searchInherit) {
          searchInherit.childs.forEach((sc) => {
            const covChild = this.allSums.coverages.find(
              (lc) => lc.pattern.code === sc
            );
            if (covChild) {
              const tmpTerm: ITerm[] = [];
              tmpTerm.push({
                code: covChild.terms[0].code,
                value: {
                  current: <string>covChild.terms[0].value.suggested
                },
                options: null
              });
              const covTemp: ICoverage = {
                pattern: covChild.pattern,
                terms: tmpTerm
              };
              cp?.coverages?.push(covTemp);
            }
          });
        }
      }
    });
  }

  onChangeSum(code: string) {
    const controlBenefits = (this.form.get(
      'coveragesBenefits'
    ) as FormArray).controls.find((c) => c?.get('code')?.value === code);

    const controlOthers = (this.form.get(
      'coveragesOthers'
    ) as FormArray).controls.find((c) => c?.get('code')?.value === code);

    if (
      (controlBenefits && controlBenefits.valid) ||
      (controlOthers && controlOthers.valid)
    ) {
      // si cambió el valor de Incendio Edificio a Prorrata entonces
      // se llama a amounts para obtener los recálculos para las coberturas
      // dependientes
      if (
        controlBenefits &&
        controlBenefits?.get('code')?.value === 'SURA_HOE_IncendioEdiCov'
      ) {
        this.amountService
          .getAmounts(
            this.currentHouse.type as string,
            undefined,
            this.currentHouse.zone.city as string,
            `${this.currentHouse.zone.postalcode}`,
            controlBenefits?.get('suggested')?.value
          )
          .subscribe((amounts: any) => {
            // Se sacan las sumas de amounts
            const sumIncendioProrrata = amounts.coverages.find(
              (lt: any) => lt.pattern.code === 'SURA_HOE_IncendioEdiCov'
            );
            const sumRemocionEscombros = amounts.coverages.find(
              (lt: any) => lt.pattern.code === 'SURA_HOE_RemocionEscCov'
            );
            const sumGastosHospedaje = amounts.coverages.find(
              (lt: any) => lt.pattern.code === 'SURA_HOE_GastosHosCov'
            );

            // Se sacan los items a modificar en listItems
            const ltRemocionEscombros = this.listItems.find(
              (lt: any) => lt.pattern.code === 'SURA_HOE_RemocionEscCov'
            );
            const ltGastosHospedaje = this.listItems.find(
              (lt: any) => lt.pattern.code === 'SURA_HOE_GastosHosCov'
            );

            // Se actualizan los controles e items
            controlBenefits
              ?.get('suggested')
              ?.setValue(sumIncendioProrrata.terms[0].value.suggested, {
                onlySelf: true,
                emitEvent: false
              });
            controlBenefits.get(
              'child'
            ).value[0].suggested = ltRemocionEscombros.terms[0].value.suggested =
              sumRemocionEscombros.terms[0].value.suggested;
            controlBenefits.get(
              'child'
            ).value[1].suggested = ltGastosHospedaje.terms[0].value.suggested =
              sumGastosHospedaje.terms[0].value.suggested;

            (this.form.get('coveragesOthers') as FormArray).controls
              .find((c) => c?.get('code')?.value === 'SURA_HOE_RemocionEscCov')
              ?.get('suggested')
              .setValue(sumRemocionEscombros.terms[0].value.suggested, {
                onlySelf: true,
                emitEvent: false
              });

            (this.form.get('coveragesOthers') as FormArray).controls
              .find((c) => c?.get('code')?.value === 'SURA_HOE_GastosHosCov')
              ?.get('suggested')
              .setValue(sumGastosHospedaje.terms[0].value.suggested, {
                onlySelf: true,
                emitEvent: false
              });
            this.callCosts$.next(true);
          });
      } else {
        this.callCosts$.next(true);
      }
    }
  }

  /**
   * Change suggested sum to min if less than min
   * Change suggested sum to max if greater than max
   *
   * Based on US 8316
   *
   * @param {number} suggestedSum
   * @param {number} min
   * @param {number} max
   * @param {boolean} showMinMax
   * @memberof HomeListCoverageComponent
   */
  suggestedToMinOrMax(
    suggestedSum: number,
    min: number,
    max: number,
    showMinMax: boolean
  ) {
    if (showMinMax && suggestedSum < min) {
      suggestedSum = min;
    } else if (showMinMax && suggestedSum > max) {
      suggestedSum = max;
    }

    return suggestedSum;
  }

  ngOnDestroy() {
    if (this.quoteHomeSubscription) this.quoteHomeSubscription.unsubscribe();
    if (this.callCostsSubscription) this.callCostsSubscription.unsubscribe();
    if (this.sumSuggestSubscription) this.sumSuggestSubscription.unsubscribe();
  }
}
