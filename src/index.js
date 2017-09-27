import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from './components/LoginPage/loginPage';
import HomePage from './components/HomePage/homePage';

const history = createHistory();

function requireAuth() {
  if (!localStorage.getItem('access_token')) {
    history.push('/');
  }
}

ReactDOM.render(
    (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/homepage" component={HomePage} onEnter={requireAuth()} />
          </Switch>
        </div>
      </Router>
    ),
    document.getElementById('root'),
);
