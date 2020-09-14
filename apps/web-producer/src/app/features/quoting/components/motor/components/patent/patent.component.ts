import cloneDeep from 'lodash/cloneDeep';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as fromPolicy from '../../../../state/policy';
import * as fromQuote from '../../../quote/state';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

import {
  IVehicle,
  CarService,
  BrandService,
  ModelService,
  IBrand,
  IModel,
  IPolicy,
  PatentUseService,
  PatentBlackListService,
  VehicleGroup
} from '@sura-platform/features';
import { IRoutes } from '../../../../interfaces/routes.interface';
import { Store } from '@ngrx/store';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, of, Observable } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import * as stringSimilarity from 'string-similarity';
import _map from 'lodash/map';
import { ModalComponent } from '@sura-platform/web';
import { IconConfig } from '@sura-platform/web';
import { IMotorConfiguration } from '../../motor.config';

export const patentPatternMotos = /^(\d{3}[a-zA-Z]{3}|[a-zA-Z]{1}\d{3}[a-zA-Z]{3})$/;
export const patentPatternAutos = /^([a-zA-Z]{2}\d{3}[a-zA-Z]{2}|[a-zA-Z]{3}\d{3}|[a-zA-Z]{3}\d{2})$/;
export const patentPatternOtros = /^(101([a-zA-Z]{2}\d{3}[a-zA-Z]{2}|[a-zA-Z]{3}\d{3}|[a-zA-Z]{3}\d{2})|101(\d{2}[a-zA-Z]{3}\d{2}))$/;
@Component({
  selector: 'sxf-patent',
  templateUrl: './patent.component.html',
  styleUrls: ['./patent.component.scss']
})
export class PatentComponent implements OnInit, OnDestroy {
  motorConfig: IMotorConfiguration;

  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    loop: false,
    autoplay: false
  };

  public expirationDateMask = [/[1-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  patentPattern = new RegExp(
    patentPatternMotos.source + '|' + patentPatternAutos.source
  );

  patent = new FormControl('');

  @ViewChild('modalUW', { static: true }) modalUW: ModalComponent = <
    ModalComponent
  >{};

  @ViewChild('modalPatentInUse', { static: true })
  modalPatentInUse: ModalComponent = <ModalComponent>{};

  /*
   * List of application routes.
   */
  routes: IRoutes[] = <IRoutes[]>{};
  currentMotor: IVehicle = <IVehicle>{};
  vehicles: IVehicle[] = <IVehicle[]>{};
  vehiclesClone: IVehicle[] = <IVehicle[]>{};
  currentPolicy: IPolicy = <IPolicy>{};
  /**
   *
   * Define the current group when we search by patent.
   * @type {string}
   * @memberof PatentComponent
   */
  currentGroup: VehicleGroup = <VehicleGroup>{};
  initialStateVehicle: IVehicle = <IVehicle>{};
  loadingPatent = false;
  buttonLabel = 'Validar';
  buttonAnimated: any;
  openedModalPatentInUse = false;

  /**
   * Icon text for tooltip on patent input
   *
   * @memberof PatentComponent
   */
  iconTooltip =
    'Ingresá la patente en formatos: AA999AA, AAA999, A999AAA, 999AAA, AAA99';

  /**
   * Icon configuration for textbox
   *
   * @type {IconConfig}
   * @memberof PatentComponent
   */
  iconConfig: IconConfig = <IconConfig>{};

  /**
   * Subscription to route changes on
   * quote store
   *
   * @type {Subscription}
   * @memberof PatentComponent
   */
  quoteRoutesSubscription: Subscription = new Subscription();

  /**
   * Subscription to policy and quote store
   *
   * @type {Subscription}
   * @memberof PatentComponent
   */
  storeSubscription: Subscription = new Subscription();

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private carService: CarService,
    private patentBlackListService: PatentBlackListService,
    private brandService: BrandService,
    private modelService: ModelService,
    private flowRouteService: FlowRouteService,
    private patentUse: PatentUseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.motorConfig = this.route.snapshot.data.config;
  }

  ngOnInit() {
    this.iconConfig = {
      display: true,
      type: 'info',
      color: 'blue',
      tooltip: this.iconTooltip
    };
    this.storeSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.storeQuote.select(fromPolicy.getInitialState)
    ])
      .pipe(
        switchMap((x) => {
          this.initialStateVehicle = cloneDeep(x[2]);

          const currentCar: IVehicle = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];

          if (
            currentCar &&
            currentCar.license !== null &&
            currentCar.license !== ''
          ) {
            this.patent.setValue(currentCar.license.toUpperCase());
          }
          this.vehicles = x[0].motor.vehicles;
          this.currentPolicy = x[0];
          return of(currentCar);
        })
      )
      .subscribe((data) => {
        this.currentMotor = data;
      });

    this.quoteRoutesSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((data) => {
        this.routes = <IRoutes[]>data.routes;
      });

    this.patent.valueChanges.subscribe((data) => {
      // tslint:disable-next-line: no-eval
      const evalString = new RegExp(/[a-zA-Z]?\d{3}[a-zA-Z]{3}/).test(data);
      if (evalString) {
        this.currentGroup = VehicleGroup.MOTO;
      } else {
        this.currentGroup = VehicleGroup.AUTO;
      }
    });
  }

  validatePatent() {
    if (!this.patentPattern.test(this.patent.value)) {
      this.patent.setErrors({ pattern: true });
      return;
    }
    this.openedModalPatentInUse = false;
    this.loadingPatent = true;
    this.buttonLabel = 'Validando';
    this.buttonAnimated.playSegments([[0, 119]], true);
    if (this.patent.value === '') {
      this.dontKnowPatent();
    } else {
      this.resetStatePolicy();
      const prd: string = <string>this.currentPolicy?.period?.start?.toString();
      const startDatecurrentPolicy = new Date(prd);
      const startDate =
        startDatecurrentPolicy.getDate() +
        '-' +
        ('0' + (startDatecurrentPolicy.getMonth() + 1)).slice(-2) +
        '-' +
        startDatecurrentPolicy.getFullYear();
      startDatecurrentPolicy.setMonth(startDatecurrentPolicy.getMonth() + 3);
      const endDate =
        startDatecurrentPolicy.getDate() +
        '-' +
        ('0' + (startDatecurrentPolicy.getMonth() + 1)).slice(-2) +
        '-' +
        startDatecurrentPolicy.getFullYear();

      //Se valida pagente en uso contra GW
      this.patentUse
        .validePatentInUse(this.patent.value, startDate, endDate)
        .subscribe((data) => {
          const patentInUse = data;
          if (
            patentInUse !== null &&
            patentInUse.length > 0 &&
            patentInUse[0].fixedid !== ''
          ) {
            this.openModalPatentInUse();
            this.openedModalPatentInUse = true;
          } else {
            //Patente no esta en uso, se valida en BASE-N
            this.checkBlackList(this.patent.value);
          }
        });
    }
  }

  setPatentInUse(value: any) {
    this.vehicles.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        v.patentInUse = value;
      }
    });
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );
  }

  tryMatchBrand(year: number, brandFound: string): Observable<any> {
    return this.brandService.getBrands(year, this.currentGroup).pipe(
      map((brands: IBrand[]) => {
        const brandDesc = brands.map((b) => b.description);
        const matches = stringSimilarity.findBestMatch(
          brandFound,
          <string[]>brandDesc
        );
        const brandBestMatch = brands.find(
          (b) => b.description === matches.bestMatch.target
        );

        // Debe coincidir un 80% como mínimo
        if (matches.bestMatch.rating < 0.8) {
          // En caso de no coincidir, entonces ingresar únicamente el año
          // y elegir tipo y marca de vehículo
          this.flowRouteService.enableRoute(
            this.currentMotor,
            this.routes,
            'brand'
          );
        } else {
          if (this.currentMotor && this.currentMotor.brand) {
            this.currentMotor.brand.code = <number>brandBestMatch?.code;
            this.currentMotor.brand.description = <string>(
              brandBestMatch?.description
            );
          }

          this.settingTitlesSteps('brand', brandBestMatch?.description);
        }
        return of(brandBestMatch);
      })
    );
  }

  tryMatchShortModel(
    year: number,
    brand: number,
    modelFound: string
  ): Observable<any> {
    return this.modelService
      .getShortModels(year, brand, this.currentGroup)
      .pipe(
        map((models: IModel[]) => {
          const modelsDesc = models.map((m) => m.description);
          const matches = stringSimilarity.findBestMatch(
            modelFound,
            <string[]>modelsDesc
          );
          const modelBestMatch = models.find(
            (m) => m.description === matches.bestMatch.target
          );

          // Debe coincidir un 10% como mínimo
          if (matches.bestMatch.rating < 0.1) {
            // En caso de no coincidir, entonces ingresar únicamente el año
            // y elegir tipo y marca de vehículo
            this.settingTitlesSteps('brand', null);
            if (this.currentMotor && this.currentMotor.brand) {
              this.currentMotor.brand.code = null;
              this.currentMotor.brand.description = null;
            }
            this.flowRouteService.enableRoute(
              this.currentMotor,
              this.routes,
              'brand'
            );
          } else {
            this.currentMotor.shortModel = <string>modelBestMatch?.description;
            this.settingTitlesSteps('model', modelBestMatch?.description);
          }

          return of(modelBestMatch);
        })
      );
  }

  tryMatchModels(
    year: number,
    brand: number,
    model: string,
    modelFound: string
  ): Observable<any> {
    return this.modelService
      .getModels(year, brand, model, this.currentGroup)
      .pipe(
        map((models) => {
          const modelDesc = models.map((m) => m.description);
          const matches = stringSimilarity.findBestMatch(
            modelFound,
            <string[]>modelDesc
          );
          const modelBestMatch = models.find(
            (m) => m.description === matches.bestMatch.target
          );

          // Debe coincidir un 10% como mínimo
          if (matches.bestMatch.rating < 0.3) {
            // En caso de no coincidir, entonces ingresar únicamente el año
            // y elegir tipo y marca de vehículo
            this.settingTitlesSteps('brand', null);
            this.settingTitlesSteps('model', null);
            if (this.currentMotor && this.currentMotor.brand) {
              this.currentMotor.brand.code = null;
              this.currentMotor.brand.description = null;
              this.currentMotor.shortModel = null;
            }

            this.flowRouteService.enableRoute(
              this.currentMotor,
              this.routes,
              'brand'
            );
          } else {
            if (this.currentMotor && this.currentMotor.model) {
              this.currentMotor.model.code = <number>modelBestMatch?.code;
              this.currentMotor.model.description = <string>(
                modelBestMatch?.description
              );
              this.currentMotor.model.statementamount = <number>(
                modelBestMatch?.statementamount
              );
              this.currentMotor.model.originalcostnew = <number>(
                modelBestMatch?.originalcostnew
              );

              this.currentMotor.model.type = <string>modelBestMatch?.type;
            }

            this.settingTitlesSteps('version', modelBestMatch?.description);

            this.flowRouteService.enableRoute(
              this.currentMotor,
              this.routes,
              'location'
            );

            return of(modelBestMatch);
          }
        })
      );
  }

  /**
   * Settings titles for steps. (JC)
   *
   * @param {*} data
   * @memberof PatentComponent
   */
  settingTitlesSteps(step: string, value: any, disabled = false) {
    // Begin Setting titles
    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/' + step) {
        element.value = value;

        if (disabled !== null) {
          element.disabled = disabled;
        }
      }
    });
  }

  enableAllSteps() {
    this.routes.forEach((element) => {
      if (
        element.path === 'motor/' + this.currentMotor.id + '/use' ||
        element.path === 'motor/' + this.currentMotor.id + '/sum'
      ) {
        element.disabled = true;
        element.value = '';
      } else {
        element.disabled = false;
      }
    });
    this.storeQuote.dispatch(new fromQuoteActions.SetRoutesMotor(this.routes));
  }

  resetStatePolicy() {
    this.vehiclesClone = cloneDeep(this.vehicles);

    this.vehiclesClone.forEach((v) => {
      if (v.number === this.currentMotor.number) {
        let tempValues = cloneDeep(v);
        //inicializar a los valores del state, no funciono..por eso seteo uno a uno
        tempValues = this.initialStateVehicle;
        tempValues.id = v.number;
        tempValues.license = null;
        tempValues.chasis = null;
        tempValues.motor = null;
        tempValues.year = null;
        tempValues.use = null;
        tempValues.activity = null;
        tempValues.destination = null;
        tempValues.gnc = false;
        tempValues.gps = false;
        tempValues.group = null;
        tempValues.blacklist = false;
        (tempValues.packages = [
          {
            code: null,
            coverages: null,
            limitrc: null,
            premiums: null,
            costs: null,
            coveragesQuoted: null,
            group: null,
            externalid: null,
            description: null,
            selected: null
          }
        ]),
          (tempValues.brand = {
            code: null,
            description: null
          }),
          (tempValues.statedamount = null),
          (tempValues.model = {
            code: null,
            description: null,
            statementamount: null,
            originalcostnew: null,
            type: null,
            year: null
          }),
          (tempValues.zone = {
            state: null,
            postalcode: null,
            city: null
          }),
          (tempValues.garage = null),
          (tempValues.kmstraveled = null),
          (tempValues.useName = null),
          (tempValues.patentInUse = false),
          (tempValues.driver = {
            firstname: null,
            lastname: null,
            birth: null,
            gender: null,
            clientIsDriver: true
          }),
          (tempValues.zerokm = false),
          (tempValues.shortModel = null);
        return tempValues;
      }
    });
    //reseteando todos los valores de preguntas seteados si se cargo previamente una pantente y todos los datos
    this.resetQuestions();

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehiclesClone)
    );
  }

  dontKnowPatent() {
    this.resetStatePolicy();

    this.flowRouteService.enableRoute(this.currentMotor, this.routes, 'year');

    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor(
        'motor/' + this.currentMotor.id + '/year'
      )
    );

    this.routes.forEach((element) => {
      if (element.path === 'motor/' + this.currentMotor.id + '/patent') {
        element.value = 'Pendiente';
      }
    });

    this.router.navigateByUrl(
      'quoting/quote/questions/motor/' + this.currentMotor.id + '/year'
    );
  }

  onEnter() {
    if (this.patent.valid && this.patent.value !== '') {
      this.checkBlackList(this.patent.value);
    } else {
      this.dontKnowPatent();
    }
  }

  resetQuestions() {
    this.settingTitlesSteps('patent', null, <any>false);
    this.settingTitlesSteps('year', null, <any>true);
    this.settingTitlesSteps('brand', null, <any>true);
    this.settingTitlesSteps('model', null, <any>true);
    this.settingTitlesSteps('version', null, <any>true);
    this.settingTitlesSteps('use', null, <any>true);
    this.settingTitlesSteps('sum', null, <any>true);
    this.settingTitlesSteps('location', null, <any>true);
  }

  ngOnDestroy(): void {
    if (this.quoteRoutesSubscription)
      this.quoteRoutesSubscription.unsubscribe();
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

  /**
   * Control lottie animation
   */
  animationCreated(animationItem: AnimationItem): void {
    this.buttonAnimated = animationItem;
  }

  continuePatentValidate() {
    if (this.openedModalPatentInUse) {
      this.closeModalPatentInUse(<any>'continue');
      this.setPatentInUse(true);
    } else {
      this.setPatentInUse(false);
    }

    this.loadingPatent = true;
    this.buttonLabel = 'Validando';
    this.buttonAnimated.playSegments([[0, 119]], true);

    let merlinData: any = {};

    this.carService
      .getCar(this.patent.value)
      .pipe(
        // TODO: ML - Verificar qué objeto debemos mandar ante un error
        tap((data: any) => {
          this.buttonAnimated.playSegments([[120, 175]], false);
          setTimeout(() => {
            this.buttonLabel = 'Validado';
          }, 2000);

          enum Status {
            error = 1,
            invalidData = 2,
            valid = 0
          }

          let status = Status.valid;

          if (data === null || data === undefined) {
            status = Status.invalidData;
          } else {
            if (data.year !== undefined) {
              if (data.year.toString().length < 4) {
                status = Status.invalidData;
              }
            }

            if (data.brand !== undefined) {
              if (data.brand.description.toString().length < 1) {
                status = Status.invalidData;
              }
            }

            if (data.model !== undefined) {
              if (data.model.description.toString().length < 1) {
                status = Status.invalidData;
              }
            }

            if (data.errorMessage) {
              if (data.errorMessage.length > 0) {
                status = Status.error;
              }
            }
          }

          if (status !== Status.valid) {
            // TODO: Aplicar el modal aca. y el confirm del modal ejecutar la region flow route.
            alert(
              'La busqueda no trajo ningun resultado. Cargue los datos manualmente.'
            );

            this.currentMotor.license = this.patent.value
              .toString()
              .toUpperCase();
            this.settingTitlesSteps(
              'patent',
              this.patent.value.toString().toUpperCase()
            );

            // region: Flow route
            this.flowRouteService.enableRoute(
              this.currentMotor,
              this.routes,
              'year'
            );

            this.storeQuote.dispatch(
              new fromQuoteActions.SetActiveRouteMotor(
                'motor/' + this.currentMotor.id + '/year'
              )
            );
            this.router.navigateByUrl(
              'quoting/quote/questions/motor/' + this.currentMotor.id + '/year'
            );
            // end region: Flow route
          } else {
            merlinData = data;
            this.currentMotor.license = this.patent.value
              .toString()
              .toUpperCase();
            this.settingTitlesSteps(
              'patent',
              this.patent.value.toString().toUpperCase()
            );

            this.currentMotor.year = data.year;
            this.settingTitlesSteps('year', data.year);

            this.enableAllSteps();

            this.currentMotor.use = null;
            this.currentMotor.destination = null;
            this.currentMotor.activity = null;
            this.currentMotor.gnc = false;
            this.currentMotor.chasis = data.chassis;
            this.currentMotor.motor = data.motor;

            this.vehicles.forEach((v) => {
              if (v.number === this.currentMotor.number) {
                v.use = this.currentMotor.use;
                v.destination = this.currentMotor.destination;
                v.activity = this.currentMotor.activity;
                v.gnc = this.currentMotor.gnc;
                v.group = this.currentGroup;
              }
            });
          }
        }),
        switchMap(() => {
          return this.tryMatchBrand(
            <number>this.currentMotor.year,
            merlinData.brand.description
          );
        }),
        switchMap(() => {
          if (merlinData.model.description !== '') {
            return this.tryMatchShortModel(
              <number>this.currentMotor?.year,
              <number>this.currentMotor?.brand?.code,
              <string>merlinData.model.description
            );
          } else {
            return of([]);
          }
        }),
        switchMap(() => {
          if (merlinData?.model?.description !== '') {
            return this.tryMatchModels(
              <number>this.currentMotor.year,
              <number>this.currentMotor?.brand?.code,
              <string>this.currentMotor.shortModel,
              <string>merlinData.model.description
            );
          } else {
            return of([]);
          }
        }),
        tap(() => (this.loadingPatent = false)),
        catchError(() => {
          this.loadingPatent = false;
          return of([]);
        })
      )
      .subscribe();
  }

  closeModalPatentInUse(action = null) {
    this.loadingPatent = false;
    this.buttonAnimated.playSegments([[120, 175]], false);
    this.buttonLabel = 'Validar';
    this.modalPatentInUse.closeModal();
    if (action !== 'continue') {
      this.patent.setValue('');
    }
  }

  openModalPatentInUse() {
    this.modalPatentInUse.openModal();
  }

  checkBlackList(patent: string) {
    this.loadingPatent = true;

    this.patentBlackListService
      .validePatent(patent, null as any, null as any)
      .pipe(
        tap(() => {
          this.loadingPatent = false;
        })
      )
      .subscribe((res) => {
        let blacklist = false;

        if (res !== null && res.length > 0) {
          blacklist = true;
        }

        if (blacklist) {
          this.modalUW.openModal();
        } else {
          //Patente no esta en uso y tampoo en BASE-N
          //Continua con validacion para traer la data
          this.continuePatentValidate();
        }
      });
  }

  closeUWModal(action?: string) {
    if (action === 'continue') {
      this.modalUW.closeModal();
      this.continuePatentValidate();
      return;
    }

    this.loadingPatent = false;
    this.buttonAnimated.playSegments([[120, 175]], false);
    this.buttonLabel = 'Validar';

    this.patent.setValue('');
    this.modalUW.closeModal();
  }

  /**
   * Filter key event
   *
   * @param {*} event
   * @memberof PatentComponent
   */
  keyUp(event: any) {
    this.selectIcon(event.target.value);
  }

  /**
   * Find icon and select this
   *
   * @private
   * @param {string} name
   * @returns
   * @memberof PatentComponent
   */
  private selectIcon(name: string) {
    let iconName: string;
    let pattern = '';

    const arrayPattern = [
      'AA999AA',
      'AAA999',
      'A999AAA',
      '999AAA',
      'AAA99'
    ].sort();
    let patternImg: any = <any>{};
    patternImg = {
      AA999AA: ['assets/patents/PATENT_CAR_NEW.svg', '56px', 'auto'],
      AAA999: ['assets/patents/PATENT_CAR_OLD.svg', '56px', 'auto'],
      A999AAA: ['assets/patents/PATENT_MOTO_NEW.svg', '32px', 'auto'],
      '999AAA': ['assets/patents/PATENT_MOTO_OLD.svg', '32px', 'auto'],
      AAA99: ['assets/patents/PATENT_TRACTOR.svg', '32px', 'auto']
    };

    [...name].forEach((char) => {
      const ord = char.toUpperCase().charCodeAt(0);
      if (ord > 47 && ord < 58) {
        pattern += '9';
      } else if (ord > 64 && ord < 91) {
        pattern += 'A';
      }
    });

    const possiblePattern = arrayPattern.filter((item) =>
      item.startsWith(pattern)
    );

    // startWith retorna true aun cuando la cadena que se busque sea vacía
    // por eso se verifica pattern acá
    if (pattern.length > 0 && possiblePattern.length > 0) {
      iconName = possiblePattern[0];
      this.iconConfig['type'] = null as any;
      this.iconConfig['tooltip'] = '';
      this.iconConfig['url'] = patternImg[iconName][0];
      this.iconConfig['width'] = patternImg[iconName][1];
      this.iconConfig['height'] = patternImg[iconName][2];
    } else {
      this.iconConfig['type'] = 'info';
      this.iconConfig['color'] = 'blue';
      this.iconConfig['tooltip'] = this.iconTooltip;
    }
  }
}
