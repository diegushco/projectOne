import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable, of, combineLatest, Subscription, EMPTY } from 'rxjs';
import {
  IProvince,
  ProvinceService,
  LocationService,
  ILocation,
  IAddress,
  AddressTypeService,
  IAddressType,
  IAccount,
  IVehicle,
  IPolicy,
  QuotingService,
  IPackage
} from '@sura-platform/features';
import {
  switchMap,
  tap,
  filter,
  map,
  groupBy,
  mergeMap,
  toArray,
  catchError,
  first
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromQuote from '../../../quoting/components/quote/state';
import * as fromQuoteActions from '../../../quoting/components/quote/state/quote.actions';
import * as fromPolicy from '../../../quoting/state/policy';
import * as fromPolicyActions from '../../../quoting/state/policy/policy.actions';
import { PolicyAdapter } from '../../../quoting/adapters/policy.adapter';
import * as fromEmission from '../../../quoting/components/emission/state';
import * as fromEmissionActions from '../../../quoting/components/emission/state/emission.actions';
import { FlowRouteEmissionService } from '../../../quoting/components/emission/services/flow-route-emission.service';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { ModalComponent } from '@sura-platform/web';
import { AnimationOptions } from 'ngx-lottie';
import { IPremium } from '@sura-platform/features/package/interfaces/premium.interface';
// import * as fromPolicyActions from '../../../quoting/state/policy/policy.actions';

@Component({
  selector: 'sxf-client-residence',
  templateUrl: './client-residence.component.html',
  styleUrls: ['./client-residence.component.scss']
})
export class ClientResidenceComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  zipCode = new FormControl('');
  formClientResidence: FormGroup = <FormGroup>{};
  provinces$: Observable<IProvince[]> = new Observable();
  policyclientaddress$: Observable<IAddress> = new Observable();
  primaryClientAddress$: Observable<IAddress> = new Observable();
  provinceDescription = '';
  locations$: Observable<ILocation[]> = new Observable();
  routes: IRoutes[] = <IRoutes[]>[];
  residences$: Observable<any> = new Observable();
  addressType$: Observable<IAddressType[]> = new Observable();
  defaultAddressType = '';
  dataByPostalCodeSubscriber: Subscription = new Subscription();
  dataByPostalCode$: Observable<any> = new Observable();
  arrProvinces: IProvince[] = <IProvince[]>[];
  addressIdSelected = '';
  filledQuestion = false;
  loadingPostalCode = false;
  client: IAccount = <IAccount>{};
  clientIsEditable = false;
  vehicles: IVehicle[] = <IVehicle[]>[];
  currentMotor: IVehicle = <IVehicle>{};
  currentPolicy: IPolicy = <IPolicy>{};
  loadingCosts = false;
  newQuote = '';
  getClientFromStore$: Subscription = new Subscription();

  @ViewChild('newCosts') modalNewCosts: ModalComponent = <ModalComponent>{};

  disabledByRetrieve$: Subscription = new Subscription();
  disabledByRetrieve = false;
  policySubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private locationService: LocationService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private flowRouteEmissionService: FlowRouteEmissionService,
    private storeEmission: Store<fromEmission.State>,
    private _addressTypeService: AddressTypeService,
    private quotingService: QuotingService,
    private policyAdapter: PolicyAdapter
  ) {}

  ngOnInit() {
    this.formClientResidence = this.fb.group({
      id: [null],
      state: [, Validators.required],
      city: [, Validators.required],
      postalcode: [, Validators.required],
      street: [, Validators.required],
      streetnumber: [, Validators.required],
      apartment: [],
      floor: [],
      type: [, Validators.required],
      clarification: []
    });

    this.storeEmission
      .select(fromEmission.getClientData)
      .subscribe((data) => (this.clientIsEditable = <boolean>data.editable));

    this.storePolicy.select(fromPolicy.getClientData).subscribe((data) => {
      this.client = data;
    });

    this.policySubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((data) => {
      this.vehicles = data[0].motor.vehicles;
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];
      this.currentPolicy = data[0];
    });

    this.provinces$ = this.provinceService.getAllProvinces().pipe(
      switchMap((x) => {
        this.arrProvinces = x;
        return of(x);
      })
    );

    this.addressType$ = this._addressTypeService.getAddressType().pipe(
      tap((ty) => {
        this.defaultAddressType = ty[0].code;
        this.loadAddressSave();
      })
    );
    this.addressIdSelected = '';

    // ML: Verificar y deshabilitar el form en caso de que el usuario
    // ya estaba asignado desde RETRIEVE
    this.disabledByRetrieve$ = this.storeEmission
      .select(fromEmission.getEmission)
      .subscribe((emission) => {
        const job = emission.jobNumberFromQuotes;
        const approved = emission.approvedEmission;

        this.disabledByRetrieve = job && approved ? true : false;
      });
  }

  loadAddressSave() {
    this.storeEmission.select(fromEmission.getRoutes).subscribe((data) => {
      this.routes = data;
    });

    //Para evitar busqueda por codigo postal cuando ya hay guardada una direccion nueva
    this.routes.forEach((element) => {
      if (element.path === 'residence') {
        if (element.value === null) {
          this.filledQuestion = false;
        } else {
          this.filledQuestion = true;
        }
      }
    });

    this.residences$ = combineLatest([
      this.storeEmission.select(fromEmission.getClientAddresses),
      this.storePolicy.select(fromPolicy.getClientData)
    ]).pipe(
      switchMap((idd) => {
        if (idd[0] === null) idd[0] = [];
        const arrayAddress = idd[0].filter((jk) => jk.postalcode);

        if (!(arrayAddress.length > 0)) {
          if (
            idd &&
            idd.length > 1 &&
            idd[1]?.address?.postalcode !== null &&
            idd[1]?.address?.postalcode !== ''
          ) {
            this.addAddress(<any>idd[1].address);
          } else {
            this.addAddress([]);
          }
        }

        //si hay una sola la selecciono por defecto siempre que no este ya una previamente guardada (cuando se vuelve una pregunta atras)
        if (
          arrayAddress.length === 1 &&
          idd &&
          idd.length > 0 &&
          idd[1]?.address?.postalcode === null
        ) {
          this.selectAddress(arrayAddress[0]);
        }
        return of(arrayAddress);
      })
    );

    this.formClientResidence.get('state')?.valueChanges.subscribe((data) => {
      if (data !== null) {
        // this.locations$ = this.locationService.getLocations(data);

        this.locations$ = this.locationService.getLocations(data).pipe(
          tap((x) => {
            if (x.length === 1) {
              this.formClientResidence
                ?.get('city')
                ?.setValue(x[0].city, { onlySelf: true, emitEvent: true });
            } else {
              this.formClientResidence
                ?.get('city')
                ?.setValue([], { onlySelf: true, emitEvent: false });
            }
          })
        );
      }
    });

    this.primaryClientAddress$ = <Observable<IAddress>>(
      this.storePolicy.select(fromPolicy.getPrimaryAddressClient)
    );

    this.getClientFromStore$ = combineLatest([
      this.storePolicy.select(fromPolicy.getClientData),
      this.provinceService.getAllProvinces(),
      this.storePolicy.select(fromPolicy.getAddress)
    ])
      .pipe(
        filter(
          (x) =>
            x[0].address !== undefined &&
            x[0].address !== null &&
            x[0].address.state !== null
        ),
        switchMap((x: any) => {
          const province = x[1].filter(
            (p: any) => p.code === x[0].address.state
          )[0];
          this.provinceDescription = province.description;
          this.formClientResidence.patchValue(
            {
              id: x[0].address.id,
              state: x[0].address.state,
              city: x[0].address.city,
              postalcode: x[0].address.postalcode,
              street: x[0].address.street,
              streetnumber: x[0].address.streetnumber,
              apartment: x[0].address.apartment,
              floor: x[0].address.floor,
              type: x[0].address.type,
              clarification: x[0].address.clarification
            },
            { emitEvent: false }
          );
          if (x[0].address.id !== undefined)
            this.addressIdSelected = x[0].address.id;

          return of(x[0].address);
        })
      )
      .subscribe();

    this.formClientResidence
      .get('postalcode')
      ?.valueChanges.subscribe((data) => {
        if (data !== null && data.length === 4 && !this.filledQuestion) {
          this.loadingPostalCode = true;
          this.validatePostalCode();
        }
      });
  }

  selectAddress(address: any) {
    this.addressIdSelected = address.id;
    this.clientIsEditable = false;
    this.formClientResidence.patchValue(
      {
        id: address.id ? address.id : null,
        state: address.state ? address.state : null,
        city: address.city ? address.city : null,
        postalcode: address.postalcode ? address.postalcode : null,
        street: address.street ? address.street : null,
        streetnumber: address.streetnumber ? address.streetnumber : null,
        apartment: address.apartment ? address.apartment : null,
        floor: address.floor ? address.floor : null,
        type: address.type ? address.type : null,
        clarification: address.clarification ? address.clarification : null
      },
      { emitEvent: false }
    );

    // const addressTemp = {
    //   ...this.formClientResidence.value,
    //   id: address.id
    // };

    this.storePolicy.dispatch(
      new fromPolicyActions.SetAddressAction(this.formClientResidence.value)
    );
  }

  addAddress(address: any) {
    this.clientIsEditable = true;
    if (address.length === 0) {
      this.filledQuestion = false;
      this.addressIdSelected = '';
      this.formClientResidence.reset();

      this.formClientResidence.patchValue(
        {
          type: this.defaultAddressType
        },
        { emitEvent: true }
      );
    } else {
      this.addressIdSelected = address?.id;
      this.formClientResidence.patchValue(
        {
          id: address?.id,
          state: address?.state,
          city: address?.city,
          postalcode: address?.postalcode,
          street: address?.street,
          streetnumber: address?.streetnumber,
          apartment: address?.apartment,
          floor: address?.floor,
          type: address?.type,
          clarification: address?.clarification
        },
        { emitEvent: false }
      );
    }
  }

  onEnter() {
    if (this.formClientResidence.valid) {
      this.continue();
    }
  }

  continue() {
    this.storePolicy.dispatch(
      new fromPolicyActions.SetAddressAction(this.formClientResidence.value)
    );

    // ML: En caso de ser cliente existente, debo enviar el policy.address
    if (
      this.client.accountnumber &&
      this.formClientResidence.get('id')?.value === null
    )
      this.storePolicy.dispatch(
        new fromPolicyActions.SetPolicyAddressAction(
          this.formClientResidence.value
        )
      );

    this.callCost();
  }

  callCost() {
    if (this.disabledByRetrieve) {
      this.closeModalNewCosts();
      return;
    }

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeEmission.select(fromEmission.getPolicyAddressFromQuote)
    ])
      .pipe(first())
      .subscribe(([policy, address]) => {
        if (
          policy?.client?.address?.state === address?.state &&
          policy?.client?.address?.city === address?.city
        ) {
          this.closeModalNewCosts();
          return;
        }

        this.loadingCosts = true;
        this.modalNewCosts.openModal();

        const adapted = this.policyAdapter.adapt(policy);
        adapted.motor.vehicles.forEach((v) => {
          v.packages = <IPackage[]>v?.packages?.filter((p) => p.selected);
        });

        this.quotingService.getCosts(adapted).subscribe((newCosts: IPolicy) => {
          // Solo guardaré en costs la cotización del vehículo actual
          const packageSelected = this.currentMotor?.packages?.find(
            (p) => p.selected
          );

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateCostsAction(
              newCosts.costs?.filter((c) =>
                c.externalId
                  .split('&')
                  .includes(
                    `${this.currentPolicy.productcode},${this.currentMotor.number},${packageSelected?.code}`
                  )
              )
            )
          );

          this.vehicles.forEach((v) => {
            // Actualizar premiums con el resultado de la nueva cotización
            const selected = v?.packages?.find((p) => p.selected);

            // Buscar error en motor.errors de este vehículo y paquete
            const error = newCosts.errors?.find((e) =>
              e.externalId
                .split('&')
                .includes(
                  `${this.currentPolicy.productcode},${v.number},${selected?.code}`
                )
            );

            // Busco los datos del paquete con la nueva cotización si existiera
            const newPackage = newCosts?.motor?.vehicles
              ?.find((costVehicle) => costVehicle.number === v.number)
              ?.packages?.find((p) => p.code === selected?.code);

            if (!error?.code) {
              if (selected) {
                selected.premiums = <IPremium>newPackage?.premiums;
              }

              this.newQuote = <string>(
                newCosts?.costs
                  ?.find((c) =>
                    c?.externalId
                      ?.split('&')
                      ?.includes(
                        `${this.currentPolicy.productcode},${v.number},${selected?.code}`
                      )
                  )
                  ?.invoice.toString()
              );
              this.newQuote = <string>(
                (this.newQuote ? parseFloat(this.newQuote).toFixed(2) : '')
              );
            } else {
              if (selected) {
                selected.premiums = <IPremium>{};
              }

              this.newQuote = '';
            }
          });

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(this.vehicles)
          );

          this.storeQuote.dispatch(
            new fromQuoteActions.SetCostsResponseAction(newCosts)
          );

          this.loadingCosts = false;
        });
      })
      .unsubscribe();
  }

  closeModalNewCosts() {
    this.modalNewCosts.closeModal();
    this.routes.forEach((element) => {
      if (element.path === 'residence') {
        element.value =
          this.client?.address?.street +
          ' ' +
          this.client?.address?.streetnumber +
          ', ' +
          this.arrProvinces.filter(
            (f) => f.code === this.client?.address?.state
          )[0].description;
      }
    });

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('tax-condition')
    );

    if (this.formClientResidence.valid) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetFormEmissionResidenceIsValidAction(true)
      );
    }

    this.flowRouteEmissionService.enableRoute(this.routes, 'tax-condition');
  }

  validatePostalCode() {
    this.formClientResidence
      ?.get('city')
      ?.setValue([], { onlySelf: true, emitEvent: false });

    this.provinces$ = this.provinceService.getAllProvinces();

    this.locations$ = this.locationService
      .getLocationAndProvince(this.formClientResidence.get('postalcode')?.value)
      .pipe(
        map((locations) => locations),
        tap((x) => {
          if (x) {
            x = x.filter((zx) => zx.postalcode);
            if (x.length === 1) {
              this.formClientResidence
                ?.get('city')
                ?.setValue(x[0].city, { onlySelf: true, emitEvent: true });
            } else {
              this.formClientResidence
                ?.get('city')
                ?.setValue([], { onlySelf: true, emitEvent: false });
            }
          }
        })
      );

    this.dataByPostalCode$ = this.locations$.pipe(
      groupBy((state) => state.map((x) => x.state.description)),
      mergeMap((x) => combineLatest([of(x.key), x.pipe(toArray())])),
      map((x) => x[0])
    );

    this.dataByPostalCodeSubscriber = this.dataByPostalCode$
      .pipe(
        map((x) => {
          if (x) {
            this.loadingPostalCode = false;
            const codes = x;
            const distinctCodes: any[] = Array.from(new Set(codes));

            if (distinctCodes.length === 1) {
              const codeProvince = this.arrProvinces.filter(
                (zg) => zg.description === distinctCodes[0].toString()
              )[0];

              this.formClientResidence
                ?.get('state')
                ?.setValue(codeProvince.code, {
                  onlySelf: true,
                  emitEvent: false
                });
              return distinctCodes[0];
            } else {
              // this.searchingLocations = false;
              this.formClientResidence
                ?.get('state')
                ?.setValue([], { onlySelf: true, emitEvent: false });
              return EMPTY;
            }
          }
        }),
        catchError(() => {
          this.formClientResidence
            .get('state')
            ?.setValue([], { onlySelf: true, emitEvent: false });
          this.formClientResidence
            .get('city')
            ?.setValue([], { onlySelf: true, emitEvent: false });
          this.loadingPostalCode = false;
          // alert(
          //   'La busqueda no trajo ningun resultado. Cargue los datos manualmente.'
          // );
          return of([]);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.disabledByRetrieve$) this.disabledByRetrieve$.unsubscribe();
    if (this.getClientFromStore$) this.getClientFromStore$.unsubscribe();
    if (this.policySubscription) this.policySubscription.unsubscribe();
  }
}
