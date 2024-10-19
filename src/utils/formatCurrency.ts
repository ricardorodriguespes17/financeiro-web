const formatCurrency = (value: number): string => {
  return Intl.NumberFormat("pt-br", { currency: "BRL", style: "currency"}).format(value)
}

export default formatCurrency