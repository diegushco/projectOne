export interface IComission {
  lines: {
    default: {
      administratorcharge: number;
      commissions: {
        producer: {
          default: number;
          maximum: number;
        };
        organizer: {
          default: number;
          maximum: number;
        };
        superorganizer: {
          default: number;
          maximum: number;
        };
      };
    };
    motor: {
      administratorcharge: number;
      commissions: {
        producer: {
          default: number;
          maximum: number;
        };
        organizer: {
          default: number;
          maximum: number;
        };
        superorganizer: {
          default: number;
          maximum: number;
        };
      };
    };
    home: {
      administratorcharge: number;
      commissions: {
        producer: {
          default: number;
          maximum: number;
        };
        organizer: {
          default: number;
          maximum: number;
        };
        superorganizer: {
          default: number;
          maximum: number;
        };
      };
    };
    personalaccident: {
      administratorcharge: number;
      commissions: {
        producer: number;
        organizer: number;
        superorganizer: number;
      };
    };
  };
}
