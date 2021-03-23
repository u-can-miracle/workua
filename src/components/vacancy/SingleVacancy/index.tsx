import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import isNumber from 'lodash/isNumber'
import { IVacancyRequestWithId, IPriceFromTo } from 'interfaces'
import { isPriceFromTo } from 'utils/types'
import { formatPrice } from 'utils/formatters'

import { useClick } from './hooks'
import styles from './styles.module.scss';

function SingleVacancy(props: IVacancyRequestWithId) {
  const {
    id,
    name,
    // cityName,
    city,
    price,
    priceComment,
  } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClick = useClick({
    history,
    dispatch,
    id,
    name,
    city,
    price,
    priceComment,
  })

  const isFromTo = isPriceFromTo(price)
  const priceFrom = isFromTo && formatPrice({
    price: (price as IPriceFromTo).from,
    ending: ''
  })
  const priceTo = isFromTo && formatPrice({
    price: (price as IPriceFromTo).to
  })

  return (
    <div className={styles.singleVacancy}>
      <div
        className={styles.title}
        onClick={handleClick}
      >
        {name}
      </div>
      <div className={styles.price}>
        {isNumber(price) && formatPrice({ price })}
        {isFromTo && (
          <>
            <span>{priceFrom}</span> - <span>{priceTo}</span>
          </>
        )}
        <span className={styles.priceComment}>{priceComment}</span>
      </div>
      {
        /*
          TODO: implement loading all cities in single request
          / No API GET /city/id
        */
      }
      <div className={styles.cityName}>{"cityName"}</div>
    </div>
  )
}

export default SingleVacancy
