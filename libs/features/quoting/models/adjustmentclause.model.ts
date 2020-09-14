export class AdjustmentClause {
  code: string;
  description: string;
  terms: any;

  constructor(code: string, description: string, terms: any) {
    this.code = code;
    this.description = description;
    this.terms = terms;
  }
}
