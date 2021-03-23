import { useCallback } from 'react'
import { History } from 'history'
import { Dispatch } from 'redux'
import { clearEditedVacancy, putVacancy } from 'redux/vacancy/actions'

interface ICancelParams {
  history: History
  dispatch: Dispatch<any>
}

export const useCancel = ({
  history,
  dispatch,
}: ICancelParams) => useCallback(() => {
  dispatch(clearEditedVacancy())
  history.push('/')
}, [
  history,
  dispatch,
])

interface ISubmitParams {
  handleCancel: () => void
}
export const useSubmit = ({
  handleCancel,
}: ISubmitParams) => useCallback(async (data, vacancyId: string) => {
  await putVacancy(data, vacancyId)
  handleCancel()
}, [
  handleCancel,
])
