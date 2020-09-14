export interface IError {
  fault: IFault;
}

export interface IFault {
  code: number;
  type: string;
  message: string;
  description: string;
}

export interface INotification {
  code: number;
  description: string;
}
