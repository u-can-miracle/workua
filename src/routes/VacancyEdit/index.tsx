import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import ContentWrapper from 'components/common/ContentWrapper'
import VacancyForm from 'components/vacancy/VacancyForm'
import { editedVacancySelector } from 'redux/vacancy/selectors'
import { useCancel, useSubmit } from './hooks'

const VacancyEdit = () => {
  const history = useHistory()
  const editedVacancy = useSelector(editedVacancySelector)
  const dispatch = useDispatch()
  const handleCancel = useCancel({
    history,
    dispatch,
  })
  const handleSubmit = useSubmit({
    handleCancel,
  })

  return (
    <ContentWrapper>
      <VacancyForm
        headerTitle="Обновить вакансию"
        initialVacancy={editedVacancy}
        onSubmit={data => handleSubmit(data, editedVacancy.id)}
        onCancel={handleCancel}
      />
    </ContentWrapper>
  )
}

export default VacancyEdit
