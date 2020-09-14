export interface ICampaign {
  id: string;
  code: string;
  description: string;
}

export interface ICampaignsRequest {
  job: {
    number: string;
    type: string;
  }
}
