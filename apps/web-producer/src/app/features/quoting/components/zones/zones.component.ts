import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { BaseComponent } from '@sura-platform/core';
import {
  LocationService,
  ProvinceService,
  IProvince,
  ILocation,
  IHouse
} from '@sura-platform/features';
import { FlowRouteService } from '../quote/services/flow-route.service';
import * as fromQuote from '../quote/state';
import * as fromPolicy from '../../state/policy';
import * as fromPolicyActions from '../../state/policy/policy.actions';
import { lineGroup } from '../../containers/line.enum';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

@Component({
  selector: 'sxf-zones',
  templateUrl: 'zones.component.html',
  styleUrls: ['zones.component.scss']
})
export class ZonesComponent extends BaseComponent implements OnInit, OnDestroy {
  cpForm = <FormGroup>{};
  locationForm = <FormGroup>{};
  showCPForm = true;

  /**
   * Array of provinces
   *
   * @type {Observable<IProvince[]>}
   * @memberof ZonesComponent
   */
  provinces$: Observable<IProvince[]> = new Observable();

  /**
   * Array of locations
   *
   * @type {Observable<ILocation[]>}
   * @memberof ZonesComponent
   */
  locations$: Observable<ILocation[]> = new Observable();

  /**
   * Subscription for locations
   *
   * @type {Subscription}
   * @memberof ZonesComponent
   */
  locationsSubscription: Subscription = new Subscription();

  /**
   * Subscription for home quote
   *
   * @type {Subscription}
   * @memberof ZonesComponent
   */
  quoteHomeSubscription: Subscription = new Subscription();

  /**
   * Postal Code value to store
   *
   * @type {(number | null)}
   * @memberof ZonesComponent
   */
  postalCode: number | null = null;

  /**
   * Province value to store
   *
   * @memberof ZonesComponent
   */
  province: string | null = null;

  /**
   * Array of provinces
   *
   * @type {IProvince[]}
   * @memberof ZonesComponent
   */
  provinces: IProvince[] = [];

  /**
   * Location value to store
   *
   * @memberof ZonesComponent
   */
  location: string | null = null;

  /**
   * Array of locations
   *
   * @type {ILocation[]}
   * @memberof ZonesComponent
   */
  locations: ILocation[] = [];

  /**
   * Current line
   *
   * @memberof ZonesComponent
   */
  currentLine: string | null = null;

  /**
   * Current house number
   *
   * @type {(number | null)}
   * @memberof ZonesComponent
   */
  currentHouseNumber: number | null = null;

  /**
   * Current house
   *
   * @type {IHouse}
   * @memberof ZonesComponent
   */
  currentHouse: IHouse = {} as IHouse;

  /**
   * Array of houses
   *
   * @type {IHouse[]}
   * @memberof ZonesComponent
   */
  houses: IHouse[] = [];

  /**
   * Routes for Home
   *
   * @type {IRoutes[]}
   * @memberof ZonesComponent
   */
  routes: IRoutes[] = [];

