type IncomeRange = {
  min?: number;
  max?: number;
  taxRation: number;
  deduction: number;
};

const defaultIncomeRangeList: IncomeRange[] = [
  {
    max: 1950000,
    taxRation: 0.05,
    deduction: 0,
  },
  {
    min: 1950000,
    max: 3300000,
    taxRation: 0.1,
    deduction: 97500,
  },
  {
    min: 3300000,
    max: 6950000,
    taxRation: 0.2,
    deduction: 427500,
  },
  {
    min: 6950000,
    max: 9000000,
    taxRation: 0.23,
    deduction: 636000,
  },
  {
    min: 9000000,
    max: 18000000,
    taxRation: 0.33,
    deduction: 1536000,
  },
  {
    min: 18000000,
    max: 40000000,
    taxRation: 0.4,
    deduction: 2796000,
  },
  {
    min: 40000000,
    taxRation: 0.45,
    deduction: 4796000,
  },
];

export class IncomeTaxDetail {
  private _specialIncomeTax: number = 0.021;
  private incomeRangeList: IncomeRange[];

  constructor(incomeRangeList?: IncomeRange[]) {
    this.incomeRangeList = incomeRangeList || defaultIncomeRangeList;
  }

  getTaxRate(income: number): number {
    const range = this.getRange(income);
    return range.taxRation;
  }

  getDeduction(income: number): number {
    const range = this.getRange(income);
    return range.deduction;
  }

  get specialIncomeTax(): number {
    return this._specialIncomeTax;
  }

  set specialIncomeTax(_specialIncomeTax: number) {
    this._specialIncomeTax = _specialIncomeTax;
  }

  private getRange(income: number): IncomeRange {
    const range = this.incomeRangeList.find((incomeRange) => {
      if (incomeRange.min && incomeRange.max) {
        return income >= incomeRange.min && income <= incomeRange.max;
      }
      if (incomeRange.max) {
        return income <= incomeRange.max;
      }
      if (incomeRange.min) {
        return income > incomeRange.min;
      }
    });

    if (range) {
      return range;
    } else {
      throw new Error("Income range not found");
    }
  }
}

export class IncomeTax {
  private income: number;
  private incomeTaxDetail: IncomeTaxDetail;

  constructor(income: number, incomeTaxDetail?: IncomeTaxDetail) {
    this.income = income;
    this.incomeTaxDetail = incomeTaxDetail || new IncomeTaxDetail();
  }

  culcIncomeTax(): number {
    const tax =
      (this.income * this.incomeTaxDetail.getTaxRate(this.income) -
        this.incomeTaxDetail.getDeduction(this.income)) *
      (1 + this.incomeTaxDetail.specialIncomeTax);

    return Math.floor(tax);
  }
}
