import cloneDeep from 'lodash/cloneDeep';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, of, combineLatest, EMPTY } from 'rxjs';
import {
  IGender,
  GenderService,
  IDocument,
  IdentificationService,
  ICrudIncome,
  AccountService,
  IAccount,
  INationality,
  NationalityService,
  IAddress,
  IPolicy,
  IVehicle,
  IMaritalStatus,
  MaritalStatusService,
  ClienteNService,
  IClienteN,
  UtilService,
  ContactsService,
  IOfficialIds,
  IProvince,
  ProvinceService,
  QuotingService,
  IPackage
} from '@sura-platform/features';

import { PolicyAdapter } from '../../../quoting/adapters/policy.adapter';
import { FlowRouteEmissionService } from '../../../quoting/components/emission/services/flow-route-emission.service';
import * as fromEmission from '../../../quoting/components/emission/state';
import * as fromEmissionActions from '../../../quoting/components/emission/state/emission.actions';

import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';
import { Store } from '@ngrx/store';

import * as fromPolicy from '../../../quoting/state/policy/index';
import * as fromQuote from '../../../quoting/components/quote/state';
import * as fromPolicyActions from '../../../quoting/state/policy/policy.actions';
import * as fromQuoteActions from '../../../quoting/components/quote/state/quote.actions';
import { ModalComponent, SelectComponent } from '@sura-platform/web';
import { switchMap, catchError, tap, share } from 'rxjs/operators';
import { ApplicationError } from '@sura-platform/core/error/errors';
import * as moment from 'moment';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
//import { IFault } from '@sura-platform/core/error/error.interface';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { ActivatedRoute } from '@angular/router';
import { IMotorConfiguration } from '../../../quoting/components/motor/motor.config';
import { IPremium } from '@sura-platform/features/package/interfaces/premium.interface';
import { ICoverage } from '@sura-platform/features/coverage';

