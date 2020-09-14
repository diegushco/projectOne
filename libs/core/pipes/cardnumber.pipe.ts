import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardnumber'
})
export class CardNumberPipe implements PipeTransform {
  transform(value: any): any {
    const regex = /\(([^)]+)\)/;

    const match = regex.exec(value);
    const asterisk = '***' + match[1].slice(-4);

    return asterisk;
  }
}
