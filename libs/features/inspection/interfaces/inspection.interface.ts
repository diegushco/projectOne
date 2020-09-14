export interface IInspectionRequest {
  job: {
    number: string;
  };
  inspection: {
    email: string;
    phone: {
      number: string;
    };
    files: [
      {
        vehiclenumber: number;
        name: string;
        content: string;
      }
    ];
  };
}
