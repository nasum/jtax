import { ResidentTax } from "../residentTax";

describe("default", () => {
  test.each([
    [1950000, 195000],
    [3300000, 330000],
    [6950000, 695000],
    [9000000, 900000],
    [18000000, 1800000],
    [40000000, 4000000],
  ])("culcResidentTax(%i)", (income, tax) => {
    const residentTax = new ResidentTax(income);
    expect(residentTax.calcResidentTax()).toBe(tax);
  });
});
