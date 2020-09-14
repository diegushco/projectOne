export class ServerError extends Error {
  name: string;
  code: number;
  message: string;
  httpStatus? = 500;
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled = false;

  constructor(m: string, code: number) {
    super(m);
    this.code = code;
  }
}
