import SingleVacancy from 'components/vacancy/SingleVacancy'
import ButtonLink from 'components/common/ButtonLink'
import ContentWrapper from 'components/common/ContentWrapper'
import Heading, { Headings } from 'components/common/Heading'
import useFetch from 'hooks/useFetch'
import { IVacancyRequestWithId } from 'interfaces'
import { loadVacanyList } from 'redux/vacancy/actions'

import styles from './styles.module.scss';

const VacancyList = () => {
  const result = useFetch<IVacancyRequestWithId>({ onPreload: loadVacanyList })
  const data = result.data
  const {
    isLoadingCompleted,
    isRequestFailed,
  } = result

  return (
    <ContentWrapper>
      <div className={styles.vacancyListTitle}>
        <Heading
          className={styles.vacancyListHeading}
          headingLevel={Headings.h2}
          text="Вакансии и отклики"
        />

        <ButtonLink
          to="/vacancy"
          btnTitle="Создать вакансию"
          style="success"
        />
      </div>

      <>
        {!isLoadingCompleted && "Загрузка ..."}
        {isRequestFailed && "Ошибка во время запроса"}

        {data && data.map(({
          id,
          name,
          // cityName,
          city,
          price,
          priceComment,
        }) => (
          <SingleVacancy
            key={id}
            id={id}
            name={name}
            city={city}
            price={price}
            priceComment={priceComment}
          />
        ))}
      </>
    </ContentWrapper>
  )
}

export default VacancyList
