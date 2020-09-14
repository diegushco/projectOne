import { IIva } from './iva.interface';
import { ISellado } from './sellado.interface';

export interface ICost {
  vehicle?: number;
  administrativecharge: number;
  basetaxes: number;
  commission: number;
  discount: number;
  externalId: string;
  financial: number;
  internaltax: number;
  invoice: number;
  iva: IIva;
  sellado: ISellado; // No viene
  socialservice: number;
  ssnrate: number;
  submissionfee: number;
  total: number; // No viene
  vialrate: number;
}
