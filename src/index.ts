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

  toString(): string {
    return `
      year   : ${this.year}
      income : ${this.income}
    `;
  }
}
