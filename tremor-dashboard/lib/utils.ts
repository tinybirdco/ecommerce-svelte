export const dollarDataFormatter = (number: number) => {
  return Intl.NumberFormat("us", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(number);
};

export const plainDataFormatter = (number: number | undefined) => {
  if (!number) return "0";
  return Intl.NumberFormat("us").format(number);
};
