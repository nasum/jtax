import JTax from "..";

describe.each([[500000, 2020]])("toString", (income, year) => {
  test("output", () => {
    const jtax = new JTax(income, year);
    expect(jtax.toString()).toBe(`
      year   : ${year}
      income : ${income}
    `);
  });
});

describe("addLastYearResult", () => {
  describe.each([[500000, 2021, 500000, 2020]])(
    "accept",
    (income, year, income2, year2) => {
      test("output", () => {
        const jtax = new JTax(income, year);
        const jtax2 = new JTax(income2, year2);
        jtax.addLastYearResult(jtax2);
        expect(jtax.toString()).toBe(`
      year   : ${year}
      income : ${income}
    `);
      });
    }
  );
  describe.each([[500000, 2021, 500000, 2019]])(
    "unaccept",
    (income, year, income2, year2) => {
      test("output", () => {
        const jtax = new JTax(income, year);
        const jtax2 = new JTax(income2, year2);
        expect(() => jtax.addLastYearResult(jtax2)).toThrowError(
          new Error(`Unacceptable: this year is ${year}, last year is ${year2}`)
        );
      });
    }
  );
});
