import { BigNumber } from "bignumber.js";

type TaxCalcInfo = {
  rate: number;
  payAmountInsured: number;
  payAmountHousehold: number;
};

type NationalHealthInsuranceDetail = {
  deduction: number;
  medical: TaxCalcInfo;
  support: TaxCalcInfo;
  care: TaxCalcInfo;
};

const defaultNationalHealthInsuranceDetail: NationalHealthInsuranceDetail = {
  deduction: 430000,
  medical: {
    rate: 0.0684,
    payAmountInsured: 18840,
    payAmountHousehold: 23040,
  },
  support: {
    rate: 0.0272,
    payAmountInsured: 7080,
    payAmountHousehold: 8760,
  },
  care: {
    rate: 0.022,
    payAmountInsured: 9600,
    payAmountHousehold: 7200,
  },
};

export class NationalHealthInsurance {
  private income: number;
  private nationalHealthInsuranceDetail: NationalHealthInsuranceDetail;

  constructor(
    income: number,
    nationalHealthInsuranceDetail?: NationalHealthInsuranceDetail
  ) {
    this.income = income;
    this.nationalHealthInsuranceDetail =
      nationalHealthInsuranceDetail || defaultNationalHealthInsuranceDetail;
  }

  calcAmount(): number {
    return this.medicalPayAmount + this.supportPayAmount + this.carePayAmount;
  }

  get baseAmount(): number {
    return (
      Math.floor(
        (this.income - this.nationalHealthInsuranceDetail.deduction) / 100
      ) * 100
    );
  }

  get medicalPayAmount(): number {
    const totalAmount = new BigNumber(this.baseAmount)
      .times(new BigNumber(this.nationalHealthInsuranceDetail.medical.rate))
      .plus(
        new BigNumber(
          this.nationalHealthInsuranceDetail.medical.payAmountInsured
        )
      )
      .plus(
        new BigNumber(
          this.nationalHealthInsuranceDetail.medical.payAmountHousehold
        )
      )
      .toNumber();
    return Math.floor(totalAmount / 10) * 10;
  }

  get supportPayAmount(): number {
    const totalAmount = new BigNumber(this.baseAmount)
      .times(new BigNumber(this.nationalHealthInsuranceDetail.support.rate))
      .plus(
        new BigNumber(
          this.nationalHealthInsuranceDetail.support.payAmountInsured
        )
      )
      .plus(
        new BigNumber(
          this.nationalHealthInsuranceDetail.support.payAmountHousehold
        )
      )
      .toNumber();
    return Math.floor(totalAmount / 10) * 10;
  }

  get carePayAmount(): number {
    const totalAmount = new BigNumber(this.baseAmount)
      .times(new BigNumber(this.nationalHealthInsuranceDetail.care.rate))
      .plus(
        new BigNumber(this.nationalHealthInsuranceDetail.care.payAmountInsured)
      )
      .plus(
        new BigNumber(
          this.nationalHealthInsuranceDetail.care.payAmountHousehold
        )
      )
      .toNumber();
    return Math.floor(totalAmount / 10) * 10;
  }
}
