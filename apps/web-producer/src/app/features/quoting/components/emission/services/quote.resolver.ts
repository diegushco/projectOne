import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromEmission from '../state';
import * as fromEmissionActions from '../state/emission.actions';
import * as fromPolicy from '../../../state/policy';
import * as fromPolicyActions from '../../../state/policy/policy.actions';

import {
  AccountService,
  QuotesService,
  UtilService,
  IVehicle,
  IPayment,
  IPolicy,
  IOfficialIds,
  IAccount,
  VehicleGroup,
  IPaymentPlan,
  IAddress,
  IDiscount,
  ICost,
  IMotorError
} from '@sura-platform/features';

import * as moment from 'moment';
import { MOTOR_CONF } from '../../motor/motor.config';

@Injectable()
export class QuoteResolver implements Resolve<Observable<any>> {
  /**
   * Current date and time of
   * the server.
   *
   * @type {string}
   * @memberof QuoteResolver
   */
  serverDate: string | null = null;

  /**
   * Flag used to detect if payment.period
   * should be modified or not.
   *
   * @type {boolean}
   * @memberof QuoteResolver
   */
  approved: boolean | null = null;

  constructor(
    private quotesService: QuotesService,
    private accountService: AccountService,
    private storeEmission: Store<fromEmission.State>,
    private storePolicy: Store<fromPolicy.State>,
    private utilService: UtilService
  ) {}

  resolve() {
    return combineLatest([
      this.storePolicy.select(fromPolicy.getJob),
      this.storeEmission.select(fromEmission.getEmission),
      this.utilService.getCurrentServerDate()
    ]).pipe(
      switchMap((x) => {
        const jobFromPolicy = x[0].number;
        const jobFromEmission = x[1].jobNumberFromQuotes;
        this.serverDate = x[2].datetime;
        this.approved = x[1].approvedEmission;

        // Si no hay jobnumber en policy, entonces no cargo RETRIEVE
        if (jobFromPolicy !== null) return of(true);

        // Si no hay jobnumber en emission, entonces no cargo RETRIEVE
        if (!jobFromEmission || jobFromEmission === '') return of(true);

        // En caso de que haya jobnumber en emission entonces hago el RETRIEVE
        return this.quotesService.getQuote(jobFromEmission).pipe(
          switchMap(async (retrieve) => {
            this.fillPolicyAttributes(retrieve);

            // Si obtener información sobre el usuario en guidewire
            const officialId = retrieve.client?.officialids?.find(
              (id) => id.primary
            );
            await this.getAccountInfo(officialId as IOfficialIds, retrieve);

            // ML: En Emission guardo el ID del policy.address
            this.storeEmission.dispatch(
              new fromEmissionActions.SetPolicyAddressFromQuotesAction(
                retrieve.address as IAddress
              )
            );
            return of(true);
          })
        );
      }),
      first()
    );
  }

