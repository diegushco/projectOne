import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of, combineLatest, zip } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IVehicle } from '@sura-platform/features';
import { IProfile } from '@sura-platform/features/producer/interfaces/profile.interface';
import { ProducerService, IProducer } from '@sura-platform/features/producer';
import { Store } from '@ngrx/store';

import * as fromPolicy from '../quoting/state/policy/index';
import * as fromEmission from '../quoting/components/emission/state';
import * as fromQuote from '../../../app/features/quoting/components/quote/state/index';

@Component({
  selector: 'sxf-select-producer',
  templateUrl: 'select-producer.component.html',
  styleUrls: ['select-producer.component.scss']
})
export class SelectProducerComponent implements OnInit {
  @Output() selected = new EventEmitter();

  @Output() currentProducer = new EventEmitter();

  @Output() currentProducerProfile = new EventEmitter();

  @Output() producersLoaded = new EventEmitter();

  producers$?: Observable<IProducer[]>;

  producer?: FormControl;

  commissionProducer: number | null = null;

  producerProfile?: IProfile;

  currentMotor?: IVehicle;

  constructor(
    private producerService: ProducerService,
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private storeEmission: Store<fromEmission.State>
  ) {}

  ngOnInit() {
    this.producer = new FormControl('');

    this.producers$ = this.producerService.getAllProducers().pipe(
      tap((x) => {
        this.producer?.setValue(x[0].code, { emitEvent: true });
        this.producersLoaded.emit(x);
      }),
      switchMap((p: IProducer[]) => {
        p.map((u) => (u.description = u.description + ' ' + 'Cód. ' + u.code));
        return of(p);
      })
    );

    combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ])
      .pipe(
        switchMap(([policy, quote]) => {
          const currentCar = policy.motor.vehicles?.find(
            (c) => c.number === quote.activeMotor
          );

          return of(currentCar);
        })
      )
      .subscribe((data) => {
        this.currentMotor = data;
      });

    this.producer.valueChanges
      .pipe(
        switchMap((code) =>
          zip(
            of(code),
            this.storeEmission.select(fromEmission.getJobNumber),
            this.storePolicy.select(fromPolicy.getPolicyData)
          )
        ),
        switchMap(([code, jobnumber, policy]) =>
          combineLatest([
            of(jobnumber ? Number(policy.producer.code) : code),
            this.producerService.getProfile(
              jobnumber ? policy.producer.code : code
            )
          ])
        )
      )
      .subscribe(([code, profile]) => {
        this.producerProfile = profile;
        this.producer?.setValue(code, { emitEvent: false });

        this.selected.emit(code);
        this.currentProducer.emit(code);
        this.currentProducerProfile.emit(profile);
      });

    this.storePolicy.select(fromPolicy.getCommission).subscribe((data) => {
      this.commissionProducer = data;
    });
  }
}
