import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencySign: string = '$ ',
    decimalLength: number = 0,
    chunkDelimiter: string = '.',
    decimalDelimiter: string = ',',
    chunkLength: number = 3
  ): string {
    value /= 1;

    const result =
      '\\d(?=(\\d{' +
      chunkLength +
      '})+' +
      (decimalLength > 0 ? '\\D' : '$') +
      ')';
    // tslint:disable-next-line: no-bitwise
    const num = value.toFixed(Math.max(0, ~~decimalLength));

    return (
      currencySign +
      (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(
        new RegExp(result, 'g'),
        '$&' + chunkDelimiter
      )
    );
  }
}
