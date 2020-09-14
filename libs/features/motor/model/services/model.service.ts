import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IModel } from '../interfaces/model.interface';
import { Observable } from 'rxjs';
import { VehicleGroup } from '../../../quoting/interfaces/vehicle-group.enum';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class ModelService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get list of models, from selected brand
   * @param {number} year Year of car to filter models
   * @param {number} brand Brand to filter models
   * @returns Array of models
   */
  getShortModels(
    year: number,
    brand: number,
    group?: VehicleGroup
  ): Observable<IModel[]> {
    let params = new HttpParams()
      .set('year', year.toString())
      .set('brand', brand.toString());
    if (group) params = params.set('group', group);

    const apiURL = `${this.api_url}/vehicles/shortmodels`;
    return this.http.get<IModel[]>(apiURL, { params });
  }

  getModels(
    year: number,
    brand: number,
    shortmodel: string,
    group?: VehicleGroup
  ): Observable<IModel[]> {
    let params = new HttpParams()
      .set('year', year.toString())
      .set('brand', brand.toString())
      .set('shortmodel', shortmodel);
    if (group) params = params.set('group', group);

    const apiURL = `${this.api_url}/vehicles/models`;
    return this.http.get<IModel[]>(apiURL, { params });
  }
}
