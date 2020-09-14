import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as fromQuote from '../../../quote/state';
import * as fromPolicy from '../../../../state/policy';
import * as fromPolicyActions from '../../../../state/policy/policy.actions';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { IRoutes } from '@sura-platform/web/core/models/question/routes.interface';

import * as fromQuoteActions from '../../../quote/state/quote.actions';

import {
  HomeUsesService,
  IHomeUses,
  IHouse,
  IHomeType,
  HomeTypesService,
  IConstruction,
  ConstructionService
} from '@sura-platform/features';
import { SelectComponent, ModalComponent } from '@sura-platform/web';

export enum KEY_CODE {
  ENTER = 'Enter'
}

@Component({
  selector: 'sxf-home-useconstruction',
  templateUrl: './useconstruction.component.html',
  styleUrls: ['./useconstruction.component.scss']
})
export class HomeUseConstructionComponent implements OnInit, OnDestroy {
  /**
   * Construction select
   */
  @ViewChild('construction') constructionSelect: SelectComponent = <
    SelectComponent
  >{};

  @ViewChild('modalRequireApproval', { static: true })
  modalRequireApproval: ModalComponent = <ModalComponent>{};

  /**
   * Current house number
   */
  currentHome: number | null = 0;

  /**
   * Home routes
   */
  routes: IRoutes[] = <IRoutes[]>{};

  /**
   * Home use form
   *
   * @type {FormGroup}
   * @memberof HomeUseComponent
   */
  form: FormGroup = <FormGroup>{};

  /**
   * List of home uses from service
   *
   * @type {Observable<IHomeUses[]>}
   * @memberof HomeUseComponent
   */
  homeUses: IHomeUses[] = <IHomeUses[]>{};

  /**
   * List of home types from service
   *
   * @type {IHomeType[]}
   * @memberof HomeTypeComponent
   */
  homeTypes: IHomeType[] = <IHomeType[]>{};

  /**
   * All houses
   */
  houses: IHouse[] = <IHouse[]>{};

  quoteHomeSubscription: Subscription = new Subscription();
  getUsesSubscription: Subscription = new Subscription();
  getTypesSubscription: Subscription = new Subscription();

  /**
   * Construction observable
   */
  constructions$: Observable<IConstruction[]> = <Observable<IConstruction[]>>{};

  /**
   * Current House of houses vector
   */
  currentHouse: IHouse = <IHouse>{};

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.ENTER) {
      this.continue();
    }
  }

  constructor(
    private storeQuote: Store<fromQuote.State>,
    private storePolicy: Store<fromPolicy.State>,
    private flowRouteService: FlowRouteService,
    private fb: FormBuilder,
    public homeUsesService: HomeUsesService,
    private homeTypesService: HomeTypesService,
    public constructionService: ConstructionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      homeUse: ['permanent', Validators.required],
      homeType: ['homePlantaBPrimerP', Validators.required],
      construction: ['MatConstSolCeiHOESura', Validators.required]
    });

    this.getUsesSubscription = this.homeUsesService
      .getUses()
      .subscribe((data) => {
        this.homeUses = data;
      });

    this.getTypesSubscription = this.homeTypesService
      .getTypes()
      .subscribe((data) => {
        this.homeTypes = data;
      });

    this.constructions$ = this.constructionService.getAllConstructions();

    this.form.get('construction')?.valueChanges.subscribe((op) => {
      if (op === 'WoodConstHOESura') {
        this.modalRequireApproval.openModal();
      }
    });

    this.quoteHomeSubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeData),
      this.storeQuote.select(fromPolicy.getHouses)
    ]).subscribe(([homeData, houses]) => {
      this.currentHome = homeData.activeHome;
      this.routes = <IRoutes[]>homeData.routes;
      this.houses = houses;
      this.currentHouse = <IHouse>(
        this.houses.find((h) => h.id === this.currentHome)
      );
      if (this.currentHouse && this.currentHouse.use) {
        this.form
          .get('homeUse')
          ?.setValue(this.currentHouse.use, { emitEvent: false });
      }
      if (this.currentHouse && this.currentHouse.use) {
        this.form
          .get('homeType')
          ?.setValue(this.currentHouse.type, { emitEvent: false });
      }
      if (this.currentHouse && this.currentHouse.use) {
        this.form
          .get('construction')
          ?.setValue(this.currentHouse.construction, { emitEvent: false });
      }
    });
  }

  /**
   * Method use to go to the next question
   *
   * @memberof HomeUseComponent
   */
  continue() {
    const homeUse = this.form.get('homeUse')?.value;
    const house = this.houses.find(
      (data: any) => data.id === this.currentHome
    ) as IHouse;
    house.use = homeUse;
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );

    const homeType = this.form.get('homeType')?.value;
    house.type = homeType;
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );

    const constructionsItems: IConstruction[] = <IConstruction[]>(
      this.constructionSelect.items
    );

    const construction = this.form.get('construction')?.value;
    house.construction = construction;
    this.storePolicy.dispatch(
      new fromPolicyActions.UpdateHouseAction(this.houses)
    );

    const dataBasic = [];
    dataBasic.push(this.homeUses?.find((data) => data.code === homeUse));
    dataBasic.push(this.homeTypes?.find((data) => data.code === homeType));
    dataBasic.push(
      constructionsItems?.find((data) => data.code === construction)
    );
    this.storeQuote.dispatch(
      new fromQuoteActions.DataBasicHouseAction(dataBasic)
    );

    this.flowRouteService.enableHomeRoute(
      this.currentHome as number,
      this.routes,
      'm2',
      'useconstruction',
      this.homeUses?.find((data) => data.code === homeUse)?.description +
        ', ' +
        this.homeTypes?.find((data) => data.code === homeType)?.description +
        ', ' +
        constructionsItems?.find((data) => data.code === construction)
          ?.description
    );
  }

  ngOnDestroy(): void {
    if (this.quoteHomeSubscription) this.quoteHomeSubscription.unsubscribe();
    if (this.getUsesSubscription) this.getUsesSubscription.unsubscribe();
    if (this.getTypesSubscription) this.getTypesSubscription.unsubscribe();
  }
}
