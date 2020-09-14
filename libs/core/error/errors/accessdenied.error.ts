export class AccessDeniedError extends Error {
  name: string;
  message: string;
  httpStatus? = 403;
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled = false;

  constructor(m: string) {
    super(m);
  }
}
