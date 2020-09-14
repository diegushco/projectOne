export class AuthFailError extends Error {
  name: string;
  message: string;
  httpStatus = 401;
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled = false;

  constructor(m: string) {
    super(m);
  }
}
