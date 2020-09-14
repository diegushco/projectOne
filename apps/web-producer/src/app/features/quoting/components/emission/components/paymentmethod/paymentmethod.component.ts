import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from '@sura-platform/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromEmission from '../../state';
import { Store } from '@ngrx/store';
import {
  PaymentMethodService,
  AccountService,
  IPolicy,
  ICreditCard,
  IPayment,
  IPaymentPlan
} from '@sura-platform/features';
import { Observable, of, EMPTY, Subscription, combineLatest } from 'rxjs';
import { switchMap, filter, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import * as fromQuote from '../../../quote/state';

interface PaymentMethod {
  code: number;
  description: string;
  discount: number;
}

interface Bank {
  code: number;
  description: string;
}

interface CardStored {
  code: number;
  name: string;
  number: string;
  bank: Bank;
  expired: string;
  security: string;
}

@Component({
  selector: 'sxf-paymentmethod',
  templateUrl: 'paymentmethod.component.html',
  styleUrls: ['paymentmethod.component.scss']
})
export class PaymentMethodComponent extends BaseComponent
  implements OnInit, OnDestroy {
  /**
   * tab open by default
   */
  activeTab: string | null = '';

  /**
   * Array of payment methods
   */
  arrPaymentMethods: PaymentMethod[] = [];

  /**
   * form for debicard
   */
  formDebit: FormGroup = <FormGroup>{};

  /**
   * form for creditcard
   */
  formCredit: FormGroup = <FormGroup>{};

  /**
   * Array of cards stored
   */
  arrCardsStored: CardStored[] = [];

  paymentInstruments$: Observable<any> = new Observable();

  paymentMethods$: Observable<any> = new Observable();

  payment: IPayment = <IPayment>{};

  paymentTerm: IPaymentPlan = <IPaymentPlan>{};

  activePaymentMethodId: string | null = '';

  newPaymentWay = false;

  digitalPolicy = true;

  fromRetrieve = false;

  approvedEmission = false;

  currentPolicy: IPolicy = <IPolicy>{};

  initSlice = 0;
  endSlice = 2;

  arrayCardsLength = 0;
  arrayCbusLength = 0;

  public expirationDateMask = [/[0-1]/, /[0-9]/, '/', /\d/, /\d/, /\d/, /\d/];
  public numberMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  disabledByRetrieve = false;
  paymentSelectedByRetrieve = false;
  currentServerDate: Date = new Date();

  disabledByRetrieveSubscription: Subscription = new Subscription();
  serverDataSubscription: Subscription = new Subscription();
  paymentDataSubscription: Subscription = new Subscription();
  paymentTermSubscription: Subscription = new Subscription();
  policyDataSubscription: Subscription = new Subscription();
  creditCardSubscription: Subscription | undefined = new Subscription();
  cardExpirationSubcription: Subscription | undefined = new Subscription();
  debitCardSubscription: Subscription | undefined = new Subscription();
  emissionStoreSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private storePolicy: Store<fromPolicy.State>,
    private storeEmission: Store<fromEmission.State>,
    private paymentMethodService: PaymentMethodService,
    private paymentInstrument: AccountService,
    private storeQuote: Store<fromQuote.State>
  ) {
    super();
  }

  ngOnInit(): void {
    this.paymentDataSubscription = this.storePolicy
      .select(fromPolicy.getPaymentData)
      .subscribe((data) => {
        this.payment = data;
        this.activeTab = data.method;
      });

    this.paymentTermSubscription = this.storePolicy
      .select(fromPolicy.getPaymentTerm)
      .subscribe((data) => {
        this.paymentTerm = data;
        this.payment.plan.code = data.code;
      });

    this.policyDataSubscription = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((data) => {
        this.currentPolicy = data;
        if (data.email) {
          this.digitalPolicy = true;
        } else {
          this.digitalPolicy = false;
        }
      });

    this.serverDataSubscription = this.storeQuote
      .select(fromQuote.getServerDate)
      .subscribe((date) => {
        this.currentServerDate = new Date(date);
      });

    this.paymentMethods$ = this.storePolicy.select(fromPolicy.getJob).pipe(
      switchMap((x) => {
        if (x) {
          return this.paymentMethodService.getAllPaymentMethods(x).pipe(
            switchMap((ps) => {
              ps.map((hj) => {
                //FIXME: MP, DG: Marcos, aqui setie esto hardcodeado, lo pidieron asi, pero hay que estar
                //pendiente que a futuro lo incluyan en la API (el descuento para mostrar a modo informativo)
                if (hj.code !== 'Coupon') {
                  hj.legend = '10% de descuento';
                }
              });
              return of(ps.filter((c) => c.code === this.payment.method));
            })
          );
        } else {
          return of(EMPTY);
        }
      })
    );

    this.paymentInstruments$ = this.storePolicy
      .select(fromPolicy.getClientData)
      .pipe(
        switchMap((x) => {
          if (x.accountnumber !== null) {
            return this.paymentInstrument
              .getPaymentInstruments(x.accountnumber)
              .pipe(
                filter((u) => u.length > 0),
                switchMap((p) => {
                  const hasPaymentInstrumentsForTabSet = p.filter(
                    (o) => o.method === this.payment.method
                  ).length;
                  if (hasPaymentInstrumentsForTabSet < 1) {
                    this.newPaymentWay = true;
                  }
                  return of(p.filter((o) => o.method === this.payment.method));
                })
              );
          } else {
            this.newPaymentWay = true;
            return of(EMPTY);
          }
        }),
        catchError(() => {
          this.newPaymentWay = true;
          return of(EMPTY);
        })
      );

    this.formDebit = this.fb.group({
      number: [, [Validators.required, Validators.minLength(22)]]
    });

    this.formCredit = this.fb.group({
      //! 14 digits Diners
      //! 15 digits AMEX
      //! Others 16 Digits
      number: [
        ,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(16)
        ]
      ],
      // expirationdate: [
      //   ,
      //   [Validators.required, Validators.pattern('^d{2}/d{4}$')]
      // ],
      expirationdate: [, [Validators.required, Validators.minLength(7)]],
      owner: [, Validators.required]
    });

    this.creditCardSubscription = this.formCredit
      .get('number')
      ?.valueChanges.subscribe((data: string) => {
        // TODO: Descomentar este codigo siguiente cuando ande la api creditcards..
        if (data.length > 6) {
          this.paymentMethodService
            .getCreditCards(data.substring(0, 6))
            .subscribe((cc: ICreditCard[]) => {
              if (cc) {
                this.payment.creditcard.type = cc[0].code;
                this.storePolicy.dispatch(
                  new fromPolicyActions.SetCurrentPaymentMethodAction(
                    this.payment
                  )
                );
              }
            });
        }
        this.payment.creditcard.number = data;
        this.storePolicy.dispatch(
          new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
        );
      });

    this.cardExpirationSubcription = this.formCredit
      .get('expirationdate')
      ?.valueChanges.subscribe((data: string) => {
        this.payment.creditcard.expirationdate = null;
        if (data.length === 7) {
          const _expirationDate = '01/' + data;
          const dateServer = moment(this.currentServerDate).format(
            'YYYY-MM-DD'
          );
          const dateCard = moment(_expirationDate, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          );

          /* Si la fecha del servidor es mayor a la fecha de la TDC, hago dispatch */
          if (dateCard > dateServer) {
            this.payment.creditcard.expirationdate = moment(
              _expirationDate,
              'DD/MM/YYYY'
            ).toISOString();

            this.storePolicy.dispatch(
              new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
            );
          } else {
            this.payment.creditcard.expirationdate = null;
            this.storePolicy.dispatch(
              new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
            );
          }
        }
      });

    this.debitCardSubscription = this.formDebit
      .get('number')
      ?.valueChanges.subscribe((data: string) => {
        this.payment.cbu.number = data;
        this.payment.cbu.conduit = '17';
        this.storePolicy.dispatch(
          new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
        );
      });

    //TODO DG: hacer que este por defecto la que venga por API (segun US-1715)
    // this.changeTab(this.arrPaymentMethods[0]);

    this.disabledByRetrieveSubscription = combineLatest([
      this.storeEmission.select(fromEmission.getJobNumber),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ]).subscribe((x) => {
      const job = x[0];
      const policy = x[1];

      // ML: Entra en esta sección si retrieve indica que fue seleccionado
      // un método de pago
      if (policy.payment.id && !this.paymentSelectedByRetrieve) {
        if (policy.client.accountnumber !== null) {
          this.paymentInstrument
            .getPaymentInstruments(policy.client.accountnumber)
            .subscribe((pi) => {
              const payment = pi.find((p) => p.id === policy.payment.id);

              if (payment) {
                this.setPaymentMethod(payment, true);
                this.paymentSelectedByRetrieve = true;
              }
            });
        }
      }
      this.emissionStoreSubscription = this.storeEmission
        .select(fromEmission.getEmission)
        .subscribe((store) => {
          this.fromRetrieve = store.jobNumberFromQuotes ? true : false;
          this.approvedEmission = store.approvedEmission;
        });
      if (this.fromRetrieve) {
        this.disabledByRetrieve =
          this.approvedEmission && policy.payment.id ? true : false;
      } else {
        this.disabledByRetrieve = job && policy.payment.id ? true : false;
      }
    });
  }

  ngOnDestroy() {
    this.debitCardSubscription?.unsubscribe();
    this.creditCardSubscription?.unsubscribe();
    this.cardExpirationSubcription?.unsubscribe();
    this.emissionStoreSubscription?.unsubscribe();
    this.serverDataSubscription?.unsubscribe();
    this.policyDataSubscription?.unsubscribe();
    this.paymentDataSubscription?.unsubscribe();
    this.paymentTermSubscription?.unsubscribe();
    this.disabledByRetrieveSubscription?.unsubscribe();
  }

  changeTab(tab: any) {
    //FIXME: MVP 1
    return false;

    this.initSlice = 0;
    this.endSlice = 2;

    this.activeTab = tab.code;
    this.payment.method = tab.code;
    if (tab.code === 'BankingDebt') {
      this.newPaymentWay = true;
    }
    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
    );
  }

  addNewPaymentWay() {
    this.newPaymentWay = true;
    this.activePaymentMethodId = null;
    this.payment.id = null;
    this.payment.creditcard.number = null;
    this.payment.creditcard.type = null;
    this.payment.creditcard.expirationdate = null;
    this.payment.cbu.number = null;
    this.formCredit?.get('expirationdate')?.setValue('');
    this.formCredit?.get('number')?.setValue('');
    this.formDebit?.get('number')?.setValue('');
    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
    );
  }

  setPaymentMethod(payment: any, selected?: boolean) {
    if (this.disabledByRetrieve && !selected) return;

    this.payment.plan.code = this.payment.plan.code || this.paymentTerm.code;
    this.newPaymentWay = false;
    this.activePaymentMethodId = payment.id;
    this.payment.id = payment.id;
    this.payment.cbu.number = null;
    this.payment.creditcard.expirationdate = null;
    this.payment.creditcard.number = null;
    this.payment.creditcard.type = null;
    switch (payment.method) {
      case 'CreditCard':
        const type = payment.displayname
          .substring(0, payment.displayname.indexOf('('))
          .replace(' ', '');
        const number = payment.displayname.substring(
          payment.displayname.lastIndexOf('(') + 1,
          payment.displayname.lastIndexOf(')')
        );
        const expirationCard = payment.displayname.substring(
          payment.displayname.length - 10
        );
        // const yearExpiration = expirationCard.substring(expirationCard.length - 4);
        // const monthExpiration =

        this.payment.creditcard.number = number;
        this.payment.creditcard.expirationdate = moment(
          expirationCard,
          'DD/MM/YYYY'
        ).toISOString();
        this.payment.creditcard.type = type.toString().toLowerCase().trim();
        break;
      case 'BankingDebt':
        const cbuNumber = payment.displayname.substring(
          payment.displayname.lastIndexOf('(') + 1,
          payment.displayname.lastIndexOf(')')
        );
        this.payment.cbu.number = cbuNumber;
        break;
      default:
        break;
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentPaymentMethodAction(this.payment)
    );
  }

  sendDigitalPolicy() {
    this.digitalPolicy = !this.digitalPolicy;
    if (this.digitalPolicy) {
      if (this.currentPolicy.client.email !== null) {
        this.storePolicy.dispatch(
          new fromPolicyActions.SetMailDataAction(
            this.currentPolicy.client.email
          )
        );
      } else {
      }
    } else {
      this.storePolicy.dispatch(new fromPolicyActions.SetMailDataAction(null));
    }
  }

  /**
   * Return name of card from this template 'Visa (4551970002062213) - H - 05/08/2020'
   */
  getCardImg(value: string) {
    const regex = /([^\(]+)/;
    const match = regex.exec(value);
    if (match !== null) {
      return match[1].trim().replace(' ', '').toUpperCase();
    } else {
      return null;
    }
  }

  paginateCbus(array: Array<any>) {
    this.arrayCbusLength = array.length;
    const _array = array.slice(this.initSlice, this.endSlice);
    return _array;
  }

  paginateCreditCards(array: Array<any>) {
    this.arrayCardsLength = array.length;
    const _array = array.slice(this.initSlice, this.endSlice);
    return _array;
  }

  nextPaginate(lengthArray: number) {
    if (this.endSlice < lengthArray) {
      this.initSlice += 2;
      this.endSlice += 2;
    }
  }

  previousPaginate() {
    if (this.initSlice >= 2) {
      this.initSlice -= 2;
      this.endSlice -= 2;
    }
  }
}
