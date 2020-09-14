import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  IFiscalcondition,
  ICrudIncome,
  FiscalConditionService,
  CrudIncomeService,
  IAccount,
  IPolicy,
  QuotingService,
  IVehicle
} from '@sura-platform/features';
import { Observable, of, combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FlowRouteEmissionService } from '../../../quoting/components/emission/services/flow-route-emission.service';
import * as fromPolicy from '../../../quoting/state/policy';
import * as fromPolicyActions from '../../../quoting/state/policy/policy.actions';
import * as fromEmission from '../../../quoting/components/emission/state';
import * as fromEmissionActions from '../../../quoting/components/emission/state/emission.actions';
import * as fromQuote from '../../../quoting/components/quote/state';
import * as fromQuoteActions from '../../../quoting/components/quote/state/quote.actions';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { switchMap, first } from 'rxjs/operators';
import { SelectComponent, ModalComponent } from '@sura-platform/web';
import { IPackage } from '@sura-platform/features/package';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AnimationOptions } from 'ngx-lottie';
import { PolicyAdapter } from '../../../quoting/adapters/policy.adapter';
import { IPremium } from '@sura-platform/features/package/interfaces/premium.interface';

@Component({
  selector: 'sxf-client-tax-condition',
  templateUrl: './client-tax-condition.component.html',
  styleUrls: ['./client-tax-condition.component.scss']
})
export class ClientTaxConditionComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  constructor(
    private fb: FormBuilder,
    private fiscalService: FiscalConditionService,
    private iibbService: CrudIncomeService,
    private storePolicy: Store<fromPolicy.State>,
    private flowRouteEmissionService: FlowRouteEmissionService,
    private storeEmission: Store<fromEmission.State>,
    private quotingService: QuotingService,
    private storeQuote: Store<fromQuote.State>,
    private policyAdapter: PolicyAdapter
  ) {}

  @ViewChild('fiscalcondition')
  fiscalConditionSelect: SelectComponent = <SelectComponent>{};
  @ViewChild('iibb') iibbSelect: SelectComponent = <SelectComponent>{};

  @ViewChild('modalFiscal') modalFiscal: ModalComponent = <ModalComponent>{};

  @ViewChild('newCosts') modalNewCosts: ModalComponent = <ModalComponent>{};

  /**
   * Object any for pupulate the store
   */
  currentMotor: IVehicle = <IVehicle>{};

  formClienTax: FormGroup = <FormGroup>{};

  /**
   * Variable Fiscal condition for get data from api
   */
  fiscalConditions$: Observable<IFiscalcondition[]> = new Observable();
  /**
   * Variable Crud income for get data from api
   */
  iibb$: Observable<ICrudIncome[]> = new Observable();

  routes: IRoutes[] = <IRoutes[]>[];

  currentPackageSelected: any;

  client: IAccount = <IAccount>{};

  /**
   * variable to get policy from store
   */
  currentPolicy: IPolicy = <IPolicy>{};

  packageSelected: IPackage = <IPackage>{};

  arrayFiscalCondition: IFiscalcondition[] = <IFiscalcondition[]>[];
  clientData: IAccount = <IAccount>{};
  firstTimeFiscalCondition = false;

  date: any;
  maxDate: NgbDateStruct = <NgbDateStruct>{};
  minDate: NgbDateStruct = <NgbDateStruct>{};
  showCertified = false;
  showIIBB = false;
  showiibbNumber = false;
  loadingCosts = false;
  vehicles: IVehicle[] = <IVehicle[]>{};
  firstTimeFiscalConditionChangeValue = false;
  newQuote = '';
  CONSUMIDOR_FINAL = 'consumidorFinal';
  NORESPONSABLE = 'noResponsable';
  arrCondFiscalOriginal: any[] = [];

  disabledByRetrieve$: Subscription = new Subscription();
  disabledByRetrieve = false;

  ngOnInit() {
    this.newQuote = '0';
    const currentTime = new Date(Date.now());
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();

    this.date = {
      day: day,
      month: month,
      year: year
    };
    this.firstTimeFiscalCondition = false;
    this.firstTimeFiscalConditionChangeValue = false;
    this.loadingCosts = false;
    this.showIIBB = false;
    this.showCertified = false;
    this.showiibbNumber = true;

    this.minDate = this.date;

    this.maxDate = {
      day: this.date.day,
      month: month,
      year: year + 10
    };

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .subscribe((data) => {
        this.vehicles = data[0].motor.vehicles;
        this.currentMotor = data[0].motor.vehicles.filter(
          (c) => c.number === data[1].activeMotor
        )[0];
        this.currentPolicy = data[0];
      })
      .unsubscribe();

    this.formClienTax = this.fb.group({
      fiscalcondition: [
        this.currentPolicy.fiscalcondition,
        Validators.required
      ],
      iibb: [this.currentPolicy.iibb.type],
      iibbNumber: [this.currentPolicy.iibb.number],
      beginningValidity: [this.date],
      endingValidity: []
    });

    this.iibb$ = this.iibbService.getAllCrudIncome();

    this.storeEmission.select(fromEmission.getRoutes).subscribe((data) => {
      this.routes = data;
    });

    // Si el cliente es existente maximo puedo mostrar 2 opciones

    this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((data) => {
        const isLegalPerson = data.client.type === 'Company';
        this.fiscalConditions$ = this.fiscalService
          .getAllFiscalCondition()
          .pipe(
            switchMap((xa) => {
              this.arrayFiscalCondition = xa;

              let itemsFiscalConditionMandatory = this.CONSUMIDOR_FINAL;
              if (isLegalPerson) {
                itemsFiscalConditionMandatory = this.NORESPONSABLE;
              }

              let itemsFiscalCondition = [itemsFiscalConditionMandatory];
              //si la condicion fiscal informada es diferente a la del cliente
              if (
                data.client.fiscalcondition !== itemsFiscalConditionMandatory
              ) {
                itemsFiscalCondition.push(<string>data.client.fiscalcondition);
              }

              let arrayConditionFiscal = [];

              if (this.arrCondFiscalOriginal.length) {
                itemsFiscalCondition = <string[]>this.arrCondFiscalOriginal;
              }

              //es cliente nuevo
              if (data.client.contactid === null) {
                let noCode = this.CONSUMIDOR_FINAL;
                if (!isLegalPerson) {
                  noCode = this.NORESPONSABLE;
                }
                arrayConditionFiscal = xa.filter((afc) => afc.code !== noCode);
              } else {
                arrayConditionFiscal = xa.filter((afc) =>
                  itemsFiscalCondition.includes(afc.code)
                );
              }

              if (
                data.client.fiscalcondition !== data.fiscalcondition &&
                !this.firstTimeFiscalCondition &&
                data.client.contactid !== null
              ) {
                this.modalFiscal.openModal();
              }

              let options = { emitEvent: false, onlySelf: true };
              if (!this.firstTimeFiscalCondition) {
                this.firstTimeFiscalCondition = true;
                options = { emitEvent: true, onlySelf: true };
                this.activateCertifiedDates(data.client.fiscalcondition);
                this.activateIIBB(data.client.fiscalcondition);
                if (
                  data.client.iibb &&
                  data.client.iibb.type &&
                  data.client.iibb.type !== null
                )
                  this.activateIIBBnumber(data.client.iibb.type);

                this.arrCondFiscalOriginal = itemsFiscalCondition;
              }

              let fiscalConditionForm = data.client.fiscalcondition;
              let iibbType = data.client.iibb?.type;

              // caso en el que elijan una condicion fiscal que no corresponde con el tipo de persona
              if (
                arrayConditionFiscal.filter(
                  (acf) => acf.code === data.client.fiscalcondition
                ).length === 0 &&
                data.client.contactid === null
              ) {
                if (isLegalPerson) {
                  fiscalConditionForm = this.NORESPONSABLE;
                  iibbType = iibbType || 'noInscripto';
                } else {
                  fiscalConditionForm = this.CONSUMIDOR_FINAL;
                }
                this.modalFiscal.openModal();
              }

              this.formClienTax.patchValue(
                {
                  fiscalcondition: fiscalConditionForm,
                  iibb: iibbType,
                  iibbNumber: data.client.iibb ? data.client.iibb.number : ''
                },
                options
              );

              return of(arrayConditionFiscal);
            })
          );
      })
      .unsubscribe();

    this.formClienTax
      .get('beginningValidity')
      ?.valueChanges.subscribe((dateInit) => {
        this.date = dateInit;
        this.maxDate = {
          day: this.date.day,
          month: this.date.month,
          year: this.date.year + 5
        };
      });

    this.formClienTax.get('iibb')?.valueChanges.subscribe((iibb) => {
      this.activateIIBBnumber(iibb);
      this.updateCrudIncomeType(iibb);
    });

    this.formClienTax.get('fiscalcondition')?.valueChanges.subscribe((data) => {
      let item = this.fiscalConditionSelect.getValue();
      if (item === undefined) {
        const fiscalTemp = this.arrayFiscalCondition.filter(
          (afc) => afc.code === data
        )[0];
        item = fiscalTemp;
      }

      this.activateCertifiedDates(data);
      this.activateIIBB(data);
      this.updateConditionFiscal(item);

      //FIXME: mejorar esto.. tengo que recotizar cada vez que ocurre un valuechange, pero no el 1ero..
      //FIXME: porque el 1ero verifica si condiciones fiscales de cliente y cotizacion coinciden o no
      if (!this.firstTimeFiscalConditionChangeValue) {
        this.firstTimeFiscalConditionChangeValue = true;
      } else {
        this.callCost();
      }
    });

    combineLatest([
      this.storeEmission.select(fromEmission.getEmission),
      this.storePolicy.select(fromPolicy.getFiscalCondition)
    ]).subscribe((x) => {
      const job = x[0].jobNumberFromQuotes;
      const approved = x[0].approvedEmission;
      const fiscalCondition = x[1];

      this.disabledByRetrieve =
        job && approved && fiscalCondition ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.disabledByRetrieve$) this.disabledByRetrieve$.unsubscribe();
  }

  activateCertifiedDates(data: any) {
    if (data === 'inscriptoExentoPercepcion') {
      //inscriptoExentoPercepcion
      this.showCertified = true;
      this.formClienTax
        .get('beginningValidity')
        ?.setValidators(Validators.required);
      this.formClienTax
        .get('endingValidity')
        ?.setValidators(Validators.required);

      if (
        this.currentPolicy.client.certificate &&
        this.currentPolicy.client.certificate.start !== null
      ) {
        const _dateInitFromStore = this.currentPolicy.client.certificate.start.toString();
        const _dateInit = {
          year: parseInt(_dateInitFromStore.substring(0, 4), 0),
          month: parseInt(_dateInitFromStore.substring(5, 7), 0),
          day: parseInt(_dateInitFromStore.substring(8, 10), 0)
        };
        const _dateEndFromStore = this.currentPolicy?.client?.certificate?.end?.toString();
        const _dateEnd = {
          year: parseInt(<string>_dateEndFromStore?.substring(0, 4), 0),
          month: parseInt(<string>_dateEndFromStore?.substring(5, 7), 0),
          day: parseInt(<string>_dateEndFromStore?.substring(8, 10), 0)
        };
        this.formClienTax.patchValue(
          {
            beginningValidity: _dateInit,
            endingValidity: _dateEnd
          },
          { emitEvent: false, onlySelf: true }
        );
      }
    } else {
      this.showCertified = false;
      this.formClienTax.get('beginningValidity')?.clearValidators();
      this.formClienTax.get('beginningValidity')?.updateValueAndValidity();
      this.formClienTax.get('endingValidity')?.clearValidators();
      this.formClienTax.get('endingValidity')?.updateValueAndValidity();
    }
  }

  activateIIBB(data: any) {
    if (data !== this.CONSUMIDOR_FINAL) {
      //inscriptoExentoPercepcion
      this.showIIBB = true;
      this.formClienTax.get('iibb')?.setValidators(Validators.required);
      this.activateIIBBnumber(
        this.currentPolicy.client.iibb && this.currentPolicy.client.iibb.type
          ? this.currentPolicy.client.iibb.type
          : ''
      );
    } else {
      this.showIIBB = false;
      this.formClienTax.get('iibb')?.clearValidators();
      this.formClienTax.get('iibb')?.updateValueAndValidity();
      this.activateIIBBnumber('');
    }
  }

  activateIIBBnumber(data: any) {
    if (
      data === 'inscriptoConvenioMultilateral' ||
      data === 'inscriptoConvenioLocal'
    ) {
      //inscriptoExentoPercepcion
      this.showiibbNumber = true;
      this.formClienTax.get('iibbNumber')?.setValidators(Validators.required);
    } else {
      this.showiibbNumber = false;
      this.formClienTax.get('iibbNumber')?.clearValidators();
      this.formClienTax.get('iibbNumber')?.updateValueAndValidity();
    }
  }

  updateConditionFiscal(fiscalCondition: any) {
    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentFiscalConditionAction(
        fiscalCondition.code
      )
    );
  }

  updateCrudIncomeType(type: string) {
    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentCrudIncomeTypeAction(type)
    );
  }

  continue() {
    const iibbSavedContinue = this.formClienTax.get('iibb')?.value;
    const iibbNumberSavedContinue = this.formClienTax.get('iibbNumber')?.value;
    const conditionFiscalSavedContinue = this.currentPolicy.fiscalcondition;

    if (conditionFiscalSavedContinue === 'inscriptoExentoPercepcion') {
      const dateInit = this.formClienTax.get('beginningValidity')?.value;
      const dateEnd = this.formClienTax.get('endingValidity')?.value;

      let isoDatebeginningValidity =
        dateInit.year + '-' + dateInit.month + '-' + dateInit.day;
      isoDatebeginningValidity = new Date(
        isoDatebeginningValidity
      ).toISOString();

      let isoDateendingValidity =
        dateEnd.year + '-' + dateEnd.month + '-' + dateEnd.day;
      isoDateendingValidity = new Date(isoDateendingValidity).toISOString();

      const certificate = {
        start: isoDatebeginningValidity,
        end: isoDateendingValidity
      };
      this.storePolicy.dispatch(
        new fromPolicyActions.SetCertificateAction(certificate)
      );
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentCrudIncomeTypeAction(iibbSavedContinue)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentCrudIncomeNumberAction(
        iibbNumberSavedContinue
      )
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentCrudIncomeClientAndInsuredAction({
        code: iibbSavedContinue,
        description: '',
        type: iibbSavedContinue,
        number: iibbNumberSavedContinue
      })
    );

    // const fiscalConditionDescription = this.currentPolicy.fiscalconditionDesc;

    //si es cliente nuevo, entonces le seteo por defecto la condicion fiscal
    if (this.currentPolicy.client.contactid === null) {
      this.storePolicy.dispatch(
        new fromPolicyActions.SetCurrentFiscalConditionClientAndInsuredAction(
          this.currentPolicy.fiscalcondition
        )
      );
    }

    this.flowRouteEmissionService.enableRoute(this.routes, 'validity');

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('validity')
    );

    let iibbDescription = '';
    if (this.showIIBB) {
      iibbDescription = this.iibbSelect.getValue().description;
    }

    this.routes.forEach((element) => {
      if (element.path === 'tax-condition') {
        element.value =
          this.arrayFiscalCondition.filter(
            (f) => f.code === this.formClienTax.get('fiscalcondition')?.value
          )[0].description +
          ' ' +
          iibbDescription;
      }
    });

    if (this.formClienTax.valid) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetFormEmissionValidityIsValidAction(true)
      );
    }

    this.flowRouteEmissionService.enableRoute(this.routes, 'validity');
  }

  closeModal() {
    this.modalFiscal.closeModal();
    this.callCost();
  }

  closeModalNewCosts() {
    this.modalNewCosts.closeModal();
  }

  onEnter() {
    if (this.formClienTax.valid) {
      this.continue();
    }
  }

  callCost() {
    this.loadingCosts = true;
    this.modalNewCosts.openModal();

    this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(
        first(),
        switchMap((policy) => {
          const adapted = this.policyAdapter.adapt(policy);

          adapted.motor.vehicles?.forEach((v) => {
            v.packages = <IPackage[]>v?.packages?.filter((p) => p.selected);
          });

          return this.quotingService.getCosts(adapted);
        })
      )
      .subscribe((newCosts) => {
        // Solo guardaré en costs la cotización del vehículo actual
        const packageSelected = this.currentMotor?.packages?.find(
          (p) => p.selected
        );

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateCostsAction(
            newCosts.costs?.filter((c: any) =>
              c.externalId
                .split('&')
                .includes(
                  `${this.currentPolicy.productcode},${this.currentMotor.number},${packageSelected?.code}`
                )
            )
          )
        );

        this.vehicles.forEach((v) => {
          // Actualizar premiums con el resultado de la nueva cotización
          const selected = v?.packages?.find((p) => p.selected);

          // Buscar error en motor.errors de este vehículo y paquete
          const error = newCosts.motor.errors?.find((e: any) =>
            e.externalId
              .split('&')
              .includes(
                `${this.currentPolicy.productcode},${v.number},${selected?.code}`
              )
          );

          // Busco los datos del paquete con la nueva cotización si existiera
          const newPackage = newCosts.motor.vehicles
            ?.find((costVehicle: any) => costVehicle.number === v.number)
            ?.packages.find((p: any) => p.code === selected?.code);

          if (!error?.code) {
            if (selected) {
              selected.premiums = newPackage?.premiums;
            }
            this.newQuote = newCosts.costs
              ?.find((c: any) =>
                c.externalId
                  .split('&')
                  .includes(
                    `${this.currentPolicy.productcode},${v.number},${selected?.code}`
                  )
              )
              .invoice.toString();
            this.newQuote = <string>this.newQuote
              ? parseFloat(this.newQuote).toFixed(2)
              : '';
          } else {
            if (selected) {
              selected.premiums = <IPremium>{};
            }
            this.newQuote = '';
          }
        });

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(this.vehicles)
        );

        this.storeQuote.dispatch(
          new fromQuoteActions.SetCostsResponseAction(newCosts)
        );

        this.loadingCosts = false;
      });
  }
}
