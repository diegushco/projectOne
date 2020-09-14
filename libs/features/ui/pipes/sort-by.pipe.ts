/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
 */
import { Pipe, PipeTransform } from '@angular/core';
import sortBy from 'lodash/sortBy';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    } // no array
    if (!column || column === '') {
      return sortBy(value);
    } // sort 1d array
    if (value.length <= 1) {
      return value;
    } // array with only one item
    return sortBy(value, [column], [order]);
  }
}
