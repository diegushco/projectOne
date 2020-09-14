import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { IUse, UseService } from '@sura-platform/features';

@Injectable()
export class UsesResolver implements Resolve<Observable<IUse[]>> {
  constructor(private useService: UseService) {}

  resolve() {
    return this.useService.getAllUses();
  }
}
