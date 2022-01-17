export class ResidentTax {
  private income: number;
  constructor(income: number) {
    this.income = income;
  }

  calcResidentTax(): number {
    return Math.floor(this.income * 0.1);
  }
}
