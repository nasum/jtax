import { IncomeTax, IncomeTaxDetail } from "./incomeTax";

type Expenses = {
  type: string;
  amount: number;
};

type Deduction = {
  type: string;
  amount: number;
};

export default class JTax {
  private income: number;
  private year: number;
  private lastYearResult?: JTax;
  private expensesList: Expenses[] = [];
  private deductionList: Deduction[] = [];
  private incomeTax: IncomeTax;

  constructor(income: number, year: number, incomeTaxDetail?: IncomeTaxDetail) {
    this.income = income;
    this.year = year;
    this.incomeTax = new IncomeTax(income, incomeTaxDetail);
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

  addExpenses(expenses: Expenses): void {
    this.expensesList.push(expenses);
  }

  get totalExpenses(): number {
    let total = 0;
    this.expensesList.forEach((expenses) => {
      total += expenses.amount;
    });
    return total;
  }

  addDeduction(deduction: Deduction): void {
    this.deductionList.push(deduction);
  }

  get totalDeduction(): number {
    let total = 0;
    this.deductionList.forEach((deduction) => {
      total += deduction.amount;
    });
    return total;
  }

  get totalIncomeTax(): number {
    return this.incomeTax.culcIncomeTax();
  }

  toString(): string {
    return `
      year   : ${this.year}
      income : ${this.income}
    `;
  }
}
