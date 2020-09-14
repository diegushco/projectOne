import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '@sura-platform/web';
import { IMaintenanceSystem } from '@sura-platform/features';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'sxf-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent extends AppBaseComponent implements OnInit {
  system: IMaintenanceSystem | null;

  endDate: moment.Moment | undefined;

  currentDate: moment.Moment = moment();

  constructor(private router: Router) {
    super();

    this.system = this.router.getCurrentNavigation()?.extras
      ?.state as IMaintenanceSystem;
  }

  ngOnInit(): void {
    const toShowSystem = this.system?.elements?.find((element) => {
      const dateSince =
        element.dateSince && moment(element.dateSince, 'YYYY-MM-DDTHH:mm:ssZ');
      const dateUntil =
        element.dateUntil && moment(element.dateUntil, 'YYYY-MM-DDTHH:mm:ssZ');

      if (dateSince && dateUntil) {
        return dateSince < this.currentDate && dateUntil >= this.currentDate;
      }
    });

    if (toShowSystem?.dateUntil) {
      this.endDate = moment(toShowSystem.dateUntil, 'YYYY-MM-DDTHH:mm:ssZ');
    }
  }

  get date() {
    return this.endDate?.format('DD/MM/YYYY');
  }

  get time() {
    return this.endDate?.format('HH:mm');
  }
}
