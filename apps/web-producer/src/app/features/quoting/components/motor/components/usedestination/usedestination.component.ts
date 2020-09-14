import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { BaseComponent, BaseService } from '@sura-platform/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  IUse,
  IDestination,
  IActivity,
  IVehicle,
  UseService,
  DestinationService,
  ActivityService
} from '@sura-platform/features';
import { Observable, of, combineLatest, Subscription } from 'rxjs';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { SelectComponent } from '@sura-platform/web/features/ui/components/select/select.component';
import { switchMap, flatMap, map } from 'rxjs/operators';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import { AnimationOptions } from 'ngx-lottie';

export interface IInternalForm {
  use: IUse;
  destination: IDestination;
  activity: IActivity;
  //gnc: boolean;
}

@Component({
  selector: 'sxf-usedestination',
  templateUrl: 'usedestination.component.html',
  styleUrls: ['usedestination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsedestinationComponent extends BaseComponent
  implements AfterViewInit, OnInit, OnDestroy {
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/fields-loader.json'
  };
  /**
   * Array uses for population the first select
   */
  uses$: Observable<IUse[]>;

  /**
   * Array destinations for population the second select
   */
  destinations$: Observable<IDestination[]>;

  /**
   * Array activities for population the third select
   */
  activities$: Observable<IActivity[]>;

  /**
   * Current motor
   */
  currentMotor: IVehicle;

  form: FormGroup;

  routes: IRoutesMotor[];

  formData: IInternalForm;

  destinationSelected = false;

  currentYear = 0;

  loadingCoverage$: Observable<boolean>;

  @ViewChild('use') useChild: SelectComponent;
  @ViewChild('destination')
  destinationChild: SelectComponent;
  @ViewChild('activity') activityChild: SelectComponent;
  @ViewChild('uber') private uberInput;
  vehicles: IVehicle[];
  firstTime = true;
  //gnc: boolean;
  fromDataQuoteSubscription: Subscription;

  constructor(
    // private route: ActivatedRoute,
    private fb: FormBuilder,
    private useService: UseService,
    private destinationService: DestinationService,
    private activityService: ActivityService,
    private _baseService: BaseService,
    private flowRouteService: FlowRouteService,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.setValues(this.currentMotor);

    this.storeQuote.select(fromQuote.getQuoteUber).subscribe((isuber) => {
      if (isuber && !this.uberInput.nativeElement.checked) {
        this.uberInput.nativeElement.click();
      }
    });
  }

  setValues(currentMotor) {
    this.form.get('use').setValue(currentMotor.use, { emitEvent: false });
    this.form
      .get('destination')
      .setValue(currentMotor.destination, { emitEvent: false });
    this.form
      .get('activity')
      .setValue(currentMotor.activity, { emitEvent: false });
  }

  /**
   *  Initialize values
   */
  ngOnInit(): void {
    this.currentYear = this._baseService.getThisYear();

    this.form = this.fb.group({
      use: [, Validators.required],
      destination: [, Validators.required],
      activity: [, Validators.required]
    });

    this.form.get('use').valueChanges.subscribe((useCode: any) => {
      this.currentMotor.use = useCode;

      const vehicleId = findIndex(this.vehicles, {
        number: this.currentMotor.number
      });
      this.vehicles[vehicleId].use = useCode;

      this.form.get('destination').setValue([], { emitEvent: false });

      this.form.get('activity').setValue([], { emitEvent: false });

      this.loadDestinations(useCode);
      this.form.patchValue(
        {
          destination: null,
          activity: null
        },
        { onlySelf: true, emitEvent: false }
      );
    });

    this.form.get('destination').valueChanges.subscribe((code: number) => {
      this.form.get('activity').setValue([], { emitEvent: false });

      if (code === 99) {
        /*AUTOCLASICO*/
        this.destinationSelected = true;
      }

      /* if (code === 25 && !this.uberInput.nativeElement.checked) {

        this.uberInput.nativeElement.click();
      }*/
      this.currentMotor.activity = null;
      this.currentMotor.destination = code;
      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.destination = code;
        }
      });

      this.loadActivities(this.currentMotor.use, code);
    });

    this.form.get('activity').valueChanges.subscribe((code: string) => {
      this.currentMotor.activity = code;
      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.activity = code;
        }
      });
    });

    this.fromDataQuoteSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        flatMap((data) => {
          this.currentMotor = data[0].motor.vehicles.filter(
            (c) => c.number === data[1].activeMotor
          )[0];
          this.vehicles = data[0].motor.vehicles;

          this.loadUses();
          if (this.currentMotor.use !== null) {
            this.setValues(this.currentMotor);
            this.loadDestinations(this.currentMotor.use);
            this.loadActivities(
              this.currentMotor.use,
              this.currentMotor.destination
            );
          }

          return data;
        })
      )
      .subscribe();

    // this.storeQuote.dispatch(
    //   new fromQuoteActions.SetDefaultUseDestinationActivity(
    //     this.currentMotor.use,
    //     this.currentMotor.destination,
    //     this.currentMotor.activity
    //   )
    // );

    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = data.routes;
    });
  }

  loadUses() {
    this.uses$ = this.useService.getUses(this.currentMotor.model.type);
  }

  loadDestinations(use: number) {
    this.destinations$ = this.destinationService
      .getDestinations(this.currentMotor.model.type, use)
      .pipe(
        map((dest: any) => {
          //TODO: MP: Se eliminan los codigos de plataforma digital para salida MVP1
          remove(dest, {
            code: 25
          });
          remove(dest, {
            code: 26
          });
          remove(dest, {
            code: 27
          });
          return dest;
        })
      );
  }

  onLoadActivitiesComplete(items: any) {
    if (this.currentMotor.activity !== null) {
      this.form
        .get('activity')
        .setValue(this.currentMotor.activity, { emitEvent: false });
    } else if (items.length === 1) {
      this.form.get('activity').setValue(items[0].code, { emitEvent: true });
    } else {
      if (this.firstTime) {
        this.form.get('activity').setValue(items[0].code, { emitEvent: true });
        this.firstTime = false;
      } else {
        this.form.patchValue(
          {
            activity: null
          },
          { onlySelf: true, emitEvent: false }
        );
      }
    }
  }

  loadActivities(use: number, destination: number) {
    this.activities$ = this.activityService
      .getActivities(this.currentMotor.model.type, use, destination)
      .pipe(
        switchMap((p) => {
          p.forEach((element) => {
            element.description = element.description.toUpperCase();
          });
          return of(p);
        })
      );
  }

  uberChange(event) {
    this.storeQuote.dispatch(
      new fromQuoteActions.SetUber(event.target.checked)
    );

    this.useChild.disabled = event.target.checked;
    this.destinationChild.disabled = event.target.checked;
    this.activityChild.disabled = event.target.checked;

    if (event.target.checked) {
      this.form.get('destination').setValue(25, { emitEvent: true });
    } else {
      this.storeQuote
        .select(fromQuote.getQuoteDefaultUseDestinationActivity)
        .subscribe((data) => {
          this.form.get('use').enable();
          this.form.get('destination').enable();
          this.form.get('activity').enable();
          this.form
            .get('destination')
            .setValue(data.destination, { emitEvent: true });
          this.form
            .get('activity')
            .setValue(data.activity, { emitEvent: true });
        });
    }

    // this.useChild.disabled = event.target.checked;
  }

  continue() {
    let useName = '';

    this.flowRouteService.enableRoute(this.currentMotor, this.routes, 'sum');

    this.useChild.getValue().subscribe((item) => {
      this.routes.forEach((element) => {
        if (element.path === 'motor/' + this.currentMotor.id + '/use') {
          useName = item.description.toUpperCase();
          element.value = useName;
        }
      });

      this.vehicles.forEach((v) => {
        if (v.number === this.currentMotor.number) {
          v.use = this.form.get('use').value;
          v.activity = this.form.get('activity').value;
          v.destination = this.form.get('destination').value;
          v.useName = useName;
        }
      });

      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.vehicles)
      );
      this.clearNextsValues();
    });
  }

  clearNextsValues() {
    this.routes.forEach((element) => {
      if (
        element.path !== 'motor/' + this.currentMotor.id + '/brand' &&
        element.path !== 'motor/' + this.currentMotor.id + '/model' &&
        element.path !== 'motor/' + this.currentMotor.id + '/year' &&
        element.path !== 'motor/' + this.currentMotor.id + '/version' &&
        element.path !== 'motor/' + this.currentMotor.id + '/location' &&
        element.path !== 'motor/' + this.currentMotor.id + '/use' &&
        element.path !== 'motor/' + this.currentMotor.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }

      if (element.path === 'motor/' + this.currentMotor.id + '/use') {
        element.disabled = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.fromDataQuoteSubscription) {
      this.fromDataQuoteSubscription.unsubscribe();
    }
  }
}
