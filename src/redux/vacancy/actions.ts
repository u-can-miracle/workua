import request from 'utils/request'
import { IVacancyRequest, IVacancyRequestWithId, IVacancyCreate } from 'interfaces'

export const postVacancy = (vacancy: IVacancyRequest) => {
  return request({
    url: '/vacancy',
    method: 'POST',
    payload: {
      vacancy,
    },
  })
}

export const putVacancy = (vacancy: IVacancyRequest, id: string) => {
  return request({
    url: `/vacancy/${id}`,
    method: 'PUT',
    payload: {
      vacancy,
    },
  })
}

export const loadVacanyList = () => {
  return request({
    url: '/vacancies',
    method: 'GET'
  })
}

export const SET_EDITED_VACANCY = 'SET_EDITED_VACANCY'
interface ISetEditedVacancyAction {
  type: typeof SET_EDITED_VACANCY
  payload: IVacancyCreate
}
export const setEditedVacancy = (data: IVacancyRequestWithId):ISetEditedVacancyAction => ({
  type: SET_EDITED_VACANCY,
  payload: {
    id: data.id,
    name: data.name,
    cityName: '',
    cityId: data.city,
    address: data.address,
    price: data.price,
    priceComment: data.priceComment,
  }
})

export const CLEAR_EDITED_VACANCY = 'CLEAR_EDITED_VACANCY'
interface IClearEditedVacancy {
  type: typeof CLEAR_EDITED_VACANCY
}
export const clearEditedVacancy = () => ({
  type: CLEAR_EDITED_VACANCY
})

export type IActions = ISetEditedVacancyAction
  | IClearEditedVacancy
