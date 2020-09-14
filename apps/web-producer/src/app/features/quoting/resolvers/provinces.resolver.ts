import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { IProvince, ProvinceService } from '@sura-platform/features';

@Injectable()
export class ProvincesResolver implements Resolve<Observable<IProvince[]>> {
  constructor(private provinceService: ProvinceService) {}

  resolve() {
    return this.provinceService.getAllProvinces();
  }
}
