export interface IDiscount {
  code: string;
  value: number;
  minimum: number;
  maximum: number;
}

export interface IAvailableDiscounts {
  applied: number;
  total: number;
}
