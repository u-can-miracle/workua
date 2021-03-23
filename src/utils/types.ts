import { IPriceFromTo } from 'interfaces'

export const isPriceFromTo = (price?: number | IPriceFromTo) => {
  return !!price && typeof price === 'object' && 'from' in price && 'to' in price
}
