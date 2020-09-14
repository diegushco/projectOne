import { Component, OnInit } from '@angular/core';
import {
  DocumentationService,
  IPolicy,
  IAccount,
  IVehicle
} from '@sura-platform/features';
import { Observable, combineLatest, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromPolicy from '../../../../state/policy';
import * as fromQuote from '../../../quote/state';
import * as fromEmission from '../../../emission/state';
import { switchMap, map } from 'rxjs/operators';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { InspectionStatus } from '../../../motor/components/inspection/inspectionStatus.enum';
import { viewsQuotes } from '../../../../../queries/components/quotes/quotes.enum';

@Component({
  selector: 'sxf-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  // Loadings
  lottieConfig: AnimationOptions = {
    path: '/assets/loadings/sura-loader.json'
  };
  coverageCertificate$: Observable<string> = new Observable();
  policyCopy$: Observable<string> = new Observable();
  policy$: Observable<any> = new Observable();
  policyClient$: Observable<IAccount> = new Observable();
  policyPayment$: Observable<any> = new Observable();
  policyVehicle$: Observable<IVehicle> = new Observable();
  policyVehicles$: Observable<IVehicle[]> = new Observable();
  vehiclePackage$: Observable<any> = new Observable();
  uwIssue$: Observable<boolean> = new Observable();
  currentPolicy: IPolicy = {} as IPolicy;

  PENDING = InspectionStatus.PENDING; //PreEmision
  REQUESTNONBLOCKING = InspectionStatus.REQUESTNONBLOCKING; //PosEmision

  constructor(
    private storePolicy: Store<fromPolicy.State>,
    private storeQuote: Store<fromQuote.State>,
    private storeEmission: Store<fromEmission.State>,
    public documentationService: DocumentationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.policyVehicles$ = this.storePolicy
      .select(fromPolicy.getPolicyData)
      .pipe(
        map((policy) => {
          const vehicles = policy.motor.vehicles;

          vehicles.forEach((v) => {
            v.packages = v.packages.filter((p) => p.selected);
          });

          return vehicles;
        })
      );

    this.vehiclePackage$ = combineLatest([
      this.storePolicy.select(fromPolicy.getPolicyData),
      this.storeQuote.select(fromQuote.getQuoteMotorData)
    ]).pipe(
      switchMap((x) => {
        return of(
          x[0].motor.vehicles
            .filter((p) => p.number === x[1].activeMotor)[0]
            .packages.filter((o) => o.selected)[0]
        );
      })
    );

    this.policy$ = this.storePolicy.select(fromPolicy.getPolicyData);

    this.storePolicy.select(fromPolicy.getPolicyData).subscribe((data) => {
      this.currentPolicy = data;
    });

    this.policyClient$ = this.storePolicy.select(fromPolicy.getClientData);

    this.policyPayment$ = this.storePolicy
      .select(fromPolicy.getPaymentData)
      .pipe(
        switchMap((x) => {
          if (x.method === 'BankingDebt') {
            return of({
              method: 'Debito en banco',
              number: x.cbu.number.substring(
                x.cbu.number.length - 4,
                x.cbu.number.length
              )
            });
          } else if (x.method === 'CreditCard') {
            return of({
              method: 'Tarjeta de crédito',
              type: x.creditcard.type,
              number: x.creditcard.number.substring(
                x.creditcard.number.length - 4,
                x.creditcard.number.length
              )
            });
          } else {
            return of({
              method: 'Cupón'
            });
          }
        })
      );

    this.uwIssue$ = this.storeEmission.select(fromEmission.getUwIssueData);
  }

  getCoverageCertificate() {
    this.documentationService
      .getCoverageCertificate(this.currentPolicy.job.number)
      .subscribe((data) => {
        const linkSource = 'data:application/pdf;base64,' + data.streambase64;
        const downloadLink = document.createElement('a');
        const fileName = data.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  getProducerPolicyCopy() {
    this.documentationService
      .getProducerPolicyCopy(this.currentPolicy.policynumber)
      .subscribe((data: any) => {
        const linkSource = 'data:application/pdf;base64,' + data.streambase64;
        const downloadLink = document.createElement('a');
        const fileName = data.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  getClientPolicyCopy() {
    this.documentationService
      .getClientPolicyCopy(this.currentPolicy.policynumber)
      .subscribe((data: any) => {
        const linkSource = 'data:application/pdf;base64,' + data.streambase64;
        const downloadLink = document.createElement('a');
        const fileName = data.name;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  getPlan(q: number): string {
    if (q > 1) {
      return `${q} cuotas`;
    }

    return 'Pago total';
  }

  getVehicleDescription(vehicle: IVehicle): string {
    const brand = vehicle.brand.description;

    let model: any = vehicle.model.description.split(vehicle.brand.description);
    model = model[model.length - 1];

    return `${brand} ${vehicle.shortModel || model} ${vehicle.year}`;
  }

  goHome() {
    this.router.navigate(['/queries/quotes']);
  }

  /**
   * Navigate to pending requests table
   *
   * @memberof ThankyouComponent
   */
  goToPendings() {
    this.router.navigate([`/queries/quotes/${viewsQuotes.SOLOCITUDPENDIENTE}`]);
  }
}
