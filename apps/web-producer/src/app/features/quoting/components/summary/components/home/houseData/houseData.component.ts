import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import {
  IProvince,
  ProvinceService,
  IPolicy,
  IHouse,
  HomeTypesService,
  ConstructionService,
  HomeUsesService,
  ILocation,
  LocationService,
  IHomeType,
  IConstruction,
  IHomeUses
} from '@sura-platform/features';
import { tap } from 'rxjs/operators';
import * as fromPolicy from './../../../../../state/policy';
import { Store } from '@ngrx/store';
import * as fromQuote from './../../../../quote/state';
import { ModalComponent } from '@sura-platform/web';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'sxf-housedata',
  templateUrl: './houseData.component.html',
  styleUrls: ['./houseData.component.scss']
})
export class HouseDataComponent implements OnInit, OnDestroy {
  @Input() policy: IPolicy = <IPolicy>{};

  @ViewChild('modalEditData') modalEditData: ModalComponent = <
    ModalComponent
  >{};

  provinces$: Observable<IProvince[]> = new Observable();

  currentProvince = '';

  policySubscription: Subscription = new Subscription();

  currentHome: number | null = 0;

  housePolicy: IHouse = <IHouse>{};

  currentRisk = {
    province: '',
    location: '',
    type: '',
    use: '',
    construction: '',
    protection: 'Ninguna'
  };

  quoteHome: any = {};

  form: FormGroup = <FormGroup>{};

  locations$: Observable<ILocation[]> = new Observable();

  provinces: IProvince[] = [];
  locations: ILocation[] = [];

  homeUse$: Observable<IHomeUses[]> = new Observable();
  homeTypes$: Observable<IHomeType[]> = new Observable();
  constructions$: Observable<IConstruction[]> = new Observable();

  protectionMeasure = false;

  constructor(
    private provinceService: ProvinceService,
    private storePolicy: Store<fromPolicy.State>,
    private fb: FormBuilder,
    private homeTypesService: HomeTypesService,
    private constructionService: ConstructionService,
    private homeUsesService: HomeUsesService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      homeUse: [null, Validators.required],
      homeType: [null, Validators.required],
      construction: [null, Validators.required],
      province: [null, Validators.required],
      location: [null, Validators.required],
      protectionMeasure: [false, Validators.required]
    });

    this.policySubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.storePolicy.select(fromQuote.getQuoteHomeData)
    ]).subscribe((dat: any) => {
      this.currentHome = dat[0];
      this.quoteHome = dat[1];
      if (this.policy?.home?.dwellings) {
        this.housePolicy = <IHouse>(
          this.policy.home.dwellings.find(
            (h: any) => h.number === this.currentHome
          )
        );

        this.currentRisk.location = <string>this.housePolicy.zone.city;
        this.currentRisk.use = this.quoteHome.useconstruction.find(
          (uc: any) => uc.code === this.housePolicy.use
        ).description;
        this.currentRisk.type = this.quoteHome.useconstruction.find(
          (uc: any) => uc.code === this.housePolicy.type
        ).description;
        this.currentRisk.construction = this.quoteHome.useconstruction.find(
          (uc: any) => uc.code === this.housePolicy.construction
        ).description;
      }
    });

    this.provinces$ = this.provinceService.getAllProvinces().pipe(
      tap((provinces: IProvince[]) => {
        this.currentProvince = <string>(
          provinces?.find((po) => po.code === this.housePolicy.zone.state)
            ?.description
        );
        this.currentRisk.province = this.currentProvince;
        this.provinces = provinces;
      })
    );

    this.form.get('province')?.valueChanges.subscribe((province: string) => {
      if (province) {
        this.form.get('location')?.enable();
        this.loadLocation(province);
        this.form.get('location')?.setValue(null);
      } else {
        this.form.get('location')?.disable();
        this.form.get('location')?.setValue('', {
          onlySelf: true,
          emitEvent: true
        });
      }
    });
  }

  loadLocation(province: any) {
    this.locations$ = of([]);
    this.locations$ = this.locationService
      .getLocations(province)
      .pipe(tap((locations: any) => (this.locations = locations)));
  }

  openEdit() {
    this.modalEditData.openModal();
    this.homeTypes$ = this.homeTypesService.getTypes().pipe(
      tap(() => {
        this.form.get('homeType')?.setValue(this.housePolicy.type);
      })
    );
    this.constructions$ = this.constructionService.getAllConstructions().pipe(
      tap(() => {
        this.form.get('construction')?.setValue(this.housePolicy.construction);
      })
    );
    this.homeUse$ = this.homeUsesService.getUses().pipe(
      tap(() => {
        this.form.get('homeUse')?.setValue(this.housePolicy.use);
      })
    );
    this.form.get('province')?.setValue(this.housePolicy.zone.state, {
      onlySelf: true,
      emitEvent: false
    });
    this.loadLocation(this.housePolicy.zone.state);
    this.form.get('location')?.setValue(this.housePolicy.zone.city, {
      onlySelf: true,
      emitEvent: false
    });
  }

  changeProtectedAdditional(event: any) {
    this.protectionMeasure = event.target.checked;
  }

  ngOnDestroy(): void {
    if (this.policySubscription) this.policySubscription.unsubscribe();
  }
}
