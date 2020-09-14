import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import { BaseComponent, LogService } from '@sura-platform/core';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
//import * as quotingState from '../state';
import * as fromQuoteActions from '../components/quote/state/quote.actions';
import * as fromQuote from '../components/quote/state';
import * as fromPolicy from '../../quoting/state/policy';
import * as fromPolicyActions from '../../quoting/state/policy/policy.actions';
import * as fromEmission from '../components/emission/state';
import * as fromProducer from '../../producer/state';
import * as fromProducerActions from '../../producer/state/producer.actions';
import { IRoutes } from '../interfaces/routes.interface';
import {
  IVehicle,
  IPolicy,
  ICoverageResponse,
  QuotingService,
  IPackage
} from '@sura-platform/features';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';

import { ModalComponent } from '@sura-platform/web';
import * as fromProducerReducer from '../../producer/state/producer.reducer';
import { combineLatest, Subscription } from 'rxjs';
import { MOTOR_CONF } from '../components/motor/motor.config';
import { IProducer } from '@sura-platform/features/producer';
import { cloneDeep, remove, List } from 'lodash';
import { PolicyAdapter } from '../adapters/policy.adapter';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { lineGroup } from './line.enum';
import { IProfile } from '@sura-platform/features/producer/interfaces/profile.interface';
@Component({
  selector: 'sxf-quoting',
  templateUrl: 'quoting.component.html',
  styleUrls: ['quoting.component.scss']
})
export class QuotingComponent extends BaseComponent
  implements OnInit, OnDestroy {
  constructor(
    private storeProducer: Store<fromProducer.State>,
    private storeQuote: Store<fromQuote.State>,
    private storeEmission: Store<fromEmission.State>,
    private storePolicy: Store<fromPolicy.State>,
    private router: Router,
    private modalService: NgbModal,
    private logService: LogService,
    private producerStore: Store<fromProducerReducer.ProducerState>,
    private policyAdapter: PolicyAdapter,
    private quotingService: QuotingService
  ) {
    super();
    this.mobilityHasVisited = false;
    this.formMobility = false;
  }
  policy: IPolicy | undefined;
  currentProducer: any;
  routes: IRoutes[] = [];
  vehicle: IVehicle | undefined;
  currentVehicleId: string | undefined = '';
  currentMotors: IVehicle[] | undefined;
  existCoverageResponse: boolean | undefined;
  currentStep = '';
  emissionEnabled = false;
  jobFromQuotesTable: string | undefined;

  currentPolicy: IPolicy | undefined;

  currentMotor: IVehicle | undefined;

  isTechnicalPricing = false;

  subscriptionLoadCoverage: Subscription | undefined;

  mechanicalAssist: any;

  mobilityHasVisited: boolean | null;

  /**
   * Subscription to emission store
   *
   * @type {Subscription}
   * @memberof QuotingComponent
   */
  emissionStoreSubscription: Subscription | undefined;

  /**
   * If true, we come to recover quotes or requests
   *
   * @type {boolean}
   * @memberof QuotingComponent
   */
  fromRetrieve: boolean | undefined;

  loadPolicy$: Subscription | undefined;

  getPolicyDataSubscription: Subscription | undefined;

  editCoverageSubscription: Subscription | undefined;

  pckSelectedSubscription: Subscription | undefined;

  mobilityVisitedSubscription: Subscription | undefined;

  mobilityFormValiditySubscription: Subscription | undefined;

  formMobility: boolean | null;

  /**
   * Set current URL as a vector
   */
  currentUrl: string[] | undefined;

  /**
   * disable or enable Home link
   *
   * @memberof QuotingComponent
   */
  hiddenHome = false;

  initialStateMotor: any;

  buttonAnimated: any;

  autoAdditional: IVehicle[] | null | undefined;

  pckMotorSelected: any;

  tabCoverage: string | undefined;

  @ViewChild('modalProducerError') producerError: ElementRef | undefined;

  @ViewChild('modalRemove') modalRemove: ModalComponent | undefined;

  @ViewChild('modalDiscardAuto') modalDiscardAuto: ModalComponent | undefined;

  forRemove: number | null | undefined;

  loadingRemove = false;

  @ViewChild('modalFeedback', { static: true }) modalFeedback:
    | ModalComponent
    | undefined;
  technicalPricingSubscription: Subscription | undefined;

  @ViewChild('modalCoHome') modalCoHome: ModalComponent = <ModalComponent>{};

  @ViewChild('modalEmHome') modalEmHome: ModalComponent = <ModalComponent>{};

  coverageAll: ICoverageResponse[] | undefined;

  coverageAllSubscription: Subscription | undefined;

  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/data-validation-loader.json',
    loop: false,
    autoplay: false
  };

  line: string | undefined;
  lineGroupEnum = lineGroup;

  activeSubscriptions: Subscription[] = [];

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.goBack();
  }

  producersLoaded(producers: any) {
    if (producers.length === 0) {
      this.modalService
        .open(this.producerError, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(() => {
          this.router.navigate(['/queries/quotes']);
        });
    }
  }

  ngOnInit(): void {
    this.loadTechnicalPricing();
    this.mobilityVisitedSubscription = this.storeQuote
      .select(fromQuote.getMobilityVisitedStatus)
      .subscribe((data) => {
        this.mobilityHasVisited = data;
      });

    // TODO: ML - este subscribe ya no maneja lo de technical pricing, editarlo
    this.technicalPricingSubscription = combineLatest([
      this.producerStore.select(fromProducer.getCurrentProducer),
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData),
      this.storeQuote.select(fromQuote.getQuoteAdditionals),
      this.storeQuote.select(fromQuote.getCurrentLine)
    ]).subscribe((x) => {
      //this.prueba = x[1];
      this.line = <string>x[4];
      this.autoAdditional = x[3];
      this.currentMotors = x[1].motor.vehicles;
      this.currentProducer = <IProducer>x[0];
      const currentMotor = x[1].motor.vehicles.find(
        (v) => v.number === x[2].activeMotor
      );
      this.mobilityFormValiditySubscription = this.storeQuote
        .select(fromQuote.getMobilityFormValidity)
        .subscribe((data) => {
          if (data) {
            this.formMobility = data;
          }
        });
      // Si no se encontró el vehículo o no se seleccionó el
      // grupo aún entonces salgo
      if (!currentMotor?.group) return;

      this.tabCoverage = MOTOR_CONF.find(
        (c) => c.vehicleType === currentMotor.group
      )?.package?.find((p) => p.code === x[2]?.groupCoverage)?.name;
    });

    this.emissionStoreSubscription = this.storeEmission
      .select(fromEmission.getEmission)
      .subscribe((store) => {
        this.fromRetrieve = store.jobNumberFromQuotes ? true : false;
      });

    this.storeQuote.dispatch(new fromQuoteActions.Load());

    // ML: En caso de que exista un jobnumber, no debo ejecutar el método
    // "LoadPolicy" ya que tengo un vehículo
    this.loadPolicy$ = combineLatest([
      this.storeQuote.select(fromPolicy.getInitialState),
      this.storeEmission.select(fromEmission.getJobNumber),
      this.storeQuote.select(fromPolicy.getInitialHouseState)
    ]).subscribe((data) => {
      this.initialStateMotor = data[0];
      if (data[1]) return;

      this.vehicle = data[0];
      this.storePolicy.dispatch(new fromPolicyActions.LoadPolicy(data[0]));
      this.storePolicy.dispatch(new fromPolicyActions.LoadHouse(data[2]));
    });

    this.storeEmission.select(fromEmission.getRoutes).subscribe((data) => {
      if (data.length > 0) {
        this.emissionEnabled = true;
      }
    });

    this.storeEmission.select(fromEmission.getJobNumber).subscribe((data) => {
      this.jobFromQuotesTable = data;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x: any) => {
        if (x.url.includes('motor')) {
          this.currentStep = 'motor';
        } else if (x.url.includes('coverage')) {
          this.currentStep = 'coverage';
        } else if (x.url.includes('mobility')) {
          this.currentStep = 'mobility';
        } else if (x.url.includes('emission')) {
          this.currentStep = 'emission';
        }

        if (x.url.includes('/quoting/inspection')) {
          this.hiddenHome = true;
        } else {
          this.hiddenHome = false;
        }
      });

    this.storeQuote.select(fromQuote.getQuoteMotorData).subscribe((data) => {
      this.routes = <IRoutes[]>(
        data?.routes?.sort((one, two) => (one > two ? -1 : 1))
      );
      this.currentVehicleId = data.activeMotor?.toString();
    });

    this.subscriptionLoadCoverage = this.storeQuote
      .select(fromQuote.getCoverageResponseMotorData)
      .subscribe((covRes) => {
        if (covRes !== null) {
          this.existCoverageResponse = true;
        } else {
          this.existCoverageResponse = false;
        }
      });

    this.coverageAllSubscription = combineLatest([
      this.storeQuote.select(fromQuote.getCoverageResponseAllMotorData),
      this.storeQuote.select(fromQuote.getMechanicalAssists)
    ]).subscribe((coverageAll: any[]) => {
      this.coverageAll = coverageAll[0];
      this.mechanicalAssist = coverageAll[1];
    });

    this.pckSelectedSubscription = this.storeQuote
      .select(fromQuote.getPackageSelected)
      .subscribe((hj) => {
        this.pckMotorSelected = hj;
      });

    this.getPolicyDataSubscription = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((dx) => {
        this.currentPolicy = dx;
        this.currentMotor = dx.motor.vehicles.filter(
          (c) => c?.number?.toString() === this.currentVehicleId
        )[0];

        if (
          this.router.url.includes('/prueba_diego') &&
          (this.currentMotors?.length as number) > 1 &&
          this.currentMotor &&
          !this.currentMotor.added
        ) {
          if (this.currentMotor?.model?.statementamount) {
            const adapt = this.policyAdapter.adaptEdit(this.currentPolicy);
            //el adapter me devuelve siempre 1 vehiculo, que es el actual
            adapt.motor.vehicles.forEach((ele: any) => {
              ele.action = 'add';
            });
            this.editCoverageSubscription = this.quotingService
              .editCoverages(<IPolicy>adapt)
              .subscribe((data) => {
                if (
                  data.job &&
                  data.job.number &&
                  data.job.number === adapt.job.number
                ) {
                  this.setAutoAdded(true);
                } else {
                  this.logService.issue(
                    'Error en agregar auto. Auto:',
                    JSON.stringify(adapt)
                  );
                }
              });
          }
        }
      });
  }

  /**
   * Detect if technical pricing is enabled
   *
   * @memberof QuotingComponent
   */
  loadTechnicalPricing(): void {
    const subscription = this.storeQuote
      .select(fromQuote.getTechnicalPricing)
      .subscribe((tp) => (this.isTechnicalPricing = tp));

    this.activeSubscriptions.push(subscription);
  }

  goBack() {
    this.currentUrl = this.router.url.split('/');
    if (
      this.fromRetrieve ||
      this.currentUrl[this.currentUrl.length - 1] === 'inspection'
    )
      return;

    switch (this.currentUrl[2]) {
      case 'quote':
        return false;
        break;
      case 'coverage':
        let routeRedirect = 'sum';
        if (this.isTechnicalPricing) {
          routeRedirect = 'age';
        }

        this.router.navigateByUrl(
          '/quoting/quote/questions/motor/' +
            this.currentVehicleId +
            '/' +
            routeRedirect
        );
        break;
      case 'mobility':
        this.router.navigateByUrl('/quoting/coverage/' + this.currentVehicleId);

        break;
      case 'emission':
        this.router.navigateByUrl('/quoting/mobility');
        break;
      default:
        break;
    }
  }

  open(content: any) {
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

  goToQuote() {
    this.currentUrl = this.router.url.split('/');
    if (this.currentUrl[this.currentUrl.length - 1] === 'inspection') return;

    if (this.existCoverageResponse) {
      let routeRedirect = 'sum';
      if (this.isTechnicalPricing) {
        routeRedirect = 'age';
      }

      this.storeQuote.dispatch(
        new fromQuoteActions.SetActiveRouteMotor(
          'motor/' + this.currentVehicleId + '/' + routeRedirect
        )
      );

      this.router.navigateByUrl(
        '/quoting/quote/questions/motor/' +
          this.currentVehicleId +
          '/' +
          routeRedirect
      );
    } else {
      return false;
    }
  }

  setCurrentProducer(producer: any) {
    this.storeProducer.dispatch(
      new fromProducerActions.SetCurrentProducerAction(producer)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.SetCurrentProducerAction(producer)
    );

    //Llamar de nuevo a coverage para que actualize
    //el codigo de productor cuando se cambia
    if (this.existCoverageResponse) {
      if (
        this.currentPolicy &&
        this.currentMotor &&
        (this.currentMotor.packages?.length as number) > 0 &&
        (this.currentMotor.packages as any)[0].coverages !== null
      ) {
        this.storeQuote.dispatch(
          new fromQuoteActions.LoadCoverageMotor(
            this.currentPolicy,
            this.currentMotor,
            null
          )
        );
      }
    }
  }

  setCurrentProducerProfile(profile: IProfile) {
    this.storeProducer.dispatch(
      new fromProducerActions.SetCurrentProducerProfile(profile)
    );
  }

  goToCoverage() {
    this.currentUrl = this.router.url.split('/');
    if (this.currentUrl[this.currentUrl.length - 1] === 'inspection') return;

    if (this.existCoverageResponse) {
      this.router.navigateByUrl('quoting/coverage/' + this.currentVehicleId);
    }
  }

  /**
   * Function to navigate to mobility
   *
   * @memberof QuotingComponent
   */
  goToMobility() {
    this.currentUrl = this.router.url.split('/');
    if (this.currentUrl[this.currentUrl.length - 1] === 'inspection') return;

    this.router.navigateByUrl('/quoting/mobility');
  }

  goToEmission() {
    this.currentUrl = this.router.url.split('/');
    if (this.currentUrl[this.currentUrl.length - 1] === 'inspection') return;

    if (!this.emissionEnabled) {
      return false;
    }
    this.storeEmission
      .select(fromEmission.getActiveRoute)
      .subscribe((data: string) => {
        if (!data) {
          this.router.navigateByUrl('/quoting/emission/questions/client');
        } else {
          this.router.navigateByUrl('/quoting/emission/questions/' + data);
        }
      })
      .unsubscribe();
  }

  onContactUsClick() {
    this.logService.feedback();
  }

  openModal() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/queries/quotes');
  }

  /**
   * Return true when all vehicles have a package selected
   *
   * @readonly
   * @type {boolean}
   * @memberof QuotingComponent
   */
  get allVehiclesHasPackageSelected(): boolean | undefined {
    return this.currentPolicy?.motor?.vehicles?.every((v) =>
      v.packages?.some((p) => p.selected)
    );
  }

  ngOnDestroy() {
    if (this.subscriptionLoadCoverage)
      this.subscriptionLoadCoverage.unsubscribe();

    if (this.mobilityFormValiditySubscription)
      this.mobilityFormValiditySubscription.unsubscribe();

    if (this.mobilityVisitedSubscription)
      this.mobilityVisitedSubscription.unsubscribe();

    if (this.emissionStoreSubscription)
      this.emissionStoreSubscription.unsubscribe();

    if (this.loadPolicy$) this.loadPolicy$.unsubscribe();

    if (this.technicalPricingSubscription) {
      this.technicalPricingSubscription.unsubscribe();
    }

    if (this.getPolicyDataSubscription) {
      this.getPolicyDataSubscription.unsubscribe();
    }

    if (this.editCoverageSubscription) {
      this.editCoverageSubscription.unsubscribe();
    }

    if (this.coverageAllSubscription) {
      this.coverageAllSubscription.unsubscribe();
    }

    if (this.pckSelectedSubscription) {
      this.pckSelectedSubscription.unsubscribe();
    }

    this.activeSubscriptions?.forEach((s) => s?.unsubscribe());
  }

  newAuto() {
    if (this.currentMotors && this.currentMotors.length < 4) {
      const cloneMotors = cloneDeep(this.currentMotors) as IVehicle[];
      const numberAuto = this.currentMotors[this.currentMotors.length - 1]
        .id as number;
      const initialStateNewAuto = cloneDeep(this.initialStateMotor);
      initialStateNewAuto.id = numberAuto + 1;
      initialStateNewAuto.number = numberAuto + 1;
      initialStateNewAuto.added = false;

      this.storePolicy.dispatch(
        new fromPolicyActions.LoadPolicy(initialStateNewAuto)
      );
      this.selectNewAuto(initialStateNewAuto);

      cloneMotors.forEach((rt) => {
        if (this.pckSelected(rt)) {
          this.currentMotors?.forEach((bc) => {
            if (bc.number === rt.number) {
              bc.packages =
                bc.packages?.map((gh) => {
                  const pckSelected = rt.packages?.filter((o) => o.selected)[0];
                  if (pckSelected?.code === gh.code) {
                    gh.selected = true;
                  }
                  return gh;
                }) || null;
            }
          });
        }
      });

      this.storePolicy.dispatch(
        new fromPolicyActions.UpdateVehicleAction(this.currentMotors)
      );
    }
  }

  removeLastRedirectQuote() {
    this.ngOnInit();
    this.router.navigate(['/queries/quotes']);
    this.modalRemove?.closeModal();
  }

  countMotorsWithPackageSelected() {
    let count = 0;
    this.currentMotors?.forEach((hj) => {
      count += hj.packages?.filter((lk) => lk.selected)?.length || 0;
    });
    return count;
  }

  removeVehicle() {
    if (
      (this.currentMotors?.length as number) - 2 < 0 ||
      this.countMotorsWithPackageSelected() === 1
    ) {
      //si esta borrando el ultimo auto..redirije a grilla
      this.removeLastRedirectQuote();
      return false;
    }

    this.loadingRemove = true;
    const autoForRemove = this.currentPolicy?.motor.vehicles.filter(
      (c) => c.number === this.forRemove
    )[0];

    if (autoForRemove && autoForRemove.added) {
      this.removeAutoCoveragesEdit();
    } else {
      this.removeAutoInStore();
    }
  }
  leaveToHome() {
    if (this.currentStep === 'emission' || this.jobFromQuotesTable !== null) {
      this.modalEmHome.openModal();
    } else {
      this.modalCoHome.openModal();
    }
  }
  removeAutoCoveragesEdit() {
    const cloneRemove = cloneDeep(this.forRemove);
    const adapt = this.policyAdapter.adaptEdit(
      this.currentPolicy as IPolicy,
      cloneRemove as any
    );
    adapt.motor.vehicles.forEach((ele: any) => {
      ele.action = 'remove';
    });
    this.quotingService.editCoverages(<IPolicy>adapt).subscribe((data) => {
      if (this.currentMotors && data.job.number === adapt.job.number) {
        this.removeFromCoverageResponse();
        this.removeAutoInStore();

        const lastAuto = this.currentMotors[this.currentMotors.length - 1];

        this.setCurrentCar(lastAuto);
        this.storeQuote.dispatch(
          new fromQuoteActions.SetActiveRouteMotor(
            'quoting/coverage/' + lastAuto.id
          )
        );
        this.router.navigateByUrl('quoting/coverage/' + lastAuto.id);

        this.modalRemove?.closeModal();
        this.modalDiscardAuto?.closeModal();
      } else {
        this.logService.issue(
          'Error en elminar auto. Auto:',
          JSON.stringify(adapt)
        );
      }
      this.loadingRemove = false;
    });
  }

  removeFromCoverageResponse() {
    const coverageAllClone: any[] = cloneDeep(this.coverageAll) as any;

    remove(coverageAllClone, (bn: IPolicy) => {
      const mot = bn.motor.vehicles.filter(
        (cv) => cv.number !== this.forRemove
      )[0];
      return mot ? false : true;
    });

    let autoAco = 1;
    coverageAllClone.forEach((qw) => {
      qw.motor.vehicles.forEach((df: IVehicle) => {
        df.number = autoAco;
        df.id = autoAco;
      });
      autoAco++;
    });

    this.storeQuote.dispatch(
      new fromQuoteActions.SetCoverageResponseAllAction(coverageAllClone)
    );

    // Remuevo la asistencia mecánica por defecto y reordeno el array
    this.storeQuote.dispatch(
      new fromQuoteActions.RemoveAndOrderDefaultAssistanceAction(
        this.forRemove as number
      )
    );
  }

  removeAutoInStore() {
    let motors = cloneDeep(this.currentMotors);
    remove(<List<IVehicle>>motors, (n: IVehicle) => {
      return n.number === this.forRemove;
    });

    let additionalAuto = cloneDeep(this.autoAdditional);
    remove(<List<IVehicle>>additionalAuto, (n: IVehicle) => {
      return n.number === this.forRemove;
    });

    let assistMechanical = cloneDeep(this.mechanicalAssist);
    remove(assistMechanical, (n: IVehicle) => {
      return n.number === this.forRemove;
    });

    motors = this.changeSequenceMotor(<IVehicle[]>motors);
    additionalAuto = this.changeSequenceMotor(<IVehicle[]>additionalAuto);
    assistMechanical = this.changeSequenceMotor(assistMechanical);

    this.currentMotors = motors;
    this.currentMotor = motors[motors.length - 1];

    let motorSelected = cloneDeep(this.pckMotorSelected);
    remove(motorSelected, (n: IVehicle) => {
      return n.number === this.forRemove;
    });
    motorSelected = this.changeSequenceMotor(motorSelected);

    this.storeQuote.dispatch(
      new fromQuoteActions.SetPackageSelectedAction(motorSelected)
    );

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(motors)
    );

    this.storeQuote.dispatch(
      new fromQuoteActions.SetMotorPackageAdditionals(additionalAuto)
    );

    this.storeQuote.dispatch(
      new fromQuoteActions.SetAssistMechanicalAction(assistMechanical)
    );
  }

  changeSequenceMotor(motors: IVehicle[]) {
    let changeSequence = false;
    motors.forEach((ty) => {
      if ((ty.number as number) - 1 === this.forRemove) {
        changeSequence = true;
      }
      if (changeSequence) {
        ty.number = (ty.number as number) - 1;
        if (ty.id) {
          ty.id = ty.number;
        }
      }
    });
    return motors;
  }

  removeAuto(number: number) {
    this.forRemove = number;
    this.modalRemove?.openModal();
  }

  setCurrentCar(auto: IVehicle) {
    this.currentVehicleId = auto.id?.toString();

    this.storeQuote.dispatch(
      new fromQuoteActions.SetCurrentMotorAction(auto.number as number)
    );
  }

  selectNewAuto(auto: IVehicle) {
    this.setCurrentCar(auto);
    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor('motor/' + auto.id + '/patent')
    );
    /*  this.storeQuote.dispatch(
      new fromQuoteActions.SetCurrentCoverageResponseAction(null)
    );*/
    this.router.navigateByUrl(
      'quoting/quote/questions/motor/' + auto.id + '/patent'
    );
  }

  continueDiscardAuto() {
    this.loadingRemove = true;
    this.buttonAnimated.playSegments([[0, 119]], true);

    this.removeAutoCoveragesEdit();

    return false;
  }

  selectAutoGoCoverage(auto: IVehicle) {
    //no ha sido agregado muestro modal de que va perder datos
    if (
      (this.currentMotor && !this.currentMotor.added) ||
      !this.pckSelected(this.currentMotor as IVehicle)
    ) {
      this.forRemove = this.currentMotor?.number;
      this.modalDiscardAuto?.openModal();
      return false;
    }
    //no permitir click si no ha cargado todos los datos
    //no permitir click si esta dando click al mismo auto actual

    if (!this.pckSelected(auto) || this.currentMotor?.number === auto.id) {
      return false;
    }

    this.setCurrentCar(auto);

    this.currentMotor = auto;
    this.storeQuote.dispatch(
      new fromQuoteActions.SetActiveRouteMotor('quoting/coverage/' + auto.id)
    );

    this.router.navigateByUrl('quoting/coverage/' + auto.id);
  }

  pckSelected(car: IVehicle) {
    return car.packages && car.packages.length > 0
      ? car.packages.filter((o) => o.selected)[0]
      : false;
  }

  pckSelectedAll(cars: IVehicle[]) {
    let response: boolean | IPackage = true;
    cars.forEach((item) => {
      response =
        item.packages && item.packages.length > 0
          ? item.packages.filter((o) => o.selected)[0]
          : false;
    });
    return response;
  }

  showFooterAuto() {
    if (
      (this.currentStep === 'motor' &&
        (this.currentMotors?.length as number) > 1) ||
      this.currentStep === 'coverage'
    ) {
      return true;
    } else {
      return false;
    }
  }
  printPage() {
    window.print();
  }
  showCardAuto(currentCar: IVehicle) {
    const response = this.pckSelected(currentCar);
    if (this.currentStep === 'coverage') {
      return true;
    } else if (response) {
      return true;
    } else {
      return false;
    }
  }

  setAutoAdded(value: boolean) {
    this.currentMotors?.forEach((v) => {
      if (v.number?.toString() === this.currentVehicleId) {
        v.added = value;
      }
    });

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(
        this.currentMotors as IVehicle[]
      )
    );
  }

  /**
   * Control lottie animation
   */
  animationCreated(animationItem: AnimationItem): void {
    this.buttonAnimated = animationItem;
  }
}
