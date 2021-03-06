export const editCurrencyExchangeValues = {
  idBankSend: "",
  idBankReceive: "",
  accountNumber: "",
  accountType: "",
  transferNumber: "",
  isPreferential: false,
  amountSell: "",
  amountReceive: "",
  preferentialRate: "",
};

export const currencyPriceValues = (toBuy, toSell) => ({
  toBuy1: +toBuy[0] || 0,
  toBuy2: +toBuy[2] || 0,
  toBuy3: +toBuy[3] || 0,
  toBuy4: +toBuy[4] || 0,
  toSell1: +toSell[0] || 0,
  toSell2: +toSell[2] || 0,
  toSell3: +toSell[3] || 0,
  toSell4: +toSell[4] || 0,
});

export const bankValues = {
  name: "",
  active: false,
  countryId: "",
  currencies: [],
};

export const limitsValues = (values) => ({
  idCurrency: values.idCurrency || "",
  transactionLimit: +values.transactionLimit || "",
  transactionMinimum: +values.minimumTransaction || "",
  limitPerDay: +values.limitPerDay || "",
});

export const CbAccountValues = {
  account_number: "",
  cci: "",
  bankId: "",
  currencyId: "",
  acc_type: "checking",
};

export const statusValues = (values) => ({
  name: values ? values.name : "",
  color: values ? values.color : "",
});

export const scheduleValues = (values) => {
  return {
    startTime: values.startTime || "",
    endTime: values.endTime || "",
    isWorkingDay: values.isWorkday,
  };
};
