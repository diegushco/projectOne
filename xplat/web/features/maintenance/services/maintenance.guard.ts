import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import moment from 'moment';

import {
  MaintenanceService,
  SystemNameEnum,
  SystemModuleStatusEnum
} from '@sura-platform/features';

@Injectable()
export class MaintenanceGuard implements CanActivate {
  RELATED_SYSTEMS: string[] = [
    SystemNameEnum.GUIDEWIRE,
    SystemNameEnum.PORTALS
  ];

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService
  ) {}

  canActivate(): Observable<boolean> {
    const testMode = localStorage.getItem('testMode');

    if (testMode === 'enabled') {
      return of(true);
    }

    return this.maintenanceService.maintenanceStatus().pipe(
      switchMap(({ systems }) => {
        const byMaintenanceDate = systems.find(
          (system) =>
            this.RELATED_SYSTEMS.includes(system.name) &&
            system.elements.some((element) => {
              const dateSince =
                element.dateSince &&
                moment(element.dateSince, 'YYYY-MM-DDTHH:mm:ssZ');
              const dateUntil =
                element.dateUntil &&
                moment(element.dateUntil, 'YYYY-MM-DDTHH:mm:ssZ');

              if (dateSince && dateUntil) {
                return dateSince < moment() && dateUntil >= moment();
              }

              return false;
            })
        );

        const byStatus = systems.find(
          (system) =>
            this.RELATED_SYSTEMS.includes(system.name) &&
            system.elements.some(
              (element) =>
                element.state === SystemModuleStatusEnum.NOT_AVAILABLE
            )
        );

        if (byMaintenanceDate) {
          this.router.navigate(['maintenance'], { state: byMaintenanceDate });
          return of(false);
        }

        if (byStatus) {
          this.router.navigate(['maintenance']);
          return of(false);
        }

        return of(true);
      }),
      catchError(() => {
        this.router.navigate(['maintenance']);
        return of(false);
      })
    );
  }
}
