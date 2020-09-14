export class BadInputError extends Error {
  name: string;
  message: string;
  httpStatus? = 404;
  applicationStatus?: number;
  errorMessageTranslationkey: string;
  handled = false;

  constructor(m: string) {
    super(m);
  }
}
