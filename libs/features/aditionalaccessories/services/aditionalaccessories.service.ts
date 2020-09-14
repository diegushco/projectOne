import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAditionalAccessories } from '../interfaces/aditionalaccessories.interface';
import { Observable, of } from 'rxjs';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class AditionalAccessoriesService {
  api_url: string;

  constructor(private http: HttpClient) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get aditional
   * @returns Array of aditional
   */
  getAllAditionals(): Observable<IAditionalAccessories[]> {
    const arr: IAditionalAccessories[] = new Array<IAditionalAccessories>(
      {
        code: 1,
        name: 'Daños a parabrisas y lunetas'
      },
      {
        code: 2,
        name: 'Daños a cerraduras'
      },
      {
        code: 3,
        name: 'Daños por granizo'
      },
      {
        code: 4,
        name: 'Ampliación ingreso campos petroliferos'
      },
      {
        code: 5,
        name: 'Ampliación ingreso aeródromos'
      },
      {
        code: 6,
        name: 'Ampliación por carga peligrosa'
      },
      {
        code: 7,
        name: 'Ampliación daño ambiental'
      }
    );

    return of(arr);
    // const apiURL = `${this.api_url}/+`;
    // return this.http.get<IAditionalAccessories[]>(apiURL);
  }

  /**
   * Method used to get aditional
   * @returns Array of aditional
   */
  getAllAccessories(): Observable<IAditionalAccessories[]> {
    const arr: IAditionalAccessories[] = new Array<IAditionalAccessories>(
      {
        code: 11,
        name: 'Aire Acondicionado'
      },
      {
        code: 22,
        name: 'Reproductores de sonido'
      },
      {
        code: 33,
        name: 'Barra Antivuelcos'
      },
      {
        code: 44,
        name: 'Seguridad'
      },
      {
        code: 55,
        name: 'Defensas'
      },
      {
        code: 66,
        name: 'Equipos multimedia'
      },
      {
        code: 77,
        name: 'Estribos'
      }
    );

    return of(arr);
    // const apiURL = `${this.api_url}/+`;
    // return this.http.get<IAditionalAccessories[]>(apiURL);
  }

  /**
   * Method used to get comissions
   * @returns Array of comissions
   */
  getAdditionalAccessorios(request: any): Observable<any> {
    const apiURL = `${this.api_url}/policies/additionals`;
    return this.http.post<any>(apiURL, request);
  }
}
