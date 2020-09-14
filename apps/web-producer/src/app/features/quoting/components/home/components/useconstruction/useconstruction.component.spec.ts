/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeUseConstructionComponent } from './useconstruction.component';
import { FlowRouteService } from '../../../quote/services/flow-route.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../../index';

import {
  HomeUsesService,
  HomeTypesService,
  ConstructionService,
  IHomeUses,
  IHomeType,
  IConstruction
} from '@sura-platform/features';
import { from } from 'rxjs';

describe('HomeUseConstructionComponent', () => {
  let component: HomeUseConstructionComponent;
  let fixture: ComponentFixture<HomeUseConstructionComponent>;
  let homeUsesService: HomeUsesService;
  let homeTypesService: HomeTypesService;
  let constructionService: ConstructionService;

  const constructionFake: IConstruction[] = [
    { code: 'consttruction1', description: 'Descripcion Construction1' },
    { code: 'consttruction2', description: 'Descripcion Construction2' },
    { code: 'consttruction3', description: 'Descripcion Construction3' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        NgbModule
      ],
      declarations: [HomeUseConstructionComponent],
      providers: [
        FlowRouteService,
        FormBuilder,
        HomeUsesService,
        HomeTypesService,
        ConstructionService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeUseConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    homeUsesService = TestBed.inject(HomeUsesService);
    homeTypesService = TestBed.inject(HomeTypesService);
    constructionService = TestBed.inject(ConstructionService);
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('HomeUse formcontrol should be default permanent', () => {
    expect(component.form.get('homeUse').value).toBe('permanent');
  });

  it('HomeUse formcontrol should be required', () => {
    component.form.get('homeUse').setValue('');

    expect(component.form.get('homeUse').valid).toBeFalse();
  });

  it('HomeUse formcontrol should be valid', () => {
    component.form.get('homeUse').setValue('2');

    expect(component.form.get('homeUse').valid).toBeTrue();
  });

  it('Do load uses from HomeUses service', () => {
    const uses: IHomeUses[] = [
      { code: 'code1', description: 'Descripción 01' },
      { code: 'code2', description: 'Descripción 02' },
      { code: 'code3', description: 'Descripción 03' }
    ];

    const getUses = spyOn(homeUsesService, 'getUses').and.callFake(() => {
      return from([uses]);
    });
    component.ngOnInit();

    expect(getUses).toHaveBeenCalled();
  });

  it('HomeType formcontrol should be default homePlantaBPrimerP', () => {
    expect(component.form.get('homeType').value).toBe('homePlantaBPrimerP');
  });

  it('HomeType formcontrol should be required', () => {
    component.form.get('homeType').setValue('');

    expect(component.form.get('homeType').valid).toBeFalse();
  });

  it('HomeType formcontrol should be valid', () => {
    component.form.get('homeType').setValue('2');

    expect(component.form.get('homeType').valid).toBeTrue();
  });

  it('Do load uses from HomeTypes service', () => {
    const uses: IHomeType[] = [
      { code: 'code1', description: 'Descripción 01' },
      { code: 'code2', description: 'Descripción 02' },
      { code: 'code3', description: 'Descripción 03' }
    ];

    const getTypes = spyOn(homeTypesService, 'getTypes').and.callFake(() => {
      return from([uses]);
    });
    component.ngOnInit();

    expect(getTypes).toHaveBeenCalled();
  });

  it('Check continue method is defined', () => {
    expect(component.continue).toBeDefined();
  });

  it('Check default value (US 7779): MatConstSolCeiHOESura', () => {
    expect(component.form.get('construction').value).toBe(
      'MatConstSolCeiHOESura'
    );
  });

  it('Check call serviceConstruction', () => {
    const allConstruction = spyOn(
      constructionService,
      'getAllConstructions'
    ).and.callFake(() => {
      return from([constructionFake]);
    });

    component.ngOnInit();
    expect(allConstruction).toHaveBeenCalled();
  });
});
