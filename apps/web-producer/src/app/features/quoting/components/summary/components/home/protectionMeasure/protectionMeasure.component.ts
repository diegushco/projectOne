import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { IPolicy, IHouse } from '@sura-platform/features';
import * as fromPolicy from './../../../../../state/policy';
import { Store } from '@ngrx/store';
import * as fromQuote from './../../../../quote/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'sxf-protectionmeasure',
  templateUrl: './protectionMeasure.component.html',
  styleUrls: ['./protectionMeasure.component.scss']
})
export class ProtectionMeasureComponent implements OnInit, OnDestroy {
  @Input() policy: IPolicy = <IPolicy>{};

  policySubscription: Subscription = new Subscription();

  currentHome: number | null = 0;

  housePolicy: IHouse = <IHouse>{};

  quoteHome: any = {};

  form: FormGroup = <FormGroup>{};

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.policySubscription = combineLatest([
      this.storePolicy.select(fromQuote.getQuoteHomeActiveHome),
      this.storePolicy.select(fromQuote.getQuoteHomeData)
    ]).subscribe((dat: any) => {
      this.currentHome = dat[0];
      this.quoteHome = dat[1];
      if (this.policy.home) {
        this.housePolicy = <IHouse>(
          this.policy.home.dwellings.find(
            (h: any) => h.number === this.currentHome
          )
        );
      }
    });

    this.form = this.fb.group({
      differentialcircuitbreaker: [false, Validators.required],
      embeddedelectricalwiring: [false, Validators.required],
      goodconditionelectric: [false, Validators.required],
      soundalarmwithmonitoring: [false, Validators.required],
      soundalarmonly: [false, Validators.required],
      reinforceddoor: [false, Validators.required],
      permanentvigilance: [false, Validators.required],
      doublelock: [false, Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.policySubscription) this.policySubscription.unsubscribe();
  }
}