  private fillPolicyAttributes(policy: Partial<IPolicy>) {
    // Jobtype
    policy = {
      ...policy,
      job: {
        ...policy?.job,
        type: 'Submission'
      } as {
        number: string;
        type: string;
      }
    };

    // Completo los campos faltantes en retrieve para payment y paymentTerm
    const payment: IPayment = {
      method: null,
      plan: {
        code: null
      },
      cbu: {
        alias: null,
        conduit: null,
        number: null
      },
      creditcard: {
        expirationdate: null,
        number: null,
        type: null
      },
      id: null
    };

    const paymentTerm: IPaymentPlan = {
      code: policy?.payment?.plan?.code as string,
      description: null,
      maximumnumberofinstallments: null
    };

    policy.payment = {
      ...payment,
      ...policy.payment
    };

    policy.paymentTerm = {
      ...paymentTerm,
      ...policy.paymentTerm
    };

    this.populatePeriod(policy);

    // En policy agrego el document type y number del cliente
    const officialid = policy?.client?.officialids?.find((id) => id.primary);

    policy = {
      ...policy,
      client: {
        ...policy.client,
        documentNumber: officialid?.value as string,
        documentType: officialid?.type as string
      } as IAccount,
      motor: {
        ...policy.motor,
        fleet: 'NonFleet',
        vehicles: policy?.motor?.vehicles?.sort((a, b) => {
          if (a.number && b.number) {
            return a?.number - b?.number;
          }
          return a.number as number;
        })
      } as {
        fleet: string;
        vehicles: Array<IVehicle>;
        discounts: IDiscount[];
        commission: {
          producer: number;
        };
        costs: ICost[];
        errors?: Array<IMotorError>;
      }
    };

    policy?.motor?.discounts?.forEach((discount) => {
      discount.value = Math.abs(discount.value);
    });

    // Esto es para meter package dentro del arreglo packages
    policy?.motor?.vehicles?.forEach((vehicle: Partial<IVehicle>) => {
      // No tengo ID desde retrieve
      vehicle.id = vehicle.number;

      // ML: Sin estos campos en el objeto, falla en emission
      vehicle.group = this.findVehicleGroup(vehicle?.model?.type as string);
      vehicle.license = vehicle.license || null;

      // Detectar si el conductor es el cliente
      let clientIsDriver = false;
      const driver = vehicle.driver;
      const client = policy.client;

      if (driver) {
        if (
          client?.firstname?.toLowerCase() ===
            driver?.firstname?.toLowerCase() &&
          client?.lastname?.toLowerCase() === driver?.lastname?.toLowerCase()
        ) {
          clientIsDriver = true;
        }
      }

      vehicle.driver = {
        firstname: null,
        lastname: null,
        birth: null,
        gender: null,
        clientIsDriver,
        ...vehicle.driver
      };

      if (!vehicle.bondholder) {
        vehicle.bondholder = {
          finish: null,
          firstinstallmentdue: null,
          number: null,
          quotas: null,
          start: null,
          type: null
        };
      } else {
        vehicle.bondholder.type = Number(vehicle.bondholder.type);
      }

      if (vehicle.package) {
        // Buscar la descripción del paquete en JSON
        let pkgDescription = '';
        MOTOR_CONF?.find(
          (v) => v.vehicleType === vehicle.group
        )?.package?.forEach((pkg) => {
          pkg?.packages?.forEach((pkgs) => {
            if (pkgs?.code === vehicle?.package?.code) {
              // Este campo es necesario para identificar a qué grupo corresponde
              // esta cotización
              vehicle.package.group = pkg.code;

              pkgDescription = pkgs.description;
              return;
            }
          });
        });
        vehicle.package.description = pkgDescription;
        vehicle.package.selected = true;
        vehicle.package.externalid = `${vehicle.number}_${vehicle.package.code}`;

        vehicle.packages = [];
        vehicle.packages.push(vehicle.package);
      }
    });

    this.storePolicy.dispatch(new fromPolicyActions.SetPolicyAction(policy));
  }

  private getAccountInfo(
    officialid: IOfficialIds,
    policy: Partial<IPolicy>
  ): Promise<IAccount> {
    const data: any = {
      officialid
    };

    return new Promise((res, rej) => {
      this.accountService.getAccounts(data).subscribe((account) => {
        if (!account) {
          const client = policy.client;

          this.storeEmission.dispatch(
            new fromEmissionActions.SetBasicDataForClientAction(
              client?.type as string,
              client?.companyname?.toUpperCase() as string,
              client?.firstname?.toUpperCase() as string,
              client?.lastname?.toUpperCase() as string,
              client?.contactid as string,
              client?.documentNumber as string,
              client?.documentType as string,
              client?.address as IAddress
            )
          );

          return res();
        }

        account.documentNumber = officialid.value;
        account.documentType = officialid.type;

        if (policy?.client?.address?.id) {
          const address = account?.addresses?.find(
            (add) => add.id === policy?.client?.address?.id
          );

          account.address = address
            ? address
            : {
                apartment: null,
                city: null,
                clarification: null,
                floor: null,
                id: null,
                postalcode: null,
                state: null,
                street: null,
                streetnumber: null,
                type: null
              };
        }

        this.storePolicy.dispatch(
          new fromPolicyActions.SetClientDataAction(account)
        );
        this.storeEmission.dispatch(
          new fromEmissionActions.SetClientData(account)
        );
        res(account);
      }, rej);
    });
  }

  /**
   * Method used for find the vehicle group
   *
   * @private
   * @param {string} type
   * @returns {(VehicleGroup | null)}
   * @memberof QuoteResolver
   */
  private findVehicleGroup(type: string): VehicleGroup | null {
    return MOTOR_CONF.find((conf) => conf.types.includes(type))
      ?.vehicleType as VehicleGroup | null;
  }

  /**
   * Method used to change period properties
   * when the policy does not come from
   * an approved issue.
   *
   * @private
   * @param {Partial<IPolicy>} policy
   * @returns
   * @memberof QuoteResolver
   */
  private populatePeriod(policy: Partial<IPolicy>) {
    const currentDate = moment(this.serverDate);
    let methodName: string;
    let methodMonths: number;

    if (this.approved) {
      return;
    }

    if (!policy.period) {
      policy.period = {
        start: currentDate.toDate(),
        end: null,
        method: null,
        rate: null
      };

      return;
    }

    switch (policy.period.method) {
      case 'Sura_ThreeMonths':
        methodName = 'Sura_ThreeMonths';
        methodMonths = 3;
        break;

      default:
        methodName = 'Sura_ThreeMonths';
        methodMonths = 3;
    }

    const start = currentDate.toDate();
    const end = currentDate.clone().add(methodMonths, 'months').toDate();

    policy.period = {
      start,
      end,
      method: methodName,
      rate: undefined
    };
  }
}
