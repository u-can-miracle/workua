import { combineReducers } from 'redux'

import vacancy, { IState as IVacancyState }  from 'redux/vacancy/reducer'

export interface IState {
  vacancy: IVacancyState
}

export default combineReducers({ vacancy });
