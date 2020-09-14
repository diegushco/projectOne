import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { BaseComponent } from '@sura-platform/core';
import {
  IProvince,
  ILocation,
  IVehicle,
  LocationService,
  ProvinceService,
  IPolicy,
  QuotingService,
  IHouse,
  IAddress
} from '@sura-platform/features';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { SelectComponent } from '@sura-platform/web';
import { tap, switchMap, filter, takeUntil, map, first } from 'rxjs/operators';
import { AnimationOptions } from 'ngx-lottie';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import * as fromQuote from '../../../quote/state';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromEmission from '../../../../../quoting/components/emission/state';
import * as fromEmissionActions from '../../../../../quoting/components/emission/state/emission.actions';
import { lineGroup } from '../../../../containers/line.enum';
import * as fromProducer from '../../../../../producer/state/index';
import * as stringSimilarity from 'string-similarity';

export interface IInternalLocation {
  province: IProvince;
  location: ILocation;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sxf-location',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.scss']
})
export class LocationComponent extends BaseComponent
  implements OnInit, OnDestroy {
  /**
   * Lottie animations.
   */
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  /**
   * Array of provinces
   */
  provinces$: Observable<IProvince[]> = new Observable();

  dataByPostalCode$: Observable<any> = new Observable();

  provinceSelectedAfterPostalCode$: Observable<any> = new Observable();

  /**
   * Array of locations
   */
  locations: ILocation[] = [];

  form: FormGroup = <FormGroup>{};

  postalCode = new FormControl('');

  dataByPostalCodeSubscriber: Subscription = new Subscription();

  getCoverageSubscribe: Subscription = new Subscription();

  searchingLocations = false;
  initialSubscription: Subscription = new Subscription();
  provincesOnMemory: IProvince[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private locationService: LocationService,
    private provinceService: ProvinceService,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private storeProducer: Store<fromProducer.State>,
    private fb: FormBuilder,
    private storeEmission: Store<fromEmission.State>,
    private flowRouteService: FlowRouteService,
    private quotingService: QuotingService
  ) {
    super();
  }

  /**
   * Current motor
   */
  currentMotor: IVehicle = <IVehicle>{};

  vehicles: IVehicle[] = <IVehicle[]>[];

  /**
   * list locations from service
   */
  locations$: Observable<ILocation[]> = new Observable();

  currentPolicy: IPolicy = <IPolicy>{};

  provinceSelected = '';

  /**
   * Initialize arrays provinces and locations
   */

  routes: IRoutesMotor[] = [];

  /**
   * This variable is an observable and is used as a flag indication that the coverage service is running
   */
  gettingCoverage$: Observable<boolean> = new Observable();

  insuredAddress: IAddress = {
    id: null,
    state: '',
    city: '',
    apartment: '',
    clarification: '',
    floor: '',
    postalcode: '',
    street: '',
    streetnumber: '',
    type: ''
  };

  @ViewChild('province') province: SelectComponent = <SelectComponent>{};
  @ViewChild('location') location: SelectComponent = <SelectComponent>{};

  /**
   * Current business line
   */
  line = '';

  /**
   * Current all business line (enum)
   */
  lineGroupEnum = lineGroup;

  currentHouse: IHouse = <IHouse>{};

  currentHouseNumber = 0;

  houses: IHouse[] = <IHouse[]>{};

  quoteHomeSubscription: Subscription = new Subscription();

  defaultPostalCode: any;
  defaultState: any;
  defaultCity: any;

  ngOnInit() {
    this.gettingCoverage$ = this.quotingService.gettingDataFromCoverageService$;

    this.storeQuote.select(fromQuote.getCurrentLine).subscribe((line) => {
      this.line = <string>line;
      this.commonProcess();
      // if (this.line === this.lineGroupEnum.MOTOR) {
      //   this.processLocationMotor();
      // } else if (this.line === this.lineGroupEnum.HOME) {
      //   this.processLocationHome();
      // }
    });
  }

  commonProcess() {
    this.provinces$ = combineLatest([
      this.provinceService
        .getAllProvinces()
        .pipe(tap((x: any[]) => (this.provincesOnMemory = x))),
      this.storeProducer.select(fromProducer.getCurrentProducer),
      this.storeQuote.select(fromQuote.getActiveMotor),
      this.storePolicy.select(fromPolicy.getPolicyData)
    ]).pipe(
      tap(([provinces, producer, activeMotor, policy]) => {
        const currentProvince = provinces.find(
          (p) => p.code === producer.profile.codeProvince
        );

        const currentAddress = policy?.motor?.vehicles?.find(
          (v: IVehicle) => v.number === activeMotor
        )?.zone?.state;

        // Avanzo únicamente si no se ha seleccionado
        // con anterioridad la provincia
        if (currentProvince && !currentAddress) {
          this.form.get('province')?.setValue(currentProvince.code);
        }
      }),
      map(([provinces]) => provinces)
    );

    if (this.line === this.lineGroupEnum.MOTOR) {
      combineLatest([
        this.storePolicy.select(fromPolicy.getPolicyData),
        this.storeQuote.select(fromQuote.getQuoteMotorData)
      ])
        .subscribe((data) => {
          this.currentPolicy = data[0];
          this.currentMotor = data[0].motor.vehicles.filter(
            (c) => c.number === data[1].activeMotor
          )[0];
          this.vehicles = data[0].motor.vehicles;

          if (this.currentMotor?.zone?.state) {
            this.locations$ = this.locationService
              .getLocations(this.currentMotor?.zone?.state)
              .pipe(
                switchMap((x: any) => {
                  this.locations = x;
                  return of(x);
                })
              );
          }
          this.defaultPostalCode =
            this.currentMotor?.zone?.postalcode === null
              ? ''
              : this.currentMotor?.zone?.postalcode;
          this.defaultState = this.currentMotor?.zone?.state;
          this.defaultCity = this.currentMotor?.zone?.city;
        })
        .unsubscribe();
    } else if (this.line === this.lineGroupEnum.HOME) {
      this.quoteHomeSubscription = combineLatest([
        this.storePolicy.select(fromQuote.getQuoteHomeData),
        this.storeQuote.select(fromPolicy.getHouses)
      ]).subscribe(([homeData, houses]) => {
        this.currentHouseNumber = <number>homeData.activeHome;
        this.houses = houses;
        this.currentHouse = <IHouse>(
          this.houses.find((h) => h.id === this.currentHouseNumber)
        );
        this.defaultPostalCode =
          this.currentHouse.zone.postalcode === null
            ? ''
            : this.currentHouse.zone.postalcode;
        this.defaultState = this.currentHouse.zone.state;
        this.defaultCity = this.currentHouse.zone.city;
      });
    }

    this.postalCode.setValue(this.defaultPostalCode);
    this.form = this.fb.group({
      province: [this.defaultState, Validators.required],
      location: [this.defaultCity, Validators.required]
    });

    if (this.line === this.lineGroupEnum.MOTOR) {
      this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
        this.routes = <IRoutesMotor[]>data.routes;
      });
    } else if (this.line === this.lineGroupEnum.HOME) {
      this.storeQuote.select(fromQuote.getQuoteHomeData).subscribe((data) => {
        this.routes = <IRoutesMotor[]>data.routes;
      });
    }

    this.form
      .get('province')
      ?.valueChanges.subscribe((provinceCode: string) => {
        this.form.patchValue(
          {
            province: provinceCode,
            location: []
          },
          { emitEvent: false }
        );

        if (this.line === this.lineGroupEnum.MOTOR) {
          this.clearNextsValues();
        }

        this.locations$ = combineLatest([
          this.locationService.getLocations(provinceCode),
          this.storeProducer.select(fromProducer.getCurrentProducer),
          this.storeQuote.select(fromQuote.getActiveMotor).pipe(first()),
          this.storePolicy.select(fromPolicy.getPolicyData).pipe(first())
        ]).pipe(
          tap(([locations, producer, activeMotor, policy]) => {
            this.locations = locations;

            // Si solo vuelve un elemento en locations, entonces
            // seteo este
            if (this.locations.length === 1) {
              this.form.get('location')?.setValue(this.locations[0].city, {
                onlySelf: true,
                emitEvent: true
              });
            } else {
              const currentAddress = policy?.motor?.vehicles?.find(
                (v) => v.number === activeMotor
              )?.zone?.city;

              // Si no fue seteado con anterioridad, entonces voy a buscar
              // la mejor coincidencia para ingresarlo automáticamente
              if (!currentAddress) {
                const foundCity = stringSimilarity.findBestMatch(
                  producer.profile.city?.toUpperCase(),
                  this.locations.map((l) => l.city)
                );

                // Solo en el caso de que la coincidencia sea mayor al 70%
                if (foundCity.bestMatch.rating > 0.7) {
                  this.form
                    .get('location')
                    ?.setValue(foundCity.bestMatch.target, {
                      onlySelf: true,
                      emitEvent: true
                    });
                } else {
                  // Sino, dejo el campo vacío para que se ingrese manualmente
                  this.form
                    .get('location')
                    ?.setValue(null, { onlySelf: true, emitEvent: false });
                }
              } else {
                // Si el campo ya fue seteado con anterioridad, entonces dejo el
                // campo vacío para que lo ingresen manualmente en caso de querer
                // modificarlo
                this.form
                  .get('location')
                  ?.setValue([], { onlySelf: true, emitEvent: false });
              }
            }
          }),
          map(([locations]) => locations)
        );

        if (this.line === this.lineGroupEnum.MOTOR) {
          this.vehicles.forEach((v) => {
            if (v.number === this.currentMotor.number) {
              if (v && v.zone) {
                v.zone.state = provinceCode;
              }
            }
            this.storePolicy.dispatch(
              new fromPolicyActions.UpdateVehicleAction(this.vehicles)
            );
          });

          this.storePolicy.dispatch(
            new fromPolicyActions.SetInsuredPartialAddressAction({
              state: provinceCode,
              city: ''
            })
          );
        }
      });

    this.form.get('location')?.valueChanges.subscribe((data) => {
      if (this.line === this.lineGroupEnum.MOTOR) {
        if (this.currentMotor && this.currentMotor.zone) {
          this.currentMotor.zone.city = data;
        }

        this.vehicles.forEach((v) => {
          if (v.number === this.currentMotor.number) {
            if (v && v.zone) {
              v.zone.city = data;
              v.zone.postalcode = this.locations
                .filter((p) => p.city === data)[0]
                ?.postalcode.toString();
            }
          }

          const _location = data;

          const _province = this.provincesOnMemory.filter(
            (u) => u.code === this.currentMotor?.zone?.state
          )[0].description;
          this.routes.forEach((element) => {
            if (
              element.path ===
              'motor/' + this.currentMotor.id + '/location'
            ) {
              element.value = _province + ', ' + _location;
            }
          });

          this.storeQuote
            .select(fromQuote.getCoverageResponseMotorData)
            .pipe(
              takeUntil(this.destroyed$),
              filter((x) => x !== null)
            )
            .subscribe((c) => {
              if (c !== undefined && c !== null) {
                const numberCurrentAuto = c.motor.vehicles[0].number;
                if (numberCurrentAuto !== this.currentMotor.number) {
                  this.currentMotor = this.currentPolicy.motor.vehicles.filter(
                    (nm) => nm.number === numberCurrentAuto
                  )[0];
                }
              }

              if (c) {
                this.flowRouteService.enableRoute(
                  this.currentMotor,
                  this.routes,
                  'use'
                );
                this.clearNextsValues();
              }
            });
        });

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateVehicleAction(this.vehicles)
        );

        if (this.currentPolicy.job && this.currentPolicy.job.number !== null) {
          let action = 'edit';
          if (!this.currentMotor.added) {
            action = 'add';
          }

          this.storeQuote.dispatch(
            new fromQuoteActions.LoadCoverageMotor(
              this.currentPolicy,
              this.currentMotor,
              action
            )
          );
        } else {
          this.storeQuote.dispatch(
            new fromQuoteActions.LoadCoverageMotor(
              this.currentPolicy,
              this.currentMotor,
              null
            )
          );
        }

        this.storePolicy.dispatch(
          new fromPolicyActions.SetInsuredPartialAddressAction({
            state: this.form.get('province')?.value,
            city: data
          })
        );
        this.insuredAddress.state = this.form.get('province')?.value;
        this.insuredAddress.city = data;
        this.storeEmission.dispatch(
          new fromEmissionActions.SetPolicyAddressFromQuotesAction(
            this.insuredAddress
          )
        );
      } //close motor
      else if (this.line === this.lineGroupEnum.HOME) {
        let currentH = this.houses.find(
          (h) => h.id === this.currentHouseNumber
        );
        currentH = <IHouse>{
          ...currentH,
          zone: {
            city: <string>data,
            postalcode: <number>currentH?.zone?.postalcode,
            state: currentH?.zone?.state
          }
        };

        currentH = <IHouse>{
          ...currentH,
          zone: {
            city: <string>currentH?.zone?.city,
            postalcode: <number>currentH?.zone?.postalcode,
            state: this.form.get('province')?.value
          }
        };

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateHouseAction(this.houses)
        );

        this.flowRouteService.enableHomeRoute(
          this.currentHouseNumber,
          this.routes,
          'useconstruction',
          'location',
          <string>(
            this.provincesOnMemory?.find(
              (u) => u.code === this.form?.get('province')?.value
            )?.description
          )
        );
      }
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
        element.path !== 'motor/' + this.currentMotor.id + '/patent'
      ) {
        element.disabled = true;
        element.value = '';
      }

      if (element.path === 'motor/' + this.currentMotor.id + '/location') {
        element.disabled = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.dataByPostalCodeSubscriber) {
      this.dataByPostalCodeSubscriber.unsubscribe();
    }

    if (this.getCoverageSubscribe) {
      this.getCoverageSubscribe.unsubscribe();
    }
    this.destroyed$.next(true);
    this.destroyed$.complete();
    if (this.initialSubscription) {
      this.initialSubscription.unsubscribe();
    }

    if (this.quoteHomeSubscription) {
      this.quoteHomeSubscription.unsubscribe();
    }
  }
}
