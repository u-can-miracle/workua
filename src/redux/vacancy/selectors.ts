import { IState } from 'redux/rootReducers'

export const editedVacancySelector = (state: IState) => state.vacancy.editedVacancy
