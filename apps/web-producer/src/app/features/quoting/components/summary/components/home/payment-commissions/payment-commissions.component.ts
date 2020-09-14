import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import {
  IPolicy,
  IFiscalcondition,
  ICrudIncome,
  IPaymentMethod,
  IPaymentPlan,
  IDiscount,
  IComission,
  FiscalConditionService,
  CrudIncomeService,
  PaymentMethodService,
  PaymentPlansService,
  DiscountService,
  ComissionService
} from '@sura-platform/features';
import { ModalComponent, IconConfig } from '@sura-platform/web';

@Component({
  selector: 'sxf-payment-commissions',
  templateUrl: './payment-commissions.component.html',
  styleUrls: ['./payment-commissions.component.scss']
})
export class PaymentCommissionsComponent implements OnInit, OnDestroy {
  @Input() policy: IPolicy = <IPolicy>{};

  @ViewChild('modalEdit') modalEdit: ModalComponent = <ModalComponent>{};

  /**
   * Form for edit payment and commissions values
   *
   * @type {FormGroup}
   * @memberof PaymentCommissionsComponent
   */
  form: FormGroup = <FormGroup>{};

  /**
   * All fiscal conditions items
   *
   * @type {Observable<IFiscalcondition>}
   * @memberof PaymentCommissionsComponent
   */
  fiscalConditionItems$: Observable<IFiscalcondition[]> = new Observable();
  /**
   * Fiscal condition from policy
   *
   * @type {IFiscalcondition}
   * @memberof PaymentCommissionsComponent
   */
  fiscalConditionPolicy: IFiscalcondition | null = <IFiscalcondition>{};

  /**
   * All iibb items
   *
   * @type {Observable<ICrudIncome[]>}
   * @memberof PaymentCommissionsComponent
   */
  iibbItems$: Observable<ICrudIncome[]> = new Observable();

  /**
   * iibb from policy
   *
   * @type {ICrudIncome}
   * @memberof PaymentCommissionsComponent
   */
  iibbPolicy: ICrudIncome | null = <ICrudIncome>{};

  /**
   * All payment method items
   *
   * @type {Observable<IPaymentMethod[]>}
   * @memberof PaymentCommissionsComponent
   */
  paymentMethodItems$: Observable<IPaymentMethod[]> = new Observable();

  /**
   * Payment method from policy
   *
   * @type {IPaymentMethod}
   * @memberof PaymentCommissionsComponent
   */
  paymentMethodPolicy: IPaymentMethod | null = <IPaymentMethod>{};

  /**
   * All quotas items
   *
   * @type {Observable<IPaymentPlan>}
   * @memberof PaymentCommissionsComponent
   */
  paymentPlanItems$: Observable<IPaymentPlan[]> = new Observable();

  /**
   * Quota from policy
   *
   * @type {IPaymentPlan}
   * @memberof PaymentCommissionsComponent
   */
  paymentPlanPolicy: IPaymentPlan | null = <IPaymentPlan>{};

  /**
   * Discount from policy
   *
   * @type {IDiscount}
   * @memberof PaymentCommissionsComponent
   */
  discountPolicy: IDiscount | null = <IDiscount>{};

  /**
   * Commission from Policy
   *
   * @type {IComission}
   * @memberof PaymentCommissionsComponent
   */
  commissionPolicy: IComission = <IComission>{};

  /**
   * Mask for percentage values
   *
   * @type {*}
   * @memberof PaymentCommissionsComponent
   */
  percentageMask: any;

  iconConfig: IconConfig = <IconConfig>{
    display: true,
    type: 'info',
    color: 'green',
    tooltip: ''
  };

  constructor(
    private fb: FormBuilder,
    private fiscalConditionService: FiscalConditionService,
    private iibbService: CrudIncomeService,
    private paymentMethodService: PaymentMethodService,
    private paymentPlansService: PaymentPlansService,
    private discountService: DiscountService,
    private commissionService: ComissionService
  ) {}

