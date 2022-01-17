import JTax from "..";

test.each([[500000, 2020]])("toString", (income, year) => {
  const jtax = new JTax(income, year);
  expect(jtax.toString()).toBe(`
      year   : ${year}
      income : ${income}
    `);
});

describe("addLastYearResult", () => {
  test.each([[500000, 2021, 500000, 2020]])(
    "accept",
    (income, year, income2, year2) => {
      const jtax = new JTax(income, year);
      const jtax2 = new JTax(income2, year2);
      jtax.addLastYearResult(jtax2);
      expect(jtax.toString()).toBe(`
      year   : ${year}
      income : ${income}
    `);
    }
  );
  test.each([[500000, 2021, 500000, 2019]])(
    "unaccept",
    (income, year, income2, year2) => {
      const jtax = new JTax(income, year);
      const jtax2 = new JTax(income2, year2);
      expect(() => jtax.addLastYearResult(jtax2)).toThrowError(
        new Error(`Unacceptable: this year is ${year}, last year is ${year2}`)
      );
    }
  );
});

test.each([[500000, 2020, { type: "tax", amount: 100000 }]])(
  "addExpenses",
  (income, year, expenses) => {
    const jtax = new JTax(income, year);
    jtax.addExpenses(expenses);
    expect(jtax.totalExpenses).toBe(100000);
  }
);

test.each([[500000, 2020, { type: "aoiro", amount: 100000 }]])(
  "addDeduction",
  (income, year, deduction) => {
    const jtax = new JTax(income, year);
    jtax.addDeduction(deduction);
    expect(jtax.totalDeduction).toBe(100000);
  }
);

test.each([[5000000, 2020, 584522]])(
  "totalIncomeTax: %i",
  (income, year, tax) => {
    const jtax = new JTax(income, year);
    expect(jtax.calcIncomeTax()).toBe(tax);
  }
);

test.each([
  [
    500000,
    2020,
    { type: "tax", amount: 100000 },
    { type: "aoiro", amount: 100000 },
    300000,
  ],
])("calcIncome", (sales, lastYear, expenses, deducation, income) => {
  const jtax = new JTax(sales, lastYear);
  jtax.addExpenses(expenses);
  jtax.addDeduction(deducation);
  expect(jtax.calcIncome()).toBe(income);
});

test.each([[500000, 2019, 500000, 2020, 50000]])(
  "residentTax",
  (lastYearSales, lastYear, sales, year, tax) => {
    const lastYearJtax = new JTax(lastYearSales, lastYear);
    const jtax = new JTax(sales, year);
    jtax.addLastYearResult(lastYearJtax);
    expect(jtax.calcResidentTax()).toBe(tax);
  }
);

test.each([[5000000, 2019, 5000000, 2020, 611940]])(
  "calcNationalHealthInsureance",
  (lastYearSales, lastYear, sales, year, tax) => {
    const lastYearJtax = new JTax(lastYearSales, lastYear);
    const jtax = new JTax(sales, year);
    jtax.addLastYearResult(lastYearJtax);
    expect(jtax.calcNationalHealthInsureance()).toBe(tax);
  }
);
