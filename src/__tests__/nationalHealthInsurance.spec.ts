import { NationalHealthInsurance } from "../nationalHealthInsurance";

describe("default", () => {
  test.each([[5000000, 4570000]])("baseAmount(%i)", (income, baseAmount) => {
    const nationalHealthInsurance = new NationalHealthInsurance(income);
    expect(nationalHealthInsurance.baseAmount).toBe(baseAmount);
  });

  test.each([[5000000, 354460]])("medicalPayAmount", (income, payAmount) => {
    const nationalHealthInsurance = new NationalHealthInsurance(income);
    expect(nationalHealthInsurance.medicalPayAmount).toBe(payAmount);
  });

  test.each([[5000000, 140140]])("supportPayAmount", (income, payAmount) => {
    const nationalHealthInsurance = new NationalHealthInsurance(income);
    expect(nationalHealthInsurance.supportPayAmount).toBe(payAmount);
  });

  test.each([[5000000, 117340]])("carePayAmount", (income, payAmount) => {
    const nationalHealthInsurance = new NationalHealthInsurance(income);
    expect(nationalHealthInsurance.carePayAmount).toBe(payAmount);
  });

  test.each([[5000000, 611940]])("calcAmount(%i)", (income, insurance) => {
    const nationalHealthInsurance = new NationalHealthInsurance(income);
    expect(nationalHealthInsurance.calcAmount()).toBe(insurance);
  });
});
