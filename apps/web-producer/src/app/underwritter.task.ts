import { Injectable, IterableDiffers } from '@angular/core';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { timeInterval, flatMap, map } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';
import reject from 'lodash/reject';
import find from 'lodash/find';
import merge from 'lodash/merge';
import { PushNotificationsService } from '@sura-platform/core';
import { QuotesService } from '@sura-platform/features';

@Injectable()
export class UnderwritterTaskService {
  private iterableDiffer;
  private inputArray = [];
  private originalArray = [];

  constructor(
    private pushNotifications: PushNotificationsService,
    private quotesService: QuotesService,
    private differs: IterableDiffers
  ) {
    this.iterableDiffer = this.differs.find([]).create(null);
  }

  init() {
    const serverDate = localStorage.getItem('date');
    const quotesRequest = {
      policytype: 'Submission',
      uwstatus: null,
      datesince: moment(serverDate)
        .subtract(15, 'days')
        .toISOString(),
      dateuntil: serverDate,
      productcode: null,
      producer: {
        code: null
      },
      client: {
        primaryofficialid: {
          type: null,
          value: null
        },
        firstname: null,
        lastname: null,
        companyname: null
      }
    };

    interval(60 * 1000)
      .pipe(
        timeInterval(),
        flatMap(() => this.quotesService.getQuotes(quotesRequest)),
        map((data) => {
          return data.filter((x) => x.uwstatus === 'approved');
        })
      )
      .subscribe((data) => {
        if (this.originalArray.length === 0) {
          this.originalArray = data;
        }

        if (!isEqual(this.originalArray, data)) {
          this.inputArray = reject(data, (item) =>
            find(this.originalArray, { job: item.job })
          );
        }
      });
  }

  doCheck() {
    const changes = this.iterableDiffer.diff(this.inputArray);

    if (changes) {
      if (this.inputArray.length === 1) {
        this.pushNotifications.generateNotification([
          {
            title: 'Solicitud Aprobada',
            alertContent:
              'La Solicitud numero ' +
              this.inputArray[0].job.number +
              ' a nombre de ' +
              this.inputArray[0].client.displayname +
              ' fue aprobada y puede continuar con la emision'
          }
        ]);
      } else if (this.inputArray.length > 1) {
        for (let i = 0; i < this.inputArray.length; i++) {
          this.pushNotifications.generateNotification([
            {
              title: 'Solicitudes Aprobadadas',
              alertContent:
                'La Solicitud numero ' +
                this.inputArray[0].job.number +
                ' a nombre de ' +
                this.inputArray[0].client.displayname +
                ' fue aprobada y puede continuar con la emision'
            }
          ]);
        }
      }
      this.originalArray = merge(this.originalArray, this.inputArray);
    }
  }
}
