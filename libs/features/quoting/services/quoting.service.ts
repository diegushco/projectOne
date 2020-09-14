import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPolicy, ICoverageResponse } from '@sura-platform/features';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class QuotingService {
  api_url: string;
  /**
   * This variable is used to generate broadcast with the boolean value.
   */
  private gettingDataFromCoverageServiceSubject = new BehaviorSubject<boolean>(
    false
  );
  /**
   * This variable is used to expose the gettingDataFromCoverageServiceSubject as
   */
  gettingDataFromCoverageService$ = this.gettingDataFromCoverageServiceSubject.asObservable();
  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  getCoverages(policy: IPolicy): Observable<ICoverageResponse> {
    const apiURL = `${this.api_url}/policies/coverages`;
    return this.http.post<ICoverageResponse | any>(apiURL, policy).pipe(
      map((p) => {
        if (p.motor) {
          p.motor.vehicles.forEach((v: any) => {
            v.use = Number(v.use);
            v.destination = Number(v.destination);
            //FIXME: MP: Sacar este parche cuando este corrgido el manejo de coverage dentro de package
            v.coverages = v['package'] ? v['package'].coverages : null;
          });
        }
        return p;
      })
    );
  }

  editCoverages(policy: IPolicy): Observable<ICoverageResponse> {
    const apiURL = `${this.api_url}/policies/coverages/edit`;
    return this.http.post<ICoverageResponse>(apiURL, policy).pipe(
      map((p) => {
        p?.motor?.vehicles?.forEach((v: any) => {
          v.use = Number(v.use);
          v.destination = Number(v.destination);
          //FIXME: MP: Sacar este parche cuando este corrgido el manejo de coverage dentro de package
          v.coverages = v['package'] ? v['package'].coverages : null;
        });
        return p;
      })
    );
  }

  getCosts(policy: IPolicy): Observable<any> {
    const apiURL = `${this.api_url}/policies/costs`;
    return this.http.post(apiURL, policy).pipe(
      map((p: IPolicy) => {
        if (p.motor) {
          p.motor.vehicles?.forEach((v) => {
            v.use = Number(v.use);
            v.destination = Number(v.destination);
          });
        }
        return p;
      })
    );
  }

  issuePolicy(policy: IPolicy): Observable<any> {
    const apiURL = `${this.api_url}/policies/issues`;
    return this.http.post(apiURL, policy);
  }

  saveQuoting(policy: IPolicy): Observable<any> {
    const apiURL = `${this.api_url}/policies/quotes`;
    return this.http.post(apiURL, policy);
  }

  emitPolicy(policy: IPolicy): Observable<any> {
    const apiURL = `${this.api_url}/policies/issues/bind`;
    const data = {
      job: policy.job,
      inspection: policy.inspection
    };

    return this.http.post(apiURL, data);
  }

  /**
   * This method is uses for set flag getting data.
   * @param flag {boolean}
   * @example setGettingDataFromCoverageService(true)
   */
  setGettingDataFromCoverageService(flag: boolean) {
    this.gettingDataFromCoverageServiceSubject.next(flag);
  }
}