  ngOnInit() {
    this.percentageMask = createNumberMask({
      prefix: '',
      suffix: '%',
      includeThousandsSeparator: false,
      allowDecimal: false,
      allowNegative: false,
      allowLeadingZeroes: false
    });

    this.form = this.fb.group({
      fiscalCondition: [null, Validators.required],
      iibb: [null],
      paymentMethod: [null, Validators.required],
      paymentPlan: [null, Validators.required],
      campaign: [null, Validators.required],
      discount: [null, Validators.required],
      commission: [null, Validators.required]
    });

    this.fiscalConditionItems$ = this.fiscalConditionService
      .getAllFiscalCondition()
      .pipe(
        tap((fc: IFiscalcondition[]) => {
          this.fiscalConditionPolicy =
            fc.find((x) => x.code === this.policy.fiscalcondition) || null;
          this.form
            .get('fiscalCondition')
            ?.setValue(this.fiscalConditionPolicy?.code, {
              onlySelf: true,
              emitEvent: false
            });
        })
      );

    this.iibbItems$ = this.iibbService.getAllCrudIncome().pipe(
      tap((ib: ICrudIncome[]) => {
        /* Se toma excento por defecto según US 8423 */
        this.iibbPolicy = ib.find((x) => x.code === 'exentoIIBB') || null;
        this.form.get('iibb')?.setValue(this.iibbPolicy?.code, {
          onlySelf: true,
          emitEvent: false
        });
      })
    );

    this.paymentMethodItems$ = this.paymentMethodService
      .getAllPaymentMethods(this.policy.job)
      .pipe(
        tap((pm: IPaymentMethod[]) => {
          this.paymentMethodPolicy =
            pm.find((x) => x.code === this.policy.payment.method) || null;
          this.form
            .get('paymentMethod')
            ?.setValue(this.paymentMethodPolicy?.code, {
              onlySelf: true,
              emitEvent: false
            });
        })
      );

    this.paymentPlanItems$ = this.paymentPlansService
      .getAllPaymentPlans(
        'ars',
        <string>this.policy.payment.method,
        this.policy.producer.code,
        <string>this.policy?.period?.start?.toString(),
        <string>this.policy?.period?.end?.toString()
      )
      .pipe(
        tap((pp: IPaymentPlan[]) => {
          this.paymentPlanPolicy =
            pp.find((x) => x.code === this.policy.paymentTerm.code) || null;
          this.form.get('paymentPlan')?.setValue(this.paymentPlanPolicy?.code, {
            onlySelf: true,
            emitEvent: false
          });
        })
      );

    this.form.get('campaign')?.setValue('ninguna', {
      onlySelf: true,
      emitEvent: false
    });

    this.discountService
      .getAllDiscounts({ job: { number: this.policy.job.number } })
      .pipe(
        tap((d: IDiscount[]) => {
          this.discountPolicy =
            d.find((x) => x.code === this.policy.home.discounts[0].code) ||
            null;
          this.form
            .get('discount')
            ?.setValue(this.policy.home.discounts[0].value.toString(), {
              onlySelf: true,
              emitEvent: false
            });
          this.form
            .get('discount')
            ?.setValidators([
              Validators.min(<number>this.discountPolicy?.minimum),
              Validators.max(<number>this.discountPolicy?.maximum)
            ]);
          this.form.get('discount')?.updateValueAndValidity();
        })
      )
      .subscribe();

    this.commissionService
      .getAllComissions({ job: { number: this.policy.job.number } })
      .pipe(
        tap((c: IComission) => {
          this.commissionPolicy = c;
          this.form
            .get('commission')
            ?.setValue(this.commissionPolicy?.default, {
              onlySelf: true,
              emitEvent: false
            });
          this.form
            .get('commission')
            ?.setValidators([
              Validators.min(this.commissionPolicy.minimum),
              Validators.max(this.commissionPolicy.maximum)
            ]);
          this.form.get('commission')?.updateValueAndValidity();
        })
      )
      .subscribe();
  }

  openModalEdit() {
    this.modalEdit.openModal();
  }
  ngOnDestroy(): void {}
}
