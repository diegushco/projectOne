export enum BACKEND_ERRORS {
  BUSINESS = 101 /* BusinessValidation - Validacion de negocio */,
  DATABASE = 102 /* DataBaseexception - Error en BD */,
  SYSTEM = 103 /* SystemError - Error en el servidor de aplicaciones */,
  GENERIC = 104 /* GenericException - Error no controlado */,
  UNDERWRITER = 105 /* UWIssue - UW Issues */
}
