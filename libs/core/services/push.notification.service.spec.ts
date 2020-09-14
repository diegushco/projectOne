/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PushNotificationsService } from './push.notification.service';

describe('Service: Push.notification.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushNotificationsService]
    });
  });

  it('should ...', inject(
    [PushNotificationsService],
    (service: PushNotificationsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
