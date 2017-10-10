import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import DisplayCard from './components/HomePage/displayCard';
import LoginPage from './components/LoginPage/loginPage';
import HomePage from './components/HomePage/homePage';

const history = createHistory();
const store = configureStore();

function requireAuth() {
  if (!localStorage.getItem('access_token')) {
    history.push('/');
  }
}

ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/homepage" component={HomePage} onEnter={requireAuth()} />
              <Route
                path="/news-source/:id"
                component={DisplayCard} onEnter={requireAuth()}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    ),
    document.getElementById('root'),
);
