import {
  Component,
  OnInit,
  DoCheck,
  ElementRef,
  ViewChild
} from '@angular/core';
import { AppBaseComponent, AuthService } from '@sura-platform/web';
import { Router, ActivatedRoute } from '@angular/router';
import { PushNotificationsService } from '@sura-platform/core';
import { UnderwritterTaskService } from './underwritter.task';
import { interval } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';
import { NotificationService } from '@sura-platform/core/services/notification.service';
import { INotification } from '@sura-platform/core/error/error.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

@Component({
  selector: 'sxf-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent extends AppBaseComponent implements OnInit, DoCheck {
  /**
   * @type {string}
   * This variable is used to show error messages from the notify service.
   */
  errorMessage = '';
  /**
   * @type {string}
   * This variable is used to get error code from the notify service.
   */
  errorCode = 0;
  /**
   * @type {ElementRef}
   * This variable is used to get content modal from HTML.
   */
  /**
   * @type {ElementRef}
   * This variable is used to get content modal from HTML.
   */
  @ViewChild('content')
  content!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private pushNotifications: PushNotificationsService,
    private underwritterTaskService: UnderwritterTaskService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    super();
    setTimeout(() => {
      this.pushNotifications.requestPermission();
    }, 10000);

    this.route.queryParams.subscribe((params) => {
      if (params?.testMode === 'true') {
        localStorage.setItem('testMode', 'enabled');
      }
    });
  }

  ngOnInit(): void {
    //! This should be the unique source of errors
    //! to avoid multiple modals and unhandled errors
    //! aroud the app. JC (05/03/2020)
    this.notificationService.notification$.subscribe((data: INotification) => {
      if (data) {
        this.errorCode = data.code;
        this.errorMessage = data.description;
        this.open(this.content);
      }
    });

    interval(1000)
      .pipe(
        takeWhile(() => this.authService.accessToken !== null),
        take(1)
      )
      .subscribe(() => {
        // this.utilService.getCurrentServerDate().subscribe((data) => {
        //   localStorage.setItem('date', data.datetime);
        //   this.underwritterTaskService.init();
        //   this.router.navigateByUrl('/queries/quotes');
        // });
      });
  }
  /**
   * This method is used for open modal when a notification is detected.
   * @param @param {any} - Is the ViewChild element from HTML.
   * @example open(content)
   */
  open(content: ElementRef) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => {
          //this.closeResult = `Closed with: ${result}`;
        },
        () => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  /**
   * This method is used for open sentry modal.
   * @example openModal()
   */
  openModal() {
    this.router.navigateByUrl('/queries/quotes');
  }

  ngDoCheck() {
    this.underwritterTaskService.doCheck();
  }

  logout() {
    const url = this.authService.generateLogoutUrl(environment.oauth_logoutUrl);
    window.location.href = url;
  }
}
