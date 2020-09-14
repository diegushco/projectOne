import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';
import { INotification } from '../error/error.interface';

@Injectable()
export class NotificationService {
  private _notification: BehaviorSubject<INotification> = new BehaviorSubject(
    null
  );
  readonly notification$: Observable<
    INotification
  > = this._notification.asObservable().pipe(publish(), refCount());

  constructor() { }

  notify(notification: INotification) {
    this._notification.next(notification);
  }
}
