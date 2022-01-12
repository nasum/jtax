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