@Component({
  selector: 'sxf-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit, OnDestroy {
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    loop: false,
    autoplay: false
  };

  suraLoaderConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };

  buttonLabel = 'Validar';
  buttonAnimated: any;

  constructor(
    private fb: FormBuilder,
    private genderService: GenderService,
    private identificationService: IdentificationService,
    private flowRouteEmissionService: FlowRouteEmissionService,
    private storeEmission: Store<fromEmission.State>,
    private accountService: AccountService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private nationalityService: NationalityService,
    private maritalStatusService: MaritalStatusService,
    private _clientNService: ClienteNService,
    private utilService: UtilService,
    private contactService: ContactsService,
    private provinceService: ProvinceService,
    private route: ActivatedRoute,
    private policyAdapter: PolicyAdapter,
    private quotingService: QuotingService
  ) {
    this.motorConfig = this.route.snapshot.data.config;
  }

  @ViewChild('documentType') documentSelect: SelectComponent = <
    SelectComponent
  >{};

  @ViewChild('modalClient', { static: true }) modalClient: ModalComponent = <
    ModalComponent
  >{};

  @ViewChild('modalNoClient', { static: true })
  modalNoClient: ModalComponent = <ModalComponent>{};

  @ViewChild('modalUW', { static: true }) modalUW: ModalComponent = <
    ModalComponent
  >{};

  @ViewChild('modalMobility') modalMobility: ModalComponent = <
    ModalComponent
  >{};

  @ViewChild('newCosts') modalNewCosts: ModalComponent = <ModalComponent>{};
  //@ViewChild('content', { static: false }) content: ElementRef;

  routes: IRoutes[] = <IRoutes[]>[];

  accounts: IAccount = <IAccount>{};

  /**
   * Disabled fields for US-5573
   */
  disabledFields = false;

  /**
   * Variable Fiscal condition for get data from api
   */
  fiscalConditions$: Subscription = new Subscription();

  /**
   * Variable Crud income for get data from api
   */
  iibb$: Observable<ICrudIncome[]> = new Observable();

  isValidateDocument = false;

  client$: Observable<any> = new Observable();

  clientFromEmission$: Observable<IAccount> = new Observable();

  searchClient$: Observable<any> = new Observable();

  isLegalPerson = 'undefined';

  form: FormGroup = <FormGroup>{};

  loadingData = false;

  formPhysicalPerson: FormGroup = <FormGroup>{};

  formLegalPerson: FormGroup = <FormGroup>{};

  genders$: Observable<IGender[]> = new Observable();

  maritalStatus$: Observable<IMaritalStatus[]> = new Observable();

  documents$: Observable<IDocument[]> = new Observable();

  nationalities$: Observable<INationality[]> = new Observable();

  disabledByRetrieve$: Subscription = new Subscription();
  disabledByRetrieve: boolean;

  maxLength = 8;
  documentDescription = 'DNI';

  currentAccount: IAccount = <IAccount>{};

  currentPolicy: IPolicy = <IPolicy>{};
  currentMotor: IVehicle = <IVehicle>{};
  vehicles: IVehicle[] = <IVehicle[]>[];
  showForms = false;
  currentData: any;
  currentAccountEmission: any;
  clientBaseN$: Observable<IClienteN[]> = new Observable();
  accountReset: IAccount = <IAccount>{};
  accountResetSubscription: Subscription = new Subscription();

  provincesFromApi: IProvince[] = <IProvince[]>[];

  resetResidenceValues: IAddress = {
    state: null,
    id: null,
    city: null,
    postalcode: null,
    street: null,
    streetnumber: null,
    apartment: null,
    floor: null,
    type: null,
    clarification: null
  };

  currentBlackList = false;

  maxDateClient: any;
  minDateClient: any;
  motorConfig: IMotorConfiguration[];

  /**
   * True whether policy has mobility active
   *
   * @memberof ClientDataComponent
   */
  hasMobility = false;

  MOBILITY_CODE = 'SURA_CA7_MobilityTheftDamageCov';

  /**
   * True whether call costs endpoint, recotización
   *
   * @memberof ClientDataComponent
   */
  loadingCosts = false;
  newQuote = '';

  callCostsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.provinceService
      .getAllProvinces()
      .subscribe((provs) => (this.provincesFromApi = provs));

    this.utilService.getCurrentServerDate().subscribe((data) => {
      const currentDate = new Date(data.datetime); // moment().add(9, 'month');
      const currentDateForMinDateTime = new Date(data.datetime);
      const date = {
        year: currentDate.getFullYear() - 16,
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
      };
      this.maxDateClient = date;

      const minDateTime = {
        year: currentDateForMinDateTime.getFullYear() - 116,
        month: currentDateForMinDateTime.getMonth() + 1,
        day: currentDateForMinDateTime.getDate()
      };

      this.minDateClient = minDateTime;
    });
    this.accountResetSubscription = this.storeQuote
      .select(fromPolicy.getInitialAccountState)
      .subscribe((initState) => {
        this.accountReset = initState;
      });

    this.genders$ = this.genderService.getGenders();

    this.maritalStatus$ = this.maritalStatusService.getMaritalStatus();

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).subscribe((data) => {
      this.currentPolicy = data[0];
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === data[1].activeMotor
      )[0];
      this.vehicles = data[0].motor.vehicles;

      // Se busca si algún vehículo tiene movilidad
      this.vehicles.some((v) => {
        const currentPkg = v?.packages?.find((p) => p.selected);

        this.hasMobility = <boolean>(
          currentPkg?.coverages?.some(
            (c) => c.pattern.code === this.MOBILITY_CODE
          )
        );

        // Si al menos un vehiculo tiene movilidad se sale
        if (this.hasMobility) {
          return true;
        }
      });
    });

    this.form = this.fb.group({
      document: [
        !this.currentPolicy.client.documentType
          ? 'SSN'
          : this.currentPolicy.client.documentType,
        Validators.required
      ],
      documentNumber: [
        this.currentPolicy.client.documentNumber,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(8)
        ]
      ]
    });

    this.documents$ = this.identificationService.getDocumentTypes();

    this.nationalities$ = this.nationalityService.getNationalities().pipe(
      switchMap((x) => {
        const nationatiliesFromServer = [];
        const argentino = x.filter((g) => g.description === 'Argentino(a)')[0];

        nationatiliesFromServer.push(argentino);

        x.filter((j) => j.code !== 'N010').forEach((f) => {
          nationatiliesFromServer.push(f);
        });

        return of(nationatiliesFromServer);
      })
    );

    this.storeEmission.select(fromEmission.getRoutes).subscribe((data) => {
      this.routes = data;
    });

    this.formPhysicalPerson = this.fb.group({
      firstname: [
        ,
        [
          Validators.required,
          Validators.pattern('[A-zÀ-ÿ ]*'),
          Validators.maxLength(100)
        ]
      ],
      lastname: [
        ,
        [
          Validators.required,
          Validators.pattern('[A-zÀ-ÿ ]*'),
          Validators.maxLength(100)
        ]
      ],
      birth: [, Validators.required],
      nationality: [, Validators.required],
      maritalstatus: [, Validators.required],
      gender: [, Validators.required],
      prefix: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/)
        ]
      ],
      phone: [
        ,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
          Validators.maxLength(60)
        ]
      ],
      exposedPerson: [false]
    });

    this.formPhysicalPerson
      .get('birth')
      ?.valueChanges.pipe(
        switchMap((x) => {
          const _birthDate = moment(x).subtract(1, 'months');
          return of(_birthDate);
        })
      )
      .subscribe();

    this.formLegalPerson = this.fb.group({
      companyname: [, [Validators.required, Validators.maxLength(255)]],
      consortium: [],
      officialorganism: [],
      prefix: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          Validators.pattern(/^\d+$/)
        ]
      ],
      phone: [
        ,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      email: [
        ,
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          )
        ]
      ]
    });

    this.client$ = this.storePolicy.select(fromPolicy.getClientData).pipe(
      switchMap((x: IAccount) => {
        this.currentAccount = x;
        // Si es persona fisica
        if (x.type === 'Person') {
          this.isLegalPerson = 'not';
          this.form.patchValue(
            {
              document:
                x.documentType === null
                  ? this.form.get('document')?.value
                  : x.documentType,
              documentNumber:
                x.documentNumber === null
                  ? this.form.get('documentNumber')?.value
                  : x.documentNumber
            },
            { emitEvent: false }
          );

          this.formPhysicalPerson.patchValue({
            firstname: x.firstname?.toUpperCase(),
            lastname: x.lastname?.toUpperCase(),
            birth: !isNullOrUndefined(x.birth)
              ? {
                  year: parseInt(x.birth.substring(0, 4), 0),
                  month: parseInt(x.birth.substring(5, 7), 0),
                  day: parseInt(x.birth.substring(8, 10), 0)
                }
              : null,
            nationality: x.nationality,
            maritalstatus: x.maritalstatus,
            gender: x.gender,
            prefix: !isNullOrUndefined(x.cellphone) ? x.cellphone.area : [],
            phone: !isNullOrUndefined(x.cellphone) ? x.cellphone.number : [],
            email: x.email,
            exposedPerson: x.politicallyexposed
          });
        } else if (x.type === 'Company') {
          this.isLegalPerson = 'yes';
          this.openModalMobility();
          this.form.patchValue(
            {
              document: x.documentType,
              documentNumber: x.documentNumber
            },
            { emitEvent: false }
          );
          this.form.updateValueAndValidity();
          this.formLegalPerson.patchValue({
            companyname: x.companyname?.toUpperCase(),
            consortium: x.consortium,
            prefix: x.workphone?.area,
            phone: x.workphone?.number,
            officialorganism: x.officialorganism,
            email: x.email
          });
        }
        return of(x);
      }),
      share()
    );

    this.clientFromEmission$ = this.storeEmission.select(
      fromEmission.getClientData
    );

    this.form.get('documentNumber')?.valueChanges.subscribe(() => {
      this.formPhysicalPerson.reset();
      this.formLegalPerson.reset();
      this.isLegalPerson = 'undefined';
      this.currentBlackList = false;
    });

    this.form.get('document')?.valueChanges.subscribe((data: any) => {
      this.maxLength = 11;
      switch (data) {
        case 'SSN':
          this.maxLength = 8;
          this.documentDescription = 'DNI';
          break;
        case 'FEIN':
          this.maxLength = 11;
          this.documentDescription = 'CUIT';
          break;
        case 'CUILSura':
          this.maxLength = 11;
          this.documentDescription = 'CUIL';
          break;
        case 'PassportSura':
          this.documentDescription = 'Pasaporte';
          //this.maxLength = 0;
          break;
      }
      this.formPhysicalPerson.reset();
      this.formLegalPerson.reset();
      this.currentBlackList = false;

      this.form.get('documentNumber')?.reset();
      this.isLegalPerson = 'undefined';
    });

    // ML: Verificar y deshabilitar el form en caso de que el usuario
    // ya estaba asignado desde RETRIEVE
    this.disabledByRetrieve$ = combineLatest([
      this.storeEmission.select(fromEmission.getEmission),
      this.storePolicy.select(fromPolicy.getClientData)
    ]).subscribe((x) => {
      const job = x[0].jobNumberFromQuotes;
      const approved = x[0].approvedEmission;
      const client = x[1];

      this.disabledByRetrieve =
        job && approved && client.accountnumber ? true : false;

      if (this.disabledByRetrieve)
        this.formPhysicalPerson.get('exposedPerson')?.disable();
    });
  }

  validateDocumentNumber() {
    if (
      this.form.get('document')?.value === 'FEIN' &&
      parseInt(this.form.get('documentNumber')?.value.substring(0, 2), 0) >= 30
    ) {
      this.isLegalPerson = 'yes';
      this.openModalMobility();
    } else {
      this.isLegalPerson = 'not';
    }

    this.checkClienteN(this.form.get('documentNumber')?.value);

    // Reset depende de form
    const accountReset: IAccount = {
      ...this.accountReset,
      type: this.isLegalPerson === 'yes' ? 'Company' : 'Person',
      documentType: this.form.get('document')?.value,
      documentNumber: this.form.get('documentNumber')?.value,
      address: <IAddress>{
        ...this.accountReset.address,
        state: <string>this.currentPolicy.insured?.address?.state,
        city: <string>this.currentPolicy.insured?.address?.city
      }
    };

    // Se setean vacias las propiedades client para policy y para emission.
    this.storePolicy.dispatch(
      new fromPolicyActions.SetClientDataAction(accountReset)
    );

    this.storeEmission.dispatch(
      new fromEmissionActions.SetClientData(accountReset)
    );

    // Se limpia la descripcion de la ruta

    this.routes.forEach((element) => {
      if (element.path === 'residence') {
        element.value = '';
      }
    });

    // Se limpia la propiedad address para policy

    this.storePolicy.dispatch(
      new fromPolicyActions.SetAddressAction({
        ...this.resetResidenceValues,
        city: <string>this.currentPolicy.insured?.address?.city,
        state: <string>this.currentPolicy.insured?.address?.state
      })
    );

    const requestAccount: any = {
      officialid: {
        type: this.form.get('document')?.value,
        value: this.form.get('documentNumber')?.value
      }
    };

    const requestContact = {
      type: this.isLegalPerson === 'yes' ? 'Company' : 'Person',
      officialid: this.form.get('documentNumber')?.value
    };

    // Si el form (tipoDoc y nroDoc) es valido, entonces...
    this.formPhysicalPerson.reset();
    this.formLegalPerson.reset();

    this.loadingData = true;
    this.buttonLabel = 'Validando';
    this.buttonAnimated.playSegments([[0, 119]], true);

    // Busco por cuenta y por contacto..
    this.searchClient$ = combineLatest([
      this.accountService.getAccounts(requestAccount),
      this.contactService.getContacts(requestContact)
    ]).pipe(
      switchMap((x) => {
        const fromAccount = x[0];
        const fromContact = x[1];
        const typePerson = this.isLegalPerson === 'yes' ? 'Company' : 'Person';
        this.buttonAnimated.playSegments([[120, 175]], false);
        setTimeout(() => {
          this.buttonLabel = 'Validado';
        }, 2000);
        this.loadingData = false;
        // No encontre nada en account ni en contact
        if (!fromAccount && !fromContact) {
          return of(EMPTY);
        } else {
          // Si encuentro en account
          if (fromAccount) {
            fromAccount.documentNumber = this.form.get('documentNumber')?.value;
            fromAccount.documentType = this.form.get('document')?.value;
            fromAccount.address = fromAccount.primaryaddress;
            this.storePolicy.dispatch(
              new fromPolicyActions.SetClientDataAction(fromAccount)
            );
            this.storeEmission.dispatch(
              new fromEmissionActions.SetClientData(cloneDeep(fromAccount))
            );
          } else {
            const fromContactAddress = fromContact[0].address.split('|');
            const _address: IAddress = {
              id: fromContactAddress[0],
              street: fromContactAddress[1],
              streetnumber: fromContactAddress[2],
              floor: fromContactAddress[3],
              apartment: fromContactAddress[4],
              postalcode: fromContactAddress[5],
              city: fromContactAddress[6],
              state: this.provincesFromApi.filter(
                (p) => p.description === fromContactAddress[7]
              )[0].code,
              clarification: null,
              type: 'home'
            };
            // Plancho en policy
            this.storePolicy.dispatch(
              new fromPolicyActions.SetBasicDataForClientAction(
                typePerson,
                fromContact[0].companyname.toUpperCase(),
                fromContact[0].firstname.toUpperCase(),
                fromContact[0].lastname.toUpperCase(),
                fromContact[0].id,
                this.form.get('documentNumber')?.value,
                this.form.get('document')?.value,
                _address
              )
            );
            // Plancho en emission
            this.storeEmission.dispatch(
              new fromEmissionActions.SetBasicDataForClientAction(
                typePerson,
                fromContact[0].companyname.toUpperCase(),
                fromContact[0].firstname.toUpperCase(),
                fromContact[0].lastname.toUpperCase(),
                fromContact[0].id,
                this.form.get('documentNumber')?.value,
                this.form.get('document')?.value,
                _address
              )
            );
          }
          this.routes.forEach((element) => {
            if (element.path === 'client') {
              element.value =
                this.isLegalPerson === 'yes'
                  ? this.formLegalPerson.get('companyname')?.value
                  : this.formPhysicalPerson.get('firstname')?.value +
                    ' ' +
                    this.formPhysicalPerson.get('lastname')?.value;
            }
          });
          this.storeEmission.dispatch(
            new fromEmissionActions.SetRoutes(this.routes)
          );

          return of(EMPTY);
        }
      }),
      catchError((err: ApplicationError) => {
        this.loadingData = false;
        //si no pertenece el cliente a ese grupo comercial
        if (parseInt(err.code, 0) === -1) {
          this.openModalNoClient();
        }
        return of([]);
      }),
      share()
    );
  }

  checkClienteN(officialId: any) {
    this.clientBaseN$ = this._clientNService.validateClientN(officialId).pipe(
      tap((ctl) => {
        let blackList = false;
        if (ctl !== null && ctl.length > 0) {
          blackList = true;
        }

        this.currentBlackList = blackList;

        if (this.currentBlackList) this.modalUW.openModal();
      })
    );
  }

  continue() {
    const officialids: IOfficialIds[] = [];
    officialids.push({
      primary: true,
      type: this.form.get('document')?.value,
      value: this.form.get('documentNumber')?.value
    });
    this.currentAccount.officialids = officialids;

    if (this.isLegalPerson === 'not' && this.formPhysicalPerson.valid) {
      const formData = this.formPhysicalPerson.getRawValue();
      (this.currentAccount.contactid = !this.currentAccount.contactid
        ? null
        : this.currentAccount.contactid),
        (this.currentAccount.documentNumber = this.form.get(
          'documentNumber'
        )?.value),
        (this.currentAccount.documentType = this.form.get('document')?.value),
        (this.currentAccount.firstname = formData.firstname),
        (this.currentAccount.lastname = formData.lastname),
        (this.currentAccount.fiscalcondition = !this.currentAccount
          .fiscalcondition
          ? this.currentPolicy.fiscalcondition
          : this.currentAccount.fiscalcondition);
      this.currentAccount.type = 'Person';
      this.currentAccount.maritalstatus = formData.maritalstatus;
      this.currentAccount.nationality = formData.nationality;
      this.currentAccount.gender = formData.gender;
      this.currentAccount.email = formData.email;
      this.currentAccount.birth = moment(
        formData.birth.year +
          '-' +
          formData.birth.month +
          '-' +
          formData.birth.day
      ).format();
      this.currentAccount.politicallyexposed = formData.exposedPerson;
      this.currentAccount.blacklist = this.currentBlackList;
      this.currentAccount.cellphone = {
        area: formData.prefix,
        number: formData.phone
      };

      let workPhone = '';
      if (this.currentAccount?.workphone) {
        workPhone =
          (this.currentAccount.workphone.area || '') +
          (this.currentAccount.workphone.number || '');
      }

      this.storePolicy.dispatch(
        new fromPolicyActions.SetInspectionPhoneNumberAction(workPhone)
      );
    } else if (this.formLegalPerson.valid && this.isLegalPerson === 'yes') {
      const formData = this.formLegalPerson.getRawValue();
      (this.currentAccount.contactid = !this.currentAccount.contactid
        ? null
        : this.currentAccount.contactid),
        (this.currentAccount.documentNumber = this.form.get(
          'documentNumber'
        )?.value),
        (this.currentAccount.documentType = this.form.get('document')?.value),
        (this.currentAccount.companyname = formData.companyname);
      this.currentAccount.fiscalcondition = !this.currentAccount.fiscalcondition
        ? this.currentPolicy.fiscalcondition
        : this.currentAccount.fiscalcondition;
      this.currentAccount.email = formData.email;
      this.currentAccount.consortium = formData.consortium;
      this.currentAccount.officialorganism = formData.officialorganism;
      this.currentAccount.blacklist = this.currentBlackList;
      this.currentAccount.type = 'Company';
      this.currentAccount.workphone = {
        area: formData.prefix,
        number: formData.phone
      };

      let phone = '';
      if (this.currentAccount?.workphone) {
        phone =
          (this.currentAccount.workphone.area || '') +
          (this.currentAccount.workphone.number || '');
      }

      this.storePolicy.dispatch(
        new fromPolicyActions.SetInspectionPhoneNumberAction(phone)
      );
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.SetClientDataAction(this.currentAccount)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetMailDataAction(<string>this.currentAccount.email)
    );
    const vhc = this.vehicles.filter(
      (x) => x.number === this.currentMotor.number
    );
    if (this.disabledByRetrieve) {
      //TODO: Implementar de otra forma la detección del retrieve
    } else if (
      this.isLegalPerson === 'not' &&
      vhc.length > 0 &&
      vhc[0].driver
    ) {
      vhc[0].driver.clientIsDriver = this.motorConfig?.filter(
        (p) => p.vehicleType === this.currentMotor.group
      )[0]?.clientIsDriver;
    } else if (this.vehicles) {
      if (vhc.length > 0 && vhc[0].driver) {
        vhc[0].driver.clientIsDriver = false;
      }
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.flowRouteEmissionService.enableRoute(this.routes, 'residence');

    this.storeEmission.dispatch(
      new fromEmissionActions.SetActiveRoute('residence')
    );

    this.routes.forEach((element) => {
      if (element.path === 'residence') {
        element.value = '';
      }
    });

    this.routes.forEach((element) => {
      if (element.path === 'client') {
        element.value =
          this.isLegalPerson === 'yes'
            ? this.formLegalPerson.get('companyname')?.value
            : this.formPhysicalPerson.get('firstname')?.value +
              ' ' +
              this.formPhysicalPerson.get('lastname')?.value;
      }
    });

    this.flowRouteEmissionService.enableRoute(this.routes, 'residence');

    if (this.formLegalPerson.valid || this.formPhysicalPerson.valid) {
      this.storeEmission.dispatch(
        new fromEmissionActions.SetFormEmissionClientIsValidAction(true)
      );
    }
  }

  closeModal() {
    this.modalClient.closeModal();
  }

  openModal() {
    this.modalClient.openModal();
  }

  closeModalNoClient() {
    this.modalNoClient.closeModal();
  }

  openModalNoClient() {
    this.modalNoClient.openModal();
  }

  ngOnDestroy(): void {
    if (this.fiscalConditions$) {
      this.fiscalConditions$.unsubscribe();
    }
    if (this.accountResetSubscription) {
      this.accountResetSubscription.unsubscribe();
    }

    if (this.disabledByRetrieve$) {
      this.disabledByRetrieve$.unsubscribe();
    }

    if (this.callCostsSubscription) {
      this.callCostsSubscription.unsubscribe();
    }
  }

  /**
   * Control lottie animation
   */
  animationCreated(animationItem: AnimationItem): void {
    this.buttonAnimated = animationItem;
  }

  closeUWModal(action?: string) {
    if (action === 'continue') {
      this.modalUW.closeModal();
      return;
    }

    this.form.get('documentNumber')?.setValue('');
    this.modalUW.closeModal();
  }

  /**
   * Open modal mobility whether policy has mobility active
   *
   * @memberof ClientDataComponent
   */
  openModalMobility() {
    if (this.hasMobility) {
      this.modalMobility.openModal();
    }
  }

  closeModalMobility() {
    this.form.get('documentNumber')?.setValue('', { emitEvent: true });
    this.form.get('document')?.setValue('SSN', { emitEvent: true });
    this.modalMobility.closeModal();
  }

  continueIsLegalPerson() {
    this.loadingCosts = true;
    this.modalMobility.closeModal();
    this.modalNewCosts.openModal();

    // Se sacan los paquetes de movilidad
    this.vehicles.forEach((v) => {
      const currentPkg = v?.packages?.find((p) => p.selected);
      if (currentPkg) {
        currentPkg.coverages = <ICoverage[]>(
          currentPkg?.coverages?.filter(
            (c) => c.pattern.code !== this.MOBILITY_CODE
          )
        );
      }
    });

    // Se hace la recotización
    const adapted = this.policyAdapter.adapt(this.currentPolicy);
    adapted.motor.vehicles.forEach((v) => {
      v.packages = <IPackage[]>v.packages?.filter((p) => p.selected);
    });

    this.callCostsSubscription = this.quotingService
      .getCosts(adapted)
      .subscribe((newCosts) => {
        // Solo guardaré en costs la cotización del vehículo actual
        const packageSelected = this.currentMotor?.packages?.find(
          (p) => p.selected
        );

        this.storePolicy.dispatch(
          new fromPolicyActions.UpdateCostsAction(
            newCosts.costs?.filter((c: any) =>
              c.externalId
                .split('&')
                .includes(
                  `${this.currentPolicy.productcode},${this.currentMotor.number},${packageSelected?.code}`
                )
            )
          )
        );

        this.vehicles.forEach((v) => {
          // Actualizar preminewCostsums con el resultado de la nueva cotización
          const selected = v?.packages?.find((p) => p.selected);

          // Buscar error en motor.errors de este vehículo y paquete
          const error = newCosts.errors?.find((e: any) =>
            e.externalId
              .split('&')
              .includes(
                `${this.currentPolicy.productcode},${v.number},${selected?.code}`
              )
          );

          // Busco los datos del paquete con la nueva cotización si existiera
          const newPackage = newCosts.motor.vehicles
            ?.find((costVehicle: any) => costVehicle.number === v.number)
            ?.packages.find((p: any) => p.code === selected?.code);

          if (!error?.code) {
            if (selected) {
              selected.premiums = <IPremium>newPackage?.premiums;
            }

            this.newQuote = newCosts.costs
              ?.find((c: any) =>
                c.externalId
                  .split('&')
                  .includes(
                    `${this.currentPolicy.productcode},${v.number},${selected?.code}`
                  )
              )
              .invoice.toString();
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
  }

  closeModalNewCosts() {
    this.modalNewCosts.closeModal();
  }
}
