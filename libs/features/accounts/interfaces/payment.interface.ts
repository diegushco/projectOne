export interface IPayment {
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
}
