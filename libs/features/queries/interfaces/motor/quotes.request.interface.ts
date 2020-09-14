export interface IQuotesRequest {
  policytype: string;
  uwstatus: string | null;
  datesince: string;
  dateuntil: string;
  productcode: string | null;
  producer: {
    code: string | null;
  };
  client: {
    primaryofficialid: {
      type: string | null;
      value: string | null;
    };
    firstname: string | null;
    lastname: string | null;
    companyname: string | null;
  };
}
