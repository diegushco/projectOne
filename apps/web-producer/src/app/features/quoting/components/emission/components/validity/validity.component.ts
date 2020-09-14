import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromQuote from '../../../quote/state';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromEmission from '../../../emission/state';
import * as fromEmissionActions from '../../../emission/state/emission.actions';
import { FlowRouteEmissionService } from '../../services/flow-route-emission.service';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import * as moment from 'moment';
import { Subject, Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'sxf-validity',
  templateUrl: './validity.component.html',
  styleUrls: ['./validity.component.scss']
})
export class ValidityComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private storePolicy: Store<fromPolicy.State>,
    private flowRouteEmissionService: FlowRouteEmissionService,
    private storeEmission: Store<fromEmission.State>,
    private storeQuote: Store<fromQuote.State>
  ) {}
  formValidaty: FormGroup;
  date: any;
  maxDate: any;
  minDate: any;
  rebillingMonths: number;
  rebillingCode: string;
  routes: IRoutes[];
  today: moment.Moment;
  isLessThatToday$: Subject<boolean> = new Subject();
  retroactiveVigence = false;
  periodData: any;

  disabledByRetrieve$: Subscription;
  disabledByRetrieve: boolean;

  ngOnInit() {
    this.formValidaty = this.fb.group({
      beginningValidity: [, Validators.required]
    });

    this.storeQuote.select(fromQuote.getServerDate).subscribe((data) => {
      this.today = moment(data, 'YYYY-MM-DD');

      this.date = {
        year: this.today.year(),
        month: this.today.month() + 1,
        day: this.today.date()
      };

      const momentTodayForMinDate = moment(this.today).subtract(2, 'months');
      const momentTodayForMaxDate = moment(this.today).add(30, 'days');

      this.minDate = {
        year: momentTodayForMinDate.year(),
        month: momentTodayForMinDate.month() + 1,
        day: momentTodayForMinDate.date()
      };

      this.maxDate = {
        year: momentTodayForMaxDate.year(),
        month: momentTodayForMaxDate.month() + 1,
        day: momentTodayForMaxDate.date()
      };
    });

    this.storePolicy
      .select(fromPolicy.getPeriod)
      .subscribe((data) => {
        const dateFromStore = moment(data.start, 'YYYY-MM-DD');

        const dateForInput = {
          year: dateFromStore.year(),
          month: dateFromStore.month() + 1,
          day: dateFromStore.date()
        };

        switch (data.method) {
          case 'Sura_ThreeMonths':
            this.rebillingMonths = 3;
            this.rebillingCode = 'Sura_ThreeMonths';
            break;
          default:
            this.rebillingMonths = 3;
            this.rebillingCode = 'Sura_ThreeMonths';
            break;
        }

        this.formValidaty
          .get('beginningValidity')
          .setValue(dateForInput, { emitEvent: true });

        const _date = new Date(
          dateForInput.year,
          dateForInput.month,
          dateForInput.day
        ).toDateString();

        const momentDate = moment(_date);
        if (momentDate.subtract(1, 'month').diff(this.today, 'days') < 0) {
          this.retroactiveVigence = true;
        } else {
          this.retroactiveVigence = false;
        }
      })
      .unsubscribe();

    this.storeEmission.select(fromEmission.getRoutes).subscribe((data) => {
      this.routes = data;
    });

    this.formValidaty
      .get('beginningValidity')
      .valueChanges.subscribe((data) => {
        if (data !== null) {
          const _date = new Date(
            data.year,
            data.month,
            data.day
          ).toDateString();
          const momentDate = moment(_date);

          if (momentDate.subtract(1, 'month').diff(this.today, 'days') < 0) {
            this.retroactiveVigence = true;
          } else {
            this.retroactiveVigence = false;
          }
          this.periodData = {
            start: momentDate.format(),
            end: momentDate.add(this.rebillingMonths, 'months').format(),
            method: this.rebillingCode
          };

          this.storePolicy.dispatch(
            new fromPolicyActions.SetPeriodData(this.periodData)
          );
        }
      });

    this.disabledByRetrieve$ = combineLatest([
      this.storeEmission.select(fromEmission.getEmission),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ]).subscribe((x) => {
      const job = x[0].jobNumberFromQuotes;
      const approved = x[0].approvedEmission;
      const policy = x[1];

      this.disabledByRetrieve =
        job && approved && policy.period && policy.period.start ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.disabledByRetrieve$) this.disabledByRetrieve$.unsubscribe();
  }

  onEnter() {
    if (this.formValidaty.valid) {
      this.continue();
    }
  }

  continue() {
    this.flowRouteEmissionService.enableRoute(this.routes, `aditionalauto/1`);

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('aditionalauto/1')
    );

    // this.storePolicy.dispatch(
    //   new fromPolicyActions.SetPeriodData(this.periodData)
    // );

    this.routes.forEach((element) => {
      if (element.path === 'validity') {
        element.value =
          this.formValidaty.get('beginningValidity').value.day +
          '/' +
          this.formValidaty.get('beginningValidity').value.month +
          '/' +
          this.formValidaty.get('beginningValidity').value.year;
      }
    });

    if (this.formValidaty.valid) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetFormEmissionTaxIsValidAction(true)
      );
    }

    this.flowRouteEmissionService.enableRoute(this.routes, 'aditionalauto/1');

    // this.router.navigateByUrl('quoting/emission/questions/aditionalauto');
  }
}
