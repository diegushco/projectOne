export interface IAmounts {
  coverages: Array<IHomeCoverages>;
}

export interface IHomeCoverages {
  pattern: {
    code: string;
    description: string;
  };
  terms: [
    {
      code: string;
      value: {
        suggested: string | null;
        max?: number | null;
        min?: number | null;
        current?: number | null;
      };
    }
  ];
  category: {
    code: string;
    block?: string;
    visible?: boolean;
    editable?: boolean;
  };
  inherit?: boolean;
  child?: Array<{ description: string; suggested: string }>;
}
