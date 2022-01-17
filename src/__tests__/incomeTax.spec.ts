import { IncomeTax } from "../incomeTax";

describe("default", () => {
  describe.each([
    [1950000, 99547],
    [3300000, 237382],
    [6950000, 982712],
    [9000000, 1464114],
    [18000000, 4496484],
    [40000000, 13481284],
  ])("culcIncomeTax(%i)", (income, tax) => {
    const incomeTax = new IncomeTax(income);
    expect(incomeTax.culcIncomeTax()).toBe(tax);
  });
});
