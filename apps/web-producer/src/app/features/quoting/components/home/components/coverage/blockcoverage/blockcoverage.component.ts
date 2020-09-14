import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { BaseComponent } from '@sura-platform/core';
import { IHomeCoverages, IHouse, IPolicy } from '@sura-platform/features';
import { HOME_CONF } from '../../../home.config';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../../state/policy';
import * as fromQuote from '../../../../quote/state';
import { ICoverage } from '@sura-platform/features/coverage';
@Component({
  selector: 'sxf-homeblockcoverage',
  templateUrl: 'blockcoverage.component.html',
  styleUrls: ['blockcoverage.component.scss']
})
export class HomeBlockCoverageComponent extends BaseComponent
  implements OnInit, OnDestroy {
  /**
   * Package to render
   *
   * @type {*}
   * @memberof HomeBlockCoverageComponent
   */
  @Input() public package: any;

  /**
   * List items of coverages
   *
   * @type {IHomeCoverages[]}
   * @memberof HomeBlockCoverageComponent
   */
  @Input() public listItems: IHomeCoverages[] = [];

  /**
   * If true show Others coverages
   *
   * @memberof HomeBlockCoverageComponent
   */
  @Input() showOthersCoverages = false;

  /**
   * If true show Premiums coverages
   *
   * @memberof HomeBlockCoverageComponent
   */
  @Input() showPremiumsCoverages = false;

  @Input() checkUncheckCoverage: any[] = [];

  /**
   * For hover card package
   *
   * @memberof HomeBlockCoverageComponent
   */
  @Input() hoverPackage = 0;

  /**
   * Index for each package renderized
   *
   * @memberof HomeBlockCoverageComponent
   */
  @Input() packageIndex = 0;

  /**
   * Available coverages BlockOne for package
   *
   * @type {*}
   * @memberof HomeBlockCoverageComponent
   */
  availableCoveragesBenefits: any = [];

  /**
   * Available coverages BlockThree for package
   *
   * @type {*}
   * @memberof HomeBlockCoverageComponent
   */
  availableCoveragesPremium: any = [];

  /**
   * Available coverages BlockTwo for package
   *
   * @type {*}
   * @memberof HomeBlockCoverageComponent
   */
  availableCoveragesOthers: any = [];

  quoteHomeSubscription: Subscription = new Subscription();

  /**
   * Current house number
   */
  currentHome: number | null = 0;

  /**
   * All houses
   */
  houses: IHouse[] = <IHouse[]>{};

  /**
   * Current House of houses vector
   */
  currentHouse: IHouse = <IHouse>{};

  policy: IPolicy = <IPolicy>{};

  pckCoverageDefault: IHouse[] = <IHouse[]>{};

  constructor(private storePolicy: Store<fromPolicy.State>) {
    super();
  }

  ngOnInit(): void {
    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeData),
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storePolicy.select(fromQuote.getCoverageDefault)
    ]).subscribe(([homeData, policy, coverageDefault]) => {
      //pckCoverageDefault, es porque los chulitos y X
      //esten anclados a los default de cada paquete
      //pero estos default no necesariamente van a la cotizacion
      this.pckCoverageDefault = <IHouse[]>coverageDefault;
      this.currentHome = homeData.activeHome;

      const currentPckCov = this.pckCoverageDefault
        ?.find((pc) => pc.number === this.currentHome)
        ?.packages?.find((pg) => pg.code === this.package.code)?.coverages;

      this.availableCoveragesBenefits = this.mergeCoverages(
        this.listItems,
        <ICoverage[]>currentPckCov,
        HOME_CONF.codesBenefitsCoverages,
        false
      );

      this.availableCoveragesPremium = this.mergeCoverages(
        this.listItems,
        <ICoverage[]>currentPckCov,
        HOME_CONF.codesPlanPremiumsCoverages,
        false
      );

      const coverageBenefitsPremium = HOME_CONF.codesPlanPremiumsCoverages.concat(
        HOME_CONF.codesBenefitsCoverages
      );

      this.availableCoveragesOthers = this.mergeCoverages(
        this.listItems,
        <ICoverage[]>currentPckCov,
        coverageBenefitsPremium,
        true
      );

      this.policy = policy;
      this.currentHouse = <IHouse>(
        this.policy.home.dwellings.find((h) => h.number === this.currentHome)
      );
    });
  }

  mergeCoverages(
    fullList: any[],
    partialList: ICoverage[],
    allowCodes?: string[],
    others?: boolean
  ) {
    // Se genera un arreglo con las coberturas marcadas como
    // disponible o no disponible para el paquete
    // en fullList vienen todas las coberturas, en partialList vienen
    // las coberturas disponibles para el paquete
    const coverages: any[] = [];
    fullList.forEach((item: any) => {
      if (allowCodes?.includes(item.pattern.code) && !others) {
        coverages.push(this.proccessCoverage(item, partialList));
      }
      if (others && !allowCodes?.includes(item.pattern.code)) {
        coverages.push(this.proccessCoverage(item, partialList));
      }
    });
    return coverages;
  }

  proccessCoverage(item: any, partialList: any[]) {
    const coverageAvailable = {
      available: false,
      code: '',
      description: '',
      visible: true
    };
    const coverage = partialList.find(
      (c: any) => item.pattern.code === c.pattern.code
    );

    if (coverage) {
      coverageAvailable.available = true;
      coverageAvailable.code = coverage.pattern.code;
      coverageAvailable.description = coverage.pattern.description;
      coverageAvailable.visible = !HOME_CONF.codesExcludeCoverages.includes(
        coverageAvailable.code
      );
    } else {
      coverageAvailable.available = false;
      coverageAvailable.code = item.pattern.code;
      coverageAvailable.description = item.pattern.description;
      coverageAvailable.visible = !HOME_CONF.codesExcludeCoverages.includes(
        coverageAvailable.code
      );
    }

    return coverageAvailable;
  }

  isCheckUncheckCoverage(coverage: any, defaultReturn = true) {
    const control = this.checkUncheckCoverage.find(
      (ctl: any) => ctl.code === coverage.code
    );
    if (control) {
      return control.checked;
    } else {
      return defaultReturn;
    }
  }

  ngOnDestroy() {}
}
