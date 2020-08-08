import React, { Component, Fragment } from 'react';
import Homepage from './pages/homepage/home_page';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AuthenticatedRoute from './routes/authenticated_route';
import LoginPage from './pages/login/loginpage'
import RegisterPage from './pages/register/register_page';
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route exact path='/register' component={RegisterPage}/>
            <AuthenticatedRoute  path='/home' component={Homepage}/>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
export default App;