import { useCallback } from 'react'
import { Dispatch } from 'redux'
import { History } from 'history'
import { IVacancyRequestWithId } from 'interfaces'
import { setEditedVacancy } from 'redux/vacancy/actions'

interface IClickParams extends IVacancyRequestWithId {
  history: History
  dispatch: Dispatch<any>
}

export const useClick = ({
  history,
  dispatch,
  id,
  name,
  city,
  price,
  priceComment,
}: IClickParams) => useCallback(() => {
  dispatch(setEditedVacancy({
    id,
    name,
    city,
    price,
    priceComment,
  }))

  history.push(`/vacancy/${id}`)
}, [
  history,
  dispatch,
  id,
  name,
  city,
  price,
  priceComment,
])
