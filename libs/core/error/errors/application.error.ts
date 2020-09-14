export class ApplicationError extends Error {
  code: string;
  description: string;
  handled = false;

  constructor(m: string, code: string) {
    super(m);
    this.code = code;
    this.description = m;
  }
}
