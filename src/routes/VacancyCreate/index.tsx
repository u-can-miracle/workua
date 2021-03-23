import { useHistory } from "react-router-dom";
import ContentWrapper from 'components/common/ContentWrapper'
import VacancyForm from 'components/vacancy/VacancyForm'
import { postVacancy } from 'redux/vacancy/actions'
import { IVacancy } from 'interfaces'

import { useSubmit } from './hooks'

const initialVacancy: Omit<IVacancy, 'id'> = {
  name: '',
  cityName: '',
  cityId: '',
  address: '',
  price: {
    from: 0,
    to: 0,
  },
  priceComment: '',
}

const VacancyCreate = () => {
  const history = useHistory()
  const handleSubmit = useSubmit({
    postVacancy,
    history,
  })

  return (
    <ContentWrapper>
      <VacancyForm
        headerTitle="Создать вакансию"
        initialVacancy={initialVacancy}
        onSubmit={handleSubmit}
        onCancel={() => history.push('/')}
      />
    </ContentWrapper>
  )
}

export default VacancyCreate
