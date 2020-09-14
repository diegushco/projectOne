export interface IQuotesResponse {
  job: {
    number: string;
    status: string;
  };
  uwstatus: string;
  client: {
    primaryofficialid: {
      type: string;
      value: string;
    };
    displayname: string;
  };
  insured: {
    accountnumber: string;
  };
  producer: {
    code: string;
    description: string;
  };
  productcode: string;
  costs: {
    total: 0;
  };
  premium: {
    total: 0;
  };
  inspection: {
    pending: boolean;
  };
  updatetime: string;
  solicitud?: boolean;
  policynumber: string;
}
