import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import VacancyList from 'routes/VacancyList'
import VacancyCreate from 'routes/VacancyCreate'
import VacancyEdit from 'routes/VacancyEdit'
import 'assets/styles/meta/reset.css';

function Routers() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <VacancyList />
          </Route>
          <Route exact path="/vacancy">
            <VacancyCreate />
          </Route>
          <Route path="/vacancy/:id">
            <VacancyEdit />
          </Route>
        </Switch>
      </Router>
  )
}

export default Routers
