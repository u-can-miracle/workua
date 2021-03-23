export interface IChildren {
  children: JSX.Element[] | JSX.Element
}

export interface IPriceFromTo {
  from: number
  to: number
}

export interface IVacancy {
  id: string
  name: string
  cityName: string
  cityId: string
  address?: string
  price: number | IPriceFromTo
  priceComment?: string
}

export interface IVacancyRequest {
  name: string
  city: string
  address?: string
  price?: IVacancy['price']
  priceComment?: string
}

export interface IVacancyCreate extends Omit<IVacancy, 'price'>  {
  price: number | IPriceFromTo | undefined
}

export interface IVacancyRequestWithId extends Omit<IVacancyRequest, 'price'> {
  id: string
  price: IVacancy['price']
}

export interface ICity {
  id: string
  name: string
}

export interface ISelectParams {
  id: string
  name: string
}
