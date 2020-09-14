import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICampaignsRequest, ICampaign } from '../interfaces/campaign.interface';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class CampaignService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get all campaigns
   *
   * @returns {Observable<ICampaign[]>}
   * @memberof CampaignService
   */
  getCampaigns(request: ICampaignsRequest) {
    const apiURL = `${this.api_url}/policies/quotes/campaigns`;
    return this.http.post<ICampaign[]>(apiURL, request);
  }
}
