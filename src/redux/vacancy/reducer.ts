import { IVacancyCreate, IVacancy } from 'interfaces'
import { SET_EDITED_VACANCY, CLEAR_EDITED_VACANCY, IActions } from './actions'

export interface IState {
  editedVacancy: IVacancy
}

const editedVacancy = {
  id: '',
  name: '',
  cityName: '',
  cityId: '',
  address: '',
  price: 0,
  priceComment: '',
}

const initState: IState = {
  editedVacancy,
}

export default function vacancyReducer(state = initState, action: IActions) {
  switch (action.type) {
    case SET_EDITED_VACANCY: {
      return {
        ...state,
        editedVacancy: {
          ...action.payload,
        }
      }
    }

    case CLEAR_EDITED_VACANCY: {
      return {
        ...state,
        editedVacancy,
      }
    }

    default:
      return state
  }
}
