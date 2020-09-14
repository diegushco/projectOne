import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { IActivity, ActivityService } from '@sura-platform/features';

@Injectable()
export class ActivityResolver implements Resolve<Observable<IActivity[]>> {
  constructor(private activityService: ActivityService) {}

  resolve() {
    return this.activityService.getAllActivities();
  }
}
