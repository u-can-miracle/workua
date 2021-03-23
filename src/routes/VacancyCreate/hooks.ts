import { useCallback } from 'react'
import { History } from 'history'
import { IVacancyRequest } from 'interfaces'

interface ISubmitParams {
  postVacancy: (vacancy: IVacancyRequest) => Promise<void>
  history: History
}

export const useSubmit = ({
  postVacancy,
  history,
}: ISubmitParams) => useCallback((vacancy: IVacancyRequest) => {
  postVacancy(vacancy)
    .then(() => history.push('/'))
}, [
  postVacancy,
  history,
])
