export default class JTax {
  private income: number;
  private year: number;

  constructor(income: number, year: number) {
    this.income = income;
    this.year = year;
  }

  toString(): string {
    return `
      year   : ${this.year}
      income : ${this.income}
    `;
  }
}
