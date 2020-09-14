import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { IYear } from '../interfaces/year.interface';
import { BaseService } from '@sura-platform/core';
import { environment } from '@sura-platform/environments/environment';

@Injectable()
export class YearService {
  api_url: string;

  constructor(private baseService: BaseService) {
    this.api_url = environment.api_root;
  }

  /**
   * Method used to get years
   * @returns Array of years
   */
  getAllYear(): Observable<IYear[]> {
    const thisYear = this.baseService.getThisYear();
    const arr = new Array<IYear>();
    for (let i = thisYear; i > thisYear - 100 && i >= 1996; i--) {
      arr.push({
        code: i
      });
    }
    return of(arr);
  }
}
