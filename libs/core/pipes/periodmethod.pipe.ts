import { Pipe, PipeTransform } from '@angular/core';
import filter from 'lodash/filter';

@Pipe({
  name: 'periodmethod'
})
export class PeriodMethodPipe implements PipeTransform {
  transform(value: any): any {
    const period = [
      {
        code: 'Annual',
        description: 'Anual',
        value: 12
      },
      {
        code: 'HalfYear',
        description: 'Semestral',
        value: 6
      },
      {
        code: 'Sura_FourMonths',
        description: 'Cuatrimestral',
        value: 4
      },
      {
        code: 'Sura_ThreeMonths',
        description: 'Trimestral',
        value: 3
      },
      {
        code: 'Sura_OneMonth',
        description: 'Mensual',
        value: 1
      },
      {
        code: 'Other',
        description: 'Otro',
        value: 0
      }
    ];

    const data = filter(period, { code: value });

    if (data.length > 0) {
      return data[0];
    } else {
      return value;
    }
  }
}
