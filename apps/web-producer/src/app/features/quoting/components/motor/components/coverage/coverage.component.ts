import { IOption, ICoverage } from '@sura-platform/features/coverage';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  MOTOR_CONF,
  IMotorConfiguration,
  IPackagesConfiguration
} from '../../motor.config';
import { BaseComponent } from '@sura-platform/core';
import {
  IPolicy,
  ICoverageResponse,
  QuotingService,
  IVehicle,
  VehicleGroup
} from '@sura-platform/features';

import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromQuote from '../../../quote/state';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import {
  map,
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  combineLatest,
  Subscription
} from 'rxjs';
import { IPackage } from '@sura-platform/features/package/index.js';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { unionWith, isEqual, cloneDeep } from 'lodash';
import { IRoutesMotor } from '../../interfaces/routes-motor.interface.js';
import * as fromQuoteActions from '../../../quote/state/quote.actions';
import { PolicyAdapter } from '../../../../adapters/policy.adapter';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sxf-coverage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'coverage.component.html',
  styleUrls: ['coverage.component.scss']
})
export class CoverageComponent extends BaseComponent
  implements OnInit, OnDestroy {
  /*
   * Current group selected in Tabset.
   */
  currentGroup: string | null | undefined;

  /**
   * List of coverages of currentGroup from api
   */
  filteredCoverages: any = [];

  /**
   * list of coverages
   */
  coverages: any = [];

  /**
   * List of items coverage
   */
  features$: Observable<any> | undefined;

  /**
   * Current Coverage selected
   */
  currentCoverage: any;

  /**
   * Boolean to show block compare or not
   */
  slideCompare = false;

  /**
   * Array with coverage to compare, this is for pane top
   */
  compareCoveragePane: any = [];

  /**
   * Array with coverage to compare, with all data
   */
  compareCoverageArr: any = [];

  /**
   * boolean to manage more features
   */
  morefeatures: boolean | undefined;

  /**
   * Object any for pupulate the store
   */
  currentMotor: IVehicle | undefined;

  /**
   * To show or not blocks of comparasion
   */
  showCardsCompare: boolean | undefined;

  resultCosts$ = new BehaviorSubject<any>(null);

  getCosts$ = new Subject<void>();
  getCostsFromSidebar$ = new Subject<void>();

  /**
   * variable to get policy from store
   */
  currentPolicy: IPolicy | undefined;

  clearPolicy: IPackage = {
    externalid: null,
    description: null,
    selected: null,
    code: null,
    coverages: null,
    coveragesQuoted: null,
    limitrc: null,
    premiums: null,
    costs: null,
    group: null
  };
  /**
   * Save response from /coverages
   */
  currentCoverageResponse: ICoverageResponse | undefined;

  /**
   * variable for create request to /costs
   */
  requestCost: ICoverageResponse | undefined;

  /**
   * Save current clauses
   */
  currentClause: any;

  /**
   * Save array of asistances
   */
  arrAssistance: IOption[] | undefined;

  /**
   * this is for the call to /cost
   */
  currentAssistanceByDefault: IOption | undefined;

  /**
   * Save clauses for request of /costs
   */
  coverageOptionCost: any[] = [];

  /**
   * variable to show main tabs of coverages
   */
  currentConfCoverages$: any;

  /**
   * variable to save model of car to show in the view
   */
  currentModel: any;

  /**
   * Package to send to blockcoverage component
   */
  confPck: any;

  /*
   * List of application routes.
   */
  routes: IRoutesMotor[] | undefined;

  initialSubscription: any;
  vehicles: IVehicle[] | undefined;

  pckTempAdditional: IVehicle[] = [];

  currentMotor$: Observable<IVehicle> | undefined;

  loadingCost = true;

  groupCoverageSelected: string | undefined;

  groupTR = '';

  mobilityHasVisited: boolean | null;

  // FIXME: JC Esto va a cmabiar cuando integremos con el maestro de GW.
  maxOldYear = 10;

  /**
   * Flag used to enable or disable additional
   * button
   *
   * @type {boolean}
   * @memberof BlockCoverageComponent
   */
  withAdditional: boolean | undefined;

  groupSubscription: Subscription | undefined;

  storeQuoteSubscription: Subscription | undefined;

  mobilityVisitedSubscription: Subscription | undefined;

  storeMotorDataSubscription: Subscription | undefined;

  storePolicyDataSubscription: Subscription | undefined;

  storeCurrentPolicySubscription: Subscription | undefined;

  storeDataSubscription: Subscription | undefined;

  serverDataSubscription: Subscription | undefined;

  quoteSubscription: Subscription | undefined;

  clauseSubscription: Subscription | undefined;

  costsSubscription: Subscription | undefined;

  costsResponseSubscription: Subscription | undefined;

  pckSelectedSubscription: Subscription | undefined;

  motorConfig: IMotorConfiguration[] | undefined;

  emissionStoreSubscription: Subscription | undefined;

  /**
   * Variable to check if patent is in use
   */
  patentInUse: boolean | null = false;

  currentMotorId: number | null | undefined;

  pckMotorSelected: { code: string; number: number }[] | null | undefined;

  constructor(
    private quotingService: QuotingService,
    private router: Router,
    private route: ActivatedRoute,
    private flowRouteService: FlowRouteService,
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private policyAdapter: PolicyAdapter
  ) {
    super();
    this.mobilityHasVisited = false;
  }

  /**
   * get json conf observable from ./coverages.json
   */
  initConfCoverages() {
    return of(MOTOR_CONF);
  }

  ngOnInit(): void {
    this.motorConfig = this.route.snapshot.data.config;
    //by default, doesnt show all features of coverages
    this.morefeatures = true;
    this.showCardsCompare = false;
    this.coverages = [];

    this.mobilityVisitedSubscription = this.storeQuote
      .select(fromQuote.getMobilityVisitedStatus)
      .subscribe((data) => {
        this.mobilityHasVisited = data;
      });

    this.groupSubscription = this.storeQuote
      .select(fromQuote.getGroupCoverage)
      .subscribe((data) => {
        this.currentGroup = data;
      });

    this.pckSelectedSubscription = this.storeQuote
      .select(fromQuote.getPackageSelected)
      .subscribe((hj) => {
        this.pckMotorSelected = hj;
      });

    this.storeQuoteSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((data) => {
        this.routes = data.routes;
      });

    this.storeMotorDataSubscription = this.storeQuote
      .select(fromQuote.getCoverageResponseMotorData)
      .subscribe((data) => {
        this.currentCoverageResponse = data as ICoverageResponse;
      });

    this.currentMotorId = parseInt(
      this.route.snapshot.paramMap.get('id') as string,
      0
    );

    this.currentMotor$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap((x) => {
        const vehicle = x[0].motor.vehicles.filter(
          (o) => o.number === this.currentMotorId
        );

        if (
          x[0].motor.vehicles.filter((o) => o.number === this.currentMotorId)[0]
        ) {
          const statedAmount = x[0].motor.vehicles.filter(
            (o) => o.number === this.currentMotorId
          )[0].statedamount;

          if (!this.currentGroup) {
            this.currentGroup = vehicle[0].packages?.filter(
              (bc) => bc.selected
            )[0].group;
          }

          if (
            (statedAmount as number) < 1000000 &&
            this.currentGroup === 'TR'
          ) {
            this.groupTR = 'TR';
          } else if (
            (statedAmount as number) >= 1000000 &&
            this.currentGroup === 'TR'
          ) {
            this.groupTR = 'TRFV';
          } else {
            this.groupTR = '';
          }
        }

        return vehicle;
      })
    );

    //fill tabset
    this.currentConfCoverages$ = combineLatest([
      this.initConfCoverages(),
      this.storeQuote.select(fromQuote.getCoverageResponseMotorData)
    ]).pipe(
      map(([motorConfig, coverageResponse]) => {
        //seteo el nuevo vehiculo seleccionado como currentMotor
        if (
          coverageResponse?.motor.vehicles.length &&
          this.currentMotor?.number !==
            coverageResponse.motor.vehicles[0].number
        ) {
          this.currentMotor = this.vehicles?.filter(
            (c) => c.number === coverageResponse.motor.vehicles[0].number
          )[0];
          this.currentMotorId = this.currentMotor?.number;
        }

        return this.filterPackageConfigWithCoverageResponse(
          motorConfig,
          coverageResponse
        );
      }),
      tap((packages) => {
        if (packages !== null) {
          const packageCodes = packages.map((pkg) => pkg.code);
          const currentGroup = packageCodes.includes(
            this.currentGroup as string
          )
            ? this.currentGroup
            : packageCodes[packageCodes.length - 1];

          if (!currentGroup) return;

          this.groupSelected(
            currentGroup,
            this.currentMotor?.packages?.length &&
              this.currentMotor?.packages[0]?.code === null
              ? true
              : false
          );
        }
      })
    );

    this.storeCurrentPolicySubscription = this.initialSubscription = combineLatest(
      [
        this.storePolicy.select(fromPolicy.getPolicyData),
        this.storeQuote.select(fromQuote.getQuoteMotorData),
        this.storeQuote.select(fromQuote.getActiveMotor)
      ]
    ).subscribe((data) => {
      this.currentMotorId = data[2];
      this.currentMotor = data[0].motor.vehicles.filter(
        (c) => c.number === this.currentMotorId
      )[0];

      if (this.currentMotor) {
        this.vehicles = data[0].motor.vehicles;
        this.patentInUse = this.currentMotor.patentInUse;

        this.checkIfVehicleCanHaveAdditional(
          this.currentMotor.group as VehicleGroup
        );
      }
    });

    this.storeDataSubscription = this.storePolicyDataSubscription = combineLatest(
      [
        this.storePolicy.select(fromPolicy.getPolicyData),
        this.storeQuote.select(fromQuote.getQuoteMotorData)
      ]
    )
      .pipe(
        switchMap((x) => {
          const currentCar = x[0].motor.vehicles.filter(
            (c) => c.number === x[1].activeMotor
          )[0];
          this.vehicles = x[0]?.motor?.vehicles;
          if (x[1]?.groupCoverage !== null) {
            this.groupCoverageSelected = x[1]?.groupCoverage;
          }

          if (currentCar) {
            return of(currentCar.shortModel);
          }
          return of([]);
        })
      )
      .subscribe((data) => {
        this.currentModel = data;
      });

    this.clauseSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((data) => {
        this.currentClause = data.clauseSelected;
      });

    this.quoteSubscription = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteAdditionals)
    ]).subscribe((data) => {
      this.currentPolicy = data[0];
      const autoAdditional = data[1];

      //inicializacion de vehiclesPck Additiomals
      if (
        this.pckTempAdditional.length === 0 &&
        (this.currentPolicy.motor.vehicles.find(
          (k) => k.number === this.currentMotor?.number
        )?.packages?.length as number) > 1
      ) {
        this.pckTempAdditional = cloneDeep(this.currentPolicy.motor.vehicles);
        this.pckTempAdditional.map((item) => {
          const autoNumberSetCoverages = item.number;
          item.packages?.map((ag) => {
            let additionalAuto = null;

            ag.coveragesQuoted = null;
            ag.coverages = null;

            if (autoAdditional !== null) {
              const auto = autoAdditional.filter(
                (xc) => xc.number === autoNumberSetCoverages
              )[0];
              if (auto !== undefined) {
                additionalAuto = auto.packages?.filter(
                  (gh) => gh.code === ag.code
                )[0].coverages;
                if (additionalAuto !== null) {
                  if (additionalAuto) {
                    ag.coverages = cloneDeep(additionalAuto);
                  }
                }
              }
            }
          });
        });
        this.storeQuote.dispatch(
          new fromQuoteActions.SetMotorPackageAdditionals(
            this.pckTempAdditional
          )
        );
      }
    });

    // En esta sección se encuentra la asistencia mecánica por defecto
    this.serverDataSubscription = this.storeQuote
      .select(fromQuote.getQuoteMotorData)
      .subscribe((quote) => {
        this.arrAssistance =
          quote.mechanicalAssists?.find(
            (assists) => assists.number === quote.activeMotor
          )?.mechanicalAssists || [];

        const currentDefaultAssistance = quote.defaultAssistance.find(
          (defaultAssist) => defaultAssist.id === quote.activeMotor
        );

        this.currentAssistanceByDefault = this.arrAssistance.find(
          (a) =>
            a.code === (currentDefaultAssistance?.default || 'NoAssistance')
        );
      });
    this.costsSubscription = combineLatest([
      this.getCosts$,
      this.getCostsFromSidebar$
    ])
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() =>
          this.quotingService.getCosts(
            this.policyAdapter.adapt(this.currentPolicy as IPolicy)
          )
        )
      )
      .subscribe((policy: IPolicy) => {
        this.resultCosts$.next(policy);
        this.loadingCost = false;
        if (policy.motor) {
          if (!policy.motor.vehicles) return;

          policy.motor.vehicles
            ?.find((v) => v.number === this.currentMotor?.number)
            ?.packages?.forEach((newPkg) => {
              const currentPkg = this.currentMotor?.packages?.find(
                (pkg) => pkg.code === newPkg.code
              );

              if (!currentPkg) return;

              currentPkg.selected = currentPkg.selected;
              currentPkg.limitrc = newPkg.limitrc;
              currentPkg.premiums = newPkg.premiums;
              currentPkg.coverages = newPkg.coverages;
              currentPkg.coveragesQuoted = newPkg.coverages; // No sé por qué está duplicado
            });

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(
              this.vehicles as IVehicle[]
            )
          );
        }
      });

    //this is for fill coverageCompare
    for (let i = 0; i < 4; i++) {
      this.compareCoveragePane.push({
        code: 0,
        title: 'Agregar cobertura',
        description: 'Hasta 4'
      });

      this.compareCoverageArr.push({
        code: 0
      });
    }

    this.costsResponseSubscription = this.resultCosts$.subscribe((resp) => {
      if (resp) {
        this.storeQuote.dispatch(
          new fromQuoteActions.SetCostsResponseAction(resp)
        );
      }
    });
  }

  evalPackage(code: string) {
    code = code.split('||')[0];
    if (code === 'TR' || code === 'TRFV') {
      if (
        (this.currentMotor?.statedamount as number) < 1000000 &&
        code === 'TR'
      ) {
        return true;
      } else if (
        (this.currentMotor?.statedamount as number) >= 1000000 &&
        code === 'TRFV'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /**
   * Search in the api the coverages by group
   * @param coverageGroup group clicked in the tabset
   */
  groupSelected(codeGroup: string, firstLoadPage = false) {
    this.groupTR = '';

    if (!this.mobilityHasVisited) {
      this.deselectedAllCoverages();
    }

    this.currentGroup = codeGroup;

    if (codeGroup !== undefined) {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetGroupCoverage(codeGroup)
      );
    }

    // this.storePolicy.dispatch(new fromPolicyActions.SetPackageSelected(null));

    this.features$ = combineLatest([
      this.initConfCoverages(),
      this.storePolicy
        .select(fromPolicy.getPolicyData)
        .pipe(map((x) => x.motor.vehicles))
    ]).pipe(
      //FIXME: MP: Te dejo comentado aca Maty para filtrar Mobility.
      switchMap(([config, vehicles]) => {
        // Obtengo todos los paquetes del grupo actual
        let newAdditionals: any[] | null = null;
        let groupPackages = null;
        if (this.currentMotor) {
          groupPackages = vehicles
            ?.find((x) => x.number === this.currentMotor?.number)
            ?.packages?.filter((pkg) => pkg.group === this.currentGroup);

          newAdditionals = [];
          groupPackages?.forEach((pkg) => {
            pkg.coverages?.forEach((itemCov) => {
              newAdditionals?.push({
                code: itemCov.pattern.code,
                name: itemCov.pattern.description
              });
            });
          });
        }

        const motorConfig = cloneDeep(config) as IMotorConfiguration[];
        let listCoverage;
        if (
          this.currentMotor &&
          motorConfig.find((v) => v.vehicleType === this.currentMotor?.group)
        ) {
          listCoverage = motorConfig
            ?.find((v) => v.vehicleType === this.currentMotor?.group)
            ?.package.filter((item) => item.code === codeGroup)
            .map((k) => k.coverages);
        }

        if (newAdditionals && newAdditionals.length > 0 && listCoverage) {
          listCoverage[0] = unionWith(listCoverage[0], newAdditionals, isEqual);
        }

        return of(listCoverage);
      })
    );

    if (
      this.groupCoverageSelected === codeGroup &&
      !firstLoadPage &&
      !this.mobilityHasVisited &&
      this.packagesFilled()
    ) {
      this.callCost();
      return false;
    }

    this.initConfCoverages()
      .pipe(
        map((x) =>
          x
            ?.find((v) => v.vehicleType === this.currentMotor?.group)
            ?.package.map((k) =>
              k.packages.filter((m) => {
                if (codeGroup === 'TR') {
                  const codePkg = m.code.split('||');
                  return this.evalPackage(codePkg[0]);
                } else {
                  return true;
                }
              })
            )
        ),
        tap((c) => {
          const _pkg: any[] = [];
          c?.forEach((element) => {
            element.forEach((p) => {
              p.coveragesQuoted = p.coveragesQuoted = null
                ? null
                : p.coveragesQuoted;
              p.limitrc = p.limitrc = null ? null : p.limitrc;
              p.premiums = p.premiums = null ? null : p.premiums;

              p.selected = false;
              if (p.code === 'A') {
                p.group = 'RC';
              } else if (p.code === 'B' || p.code === 'B1') {
                p.group = 'BASIC';
              } else if (
                p.code === 'C' ||
                p.code === 'C1' ||
                p.code === 'CPrem' ||
                p.code === 'CClima'
              ) {
                p.group = 'TC';
              } else if (p.code.substring(0, 2) === 'TR') {
                p.group = 'TR';
              }
              _pkg.push(p);
            });
          });
          this.updatePackagePolicy(_pkg, firstLoadPage);
          this.callCost();
        })
      )
      .subscribe();
  }

  /**
   * update request for /costs
   */
  updatePackagePolicy(packages: IPackage[], fistLoadPage: boolean) {
    //this.currentCoverageResponse.motor.vehicles[0].coverages[0].terms[0].code
    if (
      (fistLoadPage || !this.packagesFilled()) &&
      this.currentCoverageResponse
    ) {
      // Si recupero una cotización, cargo los datos del paquete
      if (this.currentMotor?.package) {
        const currentPkg = packages.find(
          (covPkg) => covPkg.code === this.currentMotor?.package?.code
        );
        if (currentPkg) {
          currentPkg.externalid = this.currentMotor.package?.externalid;
          currentPkg.coverages = this.currentMotor.package?.coverages;
          currentPkg.coveragesQuoted = this.currentMotor.package?.coverages;
          currentPkg.premiums = this.currentMotor.package?.premiums;
          currentPkg.selected = this.currentMotor.package?.selected;
        }
      }

      this.storeQuote
        .select(fromQuote.getQuoteMotorData)
        .pipe(first())
        .subscribe((quote) => {
          this.currentCoverageResponse?.motor?.vehicles?.forEach((vehicle) => {
            const defaultsForCurrentVehicle = quote.defaultAssistance?.find(
              (defAssistance) => defAssistance.id === vehicle.number
            )?.assistances;

            if (vehicle.package.coverages) {
              vehicle.package.coverages.map((elem) => {
                if (elem.pattern.code === 'SURA_CA7_ClausulaDeAjusteCov') {
                  const value = { current: this.currentClause };
                  elem.terms[0].value = value;
                } else if (
                  elem.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov'
                ) {
                  // Dejo la asistencia que colocaron..
                  if (!elem.terms[0].value) {
                    const value = {
                      current: this.currentAssistanceByDefault?.code as string
                    };
                    elem.terms[0].value = value;
                  }
                }
              });
            }

            packages.forEach((pk) => {
              if (
                this.currentMotor?.packages
                  ?.map((p) => p?.code)
                  .includes(pk?.code)
              )
                return;

              this.currentPolicy?.motor?.vehicles
                ?.filter((x) => x.number === this.currentMotor?.number)[0]
                ?.packages?.forEach((pack) => {
                  if (this.pckMotorSelected && pk.code === pack.code) {
                    const currentSelected = this.pckMotorSelected.filter(
                      (ui) =>
                        ui.number === this.currentMotor?.number &&
                        ui.code === pk.code
                    )[0];

                    if (currentSelected) {
                      pk.selected = true;
                    } else {
                      pk.selected = pack.selected;
                    }
                  }
                });

              // Si existe un default para este paquete en específico
              const packageHasDefault = defaultsForCurrentVehicle
                ?.map((d) => d.code)
                .includes(pk.code as string);

              const packageDefault = packageHasDefault
                ? this.arrAssistance?.find(
                    (assistance) =>
                      assistance.code ===
                      defaultsForCurrentVehicle?.find(
                        (def) => def.code === pk.code
                      )?.assistance
                  )?.code
                : null;

              if (packageHasDefault && packageDefault) {
                const cloneCov = cloneDeep(vehicle.package.coverages);
                cloneCov.forEach((o: ICoverage) => {
                  if (o.pattern.code === 'SURA_CA7_AsistenciaMecanicaCov') {
                    o.terms[0].value.current = packageDefault;
                  }
                });
                pk.coverages = cloneCov;
              } else {
                pk.coverages = vehicle.coverages;
              }

              pk.externalid = this.currentMotor?.number + '_' + pk.code;
            });
          });

          const currentPackages = this.vehicles?.find(
            (x) => x.number === this.currentMotor?.number
          );

          if (currentPackages?.packages) {
            currentPackages.packages = packages;
          }

          if (currentPackages?.statedamount) {
            currentPackages.statedamount = this.currentMotor
              ?.statedamount as number;
          }

          this.storePolicy.dispatch(
            new fromPolicyActions.UpdateVehicleAction(
              this.vehicles as IVehicle[]
            )
          );
          this.callCost();
        });
    }
    // else if (this.currentCoverageResponse) {
    //   const existsPackages = this.currentMotor.packages.map((p) => p.code);

    //   // Busco todos los paquetes disponibles para este tipo de vehículo
    //   let pkgsArray = [];
    //   this.motorConfig
    //     .find((c) => c.vehicleType === this.currentMotor.group)
    //     ?.package?.forEach((pkgGroup) => {
    //       pkgsArray = [...pkgsArray, ...pkgGroup.packages];
    //     });

    //   // Filtro únicamente los paquetes existentes en la respuesta de coverages
    //   const availablePackages = this.currentCoverageResponse.motor.vehicles.find(
    //     (v) => v.number === this.currentMotor.number
    //   )?.packages;

    //   pkgsArray = pkgsArray.filter((pk) => avail);
    // }
  }

  /**
   * Call endpoint /costs
   */
  callCost() {
    this.loadingCost = true;
    this.resultCosts$.next(null);

    this.getCosts$.next();
  }

  callCostFromSidebar() {
    this.loadingCost = true;
    this.resultCosts$.next(null);

    this.getCostsFromSidebar$.next();
  }

  /**
   * Method to show blocks coverages to compare
   */
  showBlockCompare() {
    this.slideCompare = false;
    this.showCardsCompare = true;
  }

  /**
   * this is for receive compareCoverageList from sxf-comparecoverage
   * @param data
   */
  coverageListTop(data: any) {
    this.compareCoveragePane = data;
  }

  /**
   * Method back to show coverages in initial state..
   */
  backToPlans() {
    this.slideCompare = true;
    this.showCardsCompare = false;
  }

  /**
   * get coverage from sxf-comparecoverage
   * @param value
   */
  sldCompare(value: any) {
    this.slideCompare = value;
  }

  /**
   * get showCardsCompare from sxf-comparecoverage
   * @param value
   */
  showCardCompare(value: any) {
    this.showCardsCompare = value;
  }

  getPackage(pkg: IPackage, packagesWithCosts: IPackage[]) {
    const find = packagesWithCosts.filter(
      (x) => x.code === pkg.code || pkg.code === x.externalid?.split('_')[1]
    )[0];
    return find;
  }
  /**
   *
   * @param data Method manage comparasion of coverages
   */
  compareCoverage(data: any) {
    //this.slideCompare.emit(true);
    if (data.coverage != null && !data.remove) {
      //will add
      for (let i = 0; i < this.compareCoveragePane.length; i++) {
        if (this.compareCoveragePane[i].code === 0) {
          //this is for show in blockcoverage
          this.compareCoverageArr.splice(i, 1);
          this.compareCoverageArr.unshift(data.coverage);

          this.compareCoveragePane.splice(i, 1);
          data.coverage.description =
            data.coverage.price + ' ' + data.coverage.quote;
          this.compareCoveragePane.unshift(data.coverage);
          break;
        }
      }
    } else if (data.coverage != null && data.remove) {
      //will remove
      if (data.coverage.code !== 0) {
        let index = this.compareCoveragePane.findIndex((item: any) => {
          return item.code === data.coverage.code;
        });

        index = this.compareCoverageArr.findIndex((item: any) => {
          return item.code === data.coverage.code;
        });
        this.compareCoverageArr.splice(index, 1);

        this.compareCoveragePane.splice(index, 1);
        this.compareCoveragePane.push({
          code: 0,
          title: 'Agregar cobertura',
          description: 'Hasta 4'
        });
        this.compareCoverageArr.push({
          code: 0
        });
      }
    }
    this.slideCompare = true;
  }

  getPackageDescription(groupCode: string, code: string) {
    const pkg = MOTOR_CONF.find(
      (v) => v.vehicleType === this.currentMotor?.group
    )
      ?.package.find((x) => x.code === groupCode)
      ?.packages.filter((x) => x.code === code);

    return pkg?.length ? pkg[0].description : '';
  }

  backStepOne() {
    if (!this.currentMotor || !this.routes) return;

    this.flowRouteService.enableRoute(this.currentMotor, this.routes, 'patent');
    this.router.navigateByUrl(
      'quoting/quote/questions/motor/' + this.currentMotor?.id + '/patent'
    );
  }

  packages(packages: IPackage[]) {
    //! When we have a motorbike we need to unify the packages group because it´s only one group.
    if (this.currentMotor?.group === 'MOTO') {
      packages.forEach((x) => {
        x.group = 'BASIC';
      });
    }
    return packages.filter((x) => x.group === this.currentGroup);
  }

  openDialogAdditionals(pck: IPackage) {
    this.router.navigateByUrl(
      'quoting/coverage/' + this.currentMotor?.id + '/modal/' + pck.code
    );
  }

  // SE agrego esto para la validacion de la US 5669
  deselectedAllCoverages() {
    console.log('deselectedAllCoverages');

    const _packages = cloneDeep(this.currentMotor?.packages) as IPackage[];

    _packages.forEach((element) => {
      let currentSelected = null;
      if (this.pckMotorSelected) {
        currentSelected = this.pckMotorSelected.filter(
          (ui) =>
            ui.number === this.currentMotor?.number && ui.code === element.code
        )[0];
      }

      if (currentSelected) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });

    const currentVehicle = this.vehicles?.find(
      (x) => x.number === this.currentMotor?.number
    );

    if (currentVehicle?.packages) {
      currentVehicle.packages = _packages;
    }

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles as IVehicle[])
    );
  }

  /**
   * Function used to detect if a vehicle
   * can have additional
   *
   * @param {VehicleGroup} group
   * @memberof BlockCoverageComponent
   */
  checkIfVehicleCanHaveAdditional(group: VehicleGroup): void {
    //TODO: utilizar archivo de configuración
    const acceptedVehicles: VehicleGroup[] = [
      VehicleGroup.AUTO,
      VehicleGroup.PICKUP,
      VehicleGroup.OTRO,
      VehicleGroup.CAMION
    ];

    this.withAdditional = acceptedVehicles.includes(group);
  }

  /**
   * Function used to filter packages based on coverages
   * response.
   *
   * @param {IMotorConfiguration[]} motorConfig
   * @param {ICoverageResponse} coverageResponse
   * @returns
   * @memberof CoverageComponent
   */
  filterPackageConfigWithCoverageResponse(
    motorConfig: IMotorConfiguration[],
    coverageResponse: ICoverageResponse | null
  ) {
    let packagesInResponse: IPackage[] | undefined = [];
    if (coverageResponse && coverageResponse.motor) {
      //coverageResponse && coverageResponse.motor
      packagesInResponse = coverageResponse.motor.vehicles?.find(
        (v) => v.number === this.currentMotor?.number
      )?.packages;
    }

    const packageCodesInResponse = packagesInResponse?.map((p) => p.code);
    if (
      motorConfig.find(
        (v: IMotorConfiguration) => v?.vehicleType === this.currentMotor?.group
      )
    ) {
      const packagesByVehicleType = cloneDeep(motorConfig)?.find(
        (v: IMotorConfiguration) => v.vehicleType === this.currentMotor?.group
      )?.package as IPackagesConfiguration[];

      const filtrado = packagesByVehicleType
        .map((pkg) => {
          pkg.packages = pkg.packages.filter((p) =>
            packageCodesInResponse?.includes(p.code)
          );

          return pkg;
        })
        .filter((pkg) => pkg.packages.length > 0);
      return filtrado;
    }
    return null;
  }

  /**
   * Compara la cantidad de packages existentes en la respuesta de
   * coverages con la cantidad de packages existentes en mi vehículo
   * (utilizado al recuperar una cotización/solicitud)
   *
   * @returns
   * @memberof CoverageComponent
   */
  packagesFilled(): boolean {
    const coveragePackages = this.currentCoverageResponse?.motor?.vehicles
      .find((v) => v.number === this.currentMotor?.number)
      ?.packages.map((p) => p.code);

    const configPackages = MOTOR_CONF.find(
      (c) => c.vehicleType === this.currentMotor?.group
    )
      ?.package.map((pkgGroup) => pkgGroup.packages)
      .reduce((prev, curr) => [...prev, ...curr])
      .map((pkg) => pkg.code);

    return (
      coveragePackages?.filter((pkg) => configPackages.includes(pkg))
        ?.length ===
      this.currentMotor?.packages?.filter((pkg) => this.evalPackage(pkg.code))
        ?.length
    );
  }
  ngOnDestroy(): void {
    this.groupSubscription?.unsubscribe();
    this.storeQuoteSubscription?.unsubscribe();
    this.mobilityVisitedSubscription?.unsubscribe();
    this.storeMotorDataSubscription?.unsubscribe();
    this.initialSubscription?.unsubscribe();
    this.storePolicyDataSubscription?.unsubscribe();
    this.storeCurrentPolicySubscription?.unsubscribe();
    this.storeDataSubscription?.unsubscribe();
    this.serverDataSubscription?.unsubscribe();
    this.quoteSubscription?.unsubscribe();
    this.clauseSubscription?.unsubscribe();
    this.costsSubscription?.unsubscribe();
    this.pckSelectedSubscription?.unsubscribe();
  }
}
