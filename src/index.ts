export default class JTax {
  private income: number;
  private year: number;
  private lastYearResult?: JTax;

  constructor(income: number, year: number) {
    this.income = income;
    this.year = year;
  }

  addLastYearResult(lastYearResult: JTax): void {
    if (this.year - lastYearResult.year == 1) {
      this.lastYearResult = lastYearResult;
    } else {
      throw new Error(
        `Unacceptable: this year is ${this.year}, last year is ${lastYearResult.year}`
      );
    }
  }

  toString(): string {
    return `
      year   : ${this.year}
      income : ${this.income}
    `;
  }
}
