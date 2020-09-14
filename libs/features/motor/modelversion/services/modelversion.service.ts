import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { IModelVersion } from '../interfaces/modelversion.interface';
import { Observable, of } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ModelVersionService {
  api_url: string;

  constructor() // private http: HttpClient,
  {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get list version of models, from selected model
   * @param {number} model  Model of car to filter versions
   * @returns Array of versions
   */
  getModelVersions(model: number): Observable<IModelVersion[]> {
    let p = model + 1;
    p = 1 + p;

    const arr: IModelVersion[] = new Array<IModelVersion>(
      {
        code: 411,
        description: 'EDGE 1.8 TDI 5 PTAS',
        statementamount: null,
        originalcostnew: null,
        type: ''
      },
      {
        code: 45,
        description: 'CLX 1.3 BASE',
        statementamount: null,
        originalcostnew: null,
        type: ''
      }
    );

    return of(arr);

    // const apiURL = `${this.api_url}/modelversions/${model}`;
    // return this.http.get<IModelVersion[]>(apiURL);
  }
}
