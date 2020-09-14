export interface IMotorError {
  code: number;
  externalId: string;
  description?: string;
  vehicles?: Array<{
    number: string;
    description: string;
  }>;
}
