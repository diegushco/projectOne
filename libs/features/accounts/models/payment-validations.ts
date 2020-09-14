import { IPayment } from '../interfaces/payment.interface';

export class PaymentValidations {
  method: string | null;
  id: string | null;
  plan: {
    code: string | null;
  };
  cbu: {
    conduit: string | null;
    number: string | null;
    alias: string | null;
  };
  creditcard: {
    type: string | null;
    number: string | null;
    expirationdate: string | null;
  };

  constructor(payment: IPayment) {
    this.method = payment.method;
    this.id = payment.id;
    this.plan = payment.plan;
    this.cbu = payment.cbu;
    this.creditcard = payment.creditcard;
  }

  completeModel(): boolean | undefined {
    if (this.id !== null) return true;

    switch (this.method) {
      case 'CreditCard':
        if (
          this.creditcard.type !== null &&
          this.creditcard.number !== null &&
          this.creditcard.expirationdate !== null &&
          this.creditcard.expirationdate.length > 7
        ) {
          return true;
        }
        break;
      case 'BankingDebt':
        if (this.cbu.number !== null && this.cbu.number.length) return true;
        break;
      case 'Coupon':
        return true;
      default:
        return false;
    }
  }

  validatePayment(): boolean | undefined {
    //! Validate by credit card method.
    if (this.id !== null) return true;
    switch (this.method) {
      //! Validate credit card
      case 'CreditCard':
        if (this.creditcard.type === null || this.creditcard.number === null)
          return false;
        //! Validate all credit card types
        switch (this.creditcard.type.toLowerCase()) {
          case 'visa':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'mastercard':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'naranja':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'americanexpress':
            if (this.creditcard.number.length === 15) return true;
            break;
          case 'diners':
            if (this.creditcard.number.length === 14) return true;
            break;
          case 'italcred':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'cabal':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'nativa':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'mas':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'nevada':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'electron':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'huilen':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'nativaMaster':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'masMastercard':
            if (this.creditcard.number.length === 16) return true;
            break;
          case 'visaRural':
            if (this.creditcard.number.length === 16) return true;
            break;
          default:
            return false;
        }
        break;
      //! Validate banking debit (CBU)
      case 'BankingDebt':
        if (this.cbu.number?.length === 22) return true;
        break;
      //! Validate Coupon
      case 'Coupon':
        return true;
      default:
        return false;
    }
  }
}
