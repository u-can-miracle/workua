interface IPriceParams {
  price: number
  delimiter?: string
  ending?: string
}
export const formatPrice = (params: IPriceParams) => {
  const {
    price,
    delimiter = ' ',
    ending = 'грн',
  } = params
  const step = 3
  const priceStr = String(price)
  const part = priceStr.length % step

  let formattedPrice: string = priceStr.slice(0, part)
  let currentPos = part

  while (priceStr.length > currentPos) {
    const pricePart = priceStr.slice(currentPos, currentPos + step)

    formattedPrice = formattedPrice + delimiter + pricePart
    currentPos += step
  }

  return `${formattedPrice} ${ending}`
}
