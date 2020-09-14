import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { IDestination, DestinationService } from '@sura-platform/features';

@Injectable()
export class DestinationResolver
  implements Resolve<Observable<IDestination[]>> {
  constructor(private destinationService: DestinationService) {}

  resolve() {
    return this.destinationService.getAllDestinations();
  }
}