  /**
   * true go from Código Postal form, false go from Provincia Localidad form
   *
   * @memberof ZonesComponent
   */
  isPostalCode = true;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private provinceService: ProvinceService,
    private flowRouteService: FlowRouteService,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>
  ) {
    super();
  }

  ngOnInit() {
    this.storeQuote.select(fromQuote.getCurrentLine).subscribe((line) => {
      this.currentLine = line;

      if (this.currentLine === lineGroup.HOME) {
        this.loadHomeData();
      }

      this.selectPostalCode();
    });

    this.provinces$ = this.provinceService
      .getAllProvinces()
      .pipe(tap((provinces: any) => (this.provinces = provinces)));

    this.cpForm = this.fb.group({
      postalCode: [
        this.postalCode,
        [Validators.pattern(/^(|\d)+$/), Validators.maxLength(4)]
      ]
    });

    if (this.postalCode) {
      // Se marca cpForm como dirty
      this.cpForm.markAsDirty();
    }

    this.locationForm = this.fb.group({
      province: [this.province, Validators.required],
      location: [this.location, Validators.required]
    });

    this.locationForm
      .get('province')
      ?.valueChanges.subscribe((province: string) => {
        if (province) {
          this.locationForm.get('location')?.enable();
          this.locations$ = this.locationService
            .getLocations(province)
            .pipe(tap((locations: any) => (this.locations = locations)));
        } else {
          this.locationForm.get('location')?.disable();
          this.locationForm.get('location')?.setValue('', {
            onlySelf: true,
            emitEvent: true
          });
        }
        this.province = province;
      });

    this.locationForm
      .get('location')
      ?.valueChanges.subscribe((city: string) => {
        this.location = city;
      });

    this.cpForm.get('postalCode')?.setValue(this.postalCode, {
      onlySelf: true,
      emitEvent: true
    });
    this.locationForm.get('province')?.setValue(this.province, {
      onlySelf: true,
      emitEvent: true
    });
    this.locationForm.get('location')?.setValue(this.location, {
      onlySelf: true,
      emitEvent: true
    });
  }

  searchByPostalCode(cp: number) {
    if (cp) {
      this.locationsSubscription = this.locationService
        .getLocationAndProvince(cp)
        .subscribe((locations: any) => {
          if (locations && locations.length > 0) {
            // Por definición de US 7943
            // Cuando haya 2 localidades asociadas al mismo cp se tomara por default el primero que aparezca.
            // En instancia de emision se definira como se resuelve esta situacion
            this.province = locations[0].state.code;
            this.locationForm.get('province')?.setValue(this.province, {
              onlySelf: true,
              emitEvent: true
            });
            this.location = locations[0].city;
            this.locationForm.get('location')?.setValue(this.location, {
              onlySelf: true,
              emitEvent: true
            });
            this.postalCode = cp;

            this.continue();
          } else {
            this.cpForm.get('postalCode')?.setErrors({ pattern: true });
            return;
          }
        });
    } else {
      this.cpForm.get('postalCode')?.setErrors({ pattern: true });
      return;
    }
  }

  searchByProvinceLocation() {
    this.postalCode =
      this.locations?.find((v: any) => v.city === this.location)?.postalcode ||
      null;
    this.continue();
  }

  selectLocation() {
    this.routes.forEach((element) => {
      if (element.path === 'home/' + this.currentHouse.id + '/zones') {
        element.question = '¿Cuál es la ubicación de la vivienda?';
        element.value = this.postalCode ? ' ' : '';
      }
    });
    this.showCPForm = false;
    this.isPostalCode = false;
    this.locationForm.get('province')?.setValue('', {
      onlySelf: true,
      emitEvent: true
    });
  }

  selectPostalCode() {
    this.routes.forEach((element) => {
      if (element.path === 'home/' + this.currentHouse.id + '/zones') {
        element.question = '¿Cuál es el código postal de la vivienda?';
        element.value = this.postalCode ? this.postalCode.toString() : '';
      }
    });
    this.showCPForm = true;
    this.isPostalCode = true;
  }

  continue() {
    if (this.currentLine === lineGroup.HOME) {
      this.continueHome();
    }
  }

  loadHomeData() {
    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeData),
      this.storeQuote.select(fromPolicy.getHouses)
    ]).subscribe(([homeData, houses]) => {
      this.currentHouseNumber = homeData.activeHome;
      this.houses = houses;
      this.currentHouse = this.houses.find(
        (h) => h.id === this.currentHouseNumber
      ) as IHouse;
      this.routes = <IRoutes[]>homeData.routes;
      this.postalCode = this.currentHouse.zone.postalcode;
      this.province = this.currentHouse.zone.state;
      this.location = this.currentHouse.zone.city;
    });
  }

  storeHomeData() {
    const house = this.houses.find(
      (h) => h.id === this.currentHouseNumber
    ) as IHouse;

    house.zone.city = this.location as string;
    house.zone.state = this.province as string;
    house.zone.postalcode = this.postalCode as number;

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );
  }

  continueHome() {
    const provinceDescription = this.provinces?.find(
      (u: any) => u.code === this.province
    )?.description;

    this.storeHomeData();

    let value = '';

    if (this.isPostalCode) {
      value = `${this.postalCode}`;
    } else {
      value = `${provinceDescription}, ${this.location}`;
    }

    this.flowRouteService.enableHomeRoute(
      this.currentHouseNumber as number,
      this.routes,
      'useconstruction',
      'zones',
      value
    );
  }

  ngOnDestroy() {
    if (this.locationsSubscription) {
      this.locationsSubscription.unsubscribe();
    }

    if (this.quoteHomeSubscription) {
      this.quoteHomeSubscription.unsubscribe();
    }
  }
}
