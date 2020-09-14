import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { map, tap, switchMap, skip } from 'rxjs/operators';
import cloneDeep from 'lodash/cloneDeep';

import {
  IPolicy,
  IVehicle,
  AditionalAccessoriesService,
  QuotingService,
  IPackage
} from '@sura-platform/features';
import { ICoverage } from '@sura-platform/features/coverage';
import { PolicyAdapter } from '../../adapters/policy.adapter';
import * as fromPolicy from '../../state/policy';
import * as fromPolicyActions from '../../state/policy/policy.actions';
import * as fromQuote from '../quote/state';
import * as fromQuoteActions from '../quote/state/quote.actions';
import { RouterExtService } from '../../../quoting/components/quote/services/router-ext.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { IPremium } from '@sura-platform/features/package/interfaces/premium.interface';

@Component({
  selector: 'sxf-mobility',
  templateUrl: 'mobility.component.html',
  styleUrls: ['mobility.component.scss']
})
export class MobilityComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('t') disabledTooltip: NgbTooltip = <NgbTooltip>{};

  policy: IPolicy = <IPolicy>{};
  vehicles: IVehicle[] = <IVehicle[]>[];
  currentVehicle: IVehicle = <IVehicle>{};

  form: FormGroup = <FormGroup>{};
  mobility: any[] = <any[]>[];
  mobilityPkg: ICoverage = <ICoverage>{};
  mobilityCompleted: Subject<void> = new Subject();

  callCost$: Subject<IPolicy> = new Subject();
  loadingCost = false;

  MOBILITY_CODE = 'SURA_CA7_MobilityTheftDamageCov';
  MOBILITY_DEFAULT = 'SURA_CA7_MobilityTheftDamageOpt3';

  callCostSubscription: Subscription = new Subscription();
  formChangesSubscription: Subscription = new Subscription();
  getQuoteSubscription: Subscription = new Subscription();

  /**
   * Save chunk of previous visited url
   *
   * @memberof MobilityComponent
   */
  fromUrl = '';

  constructor(
    private fb: FormBuilder,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private policyAdapter: PolicyAdapter,
    private additionalService: AditionalAccessoriesService,
    private quotingService: QuotingService,
    private routeExtService: RouterExtService
  ) {}

  ngOnInit() {
    this.fromUrl = <string>this.routeExtService.getPreviousUrl().split('/')[2];
    // Marco la ruta como visitada
    this.storeQuote.dispatch(
      new fromQuoteActions.SetMobilityVisitedAction(true)
    );

    this.createForm();
    this.loadFromStore();

    // Escucho las llamadas a callCost para llamar al servicio
    // de cost
    this.callCostSubscription = this.callCost$
      .pipe(
        skip(1),
        tap(() => (this.loadingCost = true)),
        switchMap(() => {
          const policy = cloneDeep(this.policy) as IPolicy;

          policy.motor.vehicles.forEach((v) => {
            v.packages = <IPackage[]>v?.packages?.filter((p) => p.selected);
          });

          return this.quotingService.getCosts(this.policyAdapter.adapt(policy));
        })
      )
      .subscribe((policy) => this.handleCost(policy));
  }

  ngAfterViewInit() {
    if (this.currentVehicle) {
      this.disabledTooltip.disableTooltip = true;
    } else {
      this.disabledTooltip.autoClose = false;
      this.disabledTooltip.open();
    }
  }

  ngOnDestroy() {
    this.callCostSubscription?.unsubscribe();
    this.formChangesSubscription?.unsubscribe();
  }

  /**
   * Create mobility form
   *
   * @memberof MobilityComponent
   */
  createForm() {
    this.form = this.fb.group({
      yes: ['off', Validators.required],
      coverageSum: []
    });
    this.form.disable();

    // Escucho los cambio del formulario para llamar a costs
    // con el valor de movilidad seleccionado
    this.formChangesSubscription = combineLatest([
      this.form.valueChanges.pipe(skip(1)),
      this.mobilityCompleted
    ]).subscribe(([f]) => {
      if (!this.currentVehicle) return;

      const currentPkg: IPackage = this.currentVehicle.packages?.find(
        (rt) => rt.selected
      ) as IPackage;
      // Verifico si tenía movilidad ese paquete para no recotizar
      // si selecciono continuar sin movilidad
      const hadMobility: ICoverage = <ICoverage>(
        cloneDeep(
          currentPkg?.coverages?.find(
            (c) => c.pattern.code === this.MOBILITY_CODE
          )
        )
      );

      currentPkg.coverages = <ICoverage[]>(
        currentPkg?.coverages?.filter(
          (c) => c.pattern.code !== this.MOBILITY_CODE
        )
      );

      if (f.yes === 'on' && f.coverageSum && this.mobilityPkg) {
        this.mobilityPkg.terms[0].value = f.coverageSum;
        currentPkg.coverages = <ICoverage[]>[
          ...currentPkg.coverages,
          this.mobilityPkg
        ];
      }

      this.storeQuote.dispatch(
        new fromQuoteActions.SetMobilityFormValidityAction(this.form.valid)
      );

      // Si no quiero movilidad y el paquete no tenía movilidad, entonces no recotizo
      let lastValue: any = currentPkg?.coverages?.find(
        (c) => c.pattern.code === this.MOBILITY_CODE
      );
      lastValue =
        typeof lastValue?.terms[0].value === 'object'
          ? lastValue?.terms[0].value['current']
          : lastValue?.terms[0].value;

      const shouldCost = hadMobility?.terms[0].value !== lastValue;

      if (!shouldCost) return;

      this.callCost$.next();
    });
  }

  /**
   * Read policy info from store
   *
   * @memberof MobilityComponent
   */
  loadFromStore() {
    this.storePolicy
      .select(fromPolicy.getPolicyData)
      .subscribe((policy) => {
        this.policy = cloneDeep(policy);
        this.vehicles = this.policy.motor.vehicles;

        this.verifyPackages();
        this.loadSumOptions();
      })
      .unsubscribe();
  }

  /**
   * Function to find packages other than code 'A' and if they have mobility
   *
   * @memberof MobilityComponent
   */
  verifyPackages() {
    // Busco un vehículo que tenga el cobertura de movilidad y si no lo tiene, busco
    // el primero que no sea RC
    this.currentVehicle =
      <IVehicle>(
        this.vehicles.find((v) =>
          v.packages?.find(
            (p) =>
              p.selected &&
              p.code !== 'A' &&
              p?.coverages?.some((c) => c.pattern.code === this.MOBILITY_CODE)
          )
        )
      ) ||
      this.vehicles.find((v) =>
        v.packages?.find((p) => p.selected && p.code !== 'A')
      );

    if (this.currentVehicle) {
      // Si encontré uno y tiene movilidad, verifico qué valor de movilidad tiene
      let currentMobility = this.currentVehicle.packages
        ?.find(
          (p) =>
            p.selected &&
            p.coverages?.some((c) => c.pattern.code === this.MOBILITY_CODE)
        )
        ?.coverages?.find((c) => c.pattern.code === this.MOBILITY_CODE)
        ?.terms[0]?.value;

      if (currentMobility) {
        currentMobility = currentMobility?.current || (currentMobility as any);

        // Entonces, ingreso este valor en el formulario indicando que tiene movilidad
        this.form.patchValue({
          yes: 'on',
          coverageSum: currentMobility
        });
      } else if (this.fromUrl === 'emission') {
        // Si se viene de emisión y no hay movilidad se asume NO
        this.form.patchValue({
          yes: 'off',
          coverageSum: this.MOBILITY_DEFAULT
        });
      } else {
        // Si no la tuviera y no viene de emisión, entonces dejo el formulario vacío en inválido
        this.form.patchValue({
          yes: null,
          coverageSum: this.MOBILITY_DEFAULT
        });
      }

      // Tenga o no movilidad, si no es RC, el campo de movilidad
      this.form.get('coverageSum')?.setValidators(Validators.required);
      this.form.enable();
    } else {
      this.storeQuote.dispatch(
        new fromQuoteActions.SetMobilityFormValidityAction(true)
      );
    }
  }

  /**
   * Get mobility coverage options
   *
   * @memberof MobilityComponent
   */
  loadSumOptions() {
    if (!this.currentVehicle) return;

    this.additionalService
      .getAdditionalAccessorios(this.policyAdapter.adaptAdditional(this.policy))
      .pipe(
        map((resp) => {
          // Dentro de la respueta de adicionales, identifico el paquete
          // de movilidad y lo guardo en la variable mobilityPkg
          const pkg: ICoverage = resp.motor?.vehicles
            .find((v: any) => v.number === this.currentVehicle.number)
            ?.package.coverages.find(
              (c: any) => c.pattern.code === this.MOBILITY_CODE
            );

          pkg.terms[0].value =
            typeof pkg.terms[0].value === 'object'
              ? pkg.terms[0].value
              : pkg.terms[0].value;

          this.mobilityPkg = pkg;

          // Retorno únicamente las opciones que utilizará el select
          return pkg?.terms[0].options || [];
        })
      )
      .subscribe((pkgs) => {
        this.mobility = pkgs;
        this.mobilityCompleted.next();
      });
  }

  /**
   * Function called when the sidebar form is valid
   *
   * @memberof MobilityComponent
   */
  allowCost() {
    this.callCost$.next();
  }

  /**
   * Function to update costs, premiums, etc of vehicles
   * from costs response
   *
   * @param {IPolicy} policy
   * @memberof MobilityComponent
   */
  handleCost(policy: IPolicy) {
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateCostsAction(policy.costs)
    );

    this.vehicles.forEach((v) => {
      // Actualizar premiums con el resultado de la nueva cotización
      const selected = v?.packages?.find((p) => p.selected);

      // Buscar error en motor.errors de este vehículo y paquete
      const error = policy.errors?.find((e) =>
        e.externalId
          .split('&')
          .includes(`${policy.productcode},${v.number},${selected?.code}`)
      );

      // Busco los datos del paquete con la nueva cotización si existiera
      const newPackage = policy?.motor?.vehicles
        ?.find((costVehicle) => costVehicle.number === v.number)
        ?.packages?.find((p) => p.code === selected?.code);

      if (!error?.code && selected) {
        selected.premiums = <IPremium>newPackage?.premiums;
      } else if (selected) {
        selected.premiums = null;
      }
    });

    this.loadingCost = false;

    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateVehicleAction(this.vehicles)
    );

    this.storeQuote.dispatch(
      new fromQuoteActions.SetCostsResponseAction(policy)
    );
  }
}
