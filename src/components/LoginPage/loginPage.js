import React from 'react';
import GoogleLogin from 'react-google-login';
import { createBrowserHistory } from 'history';
import Header from '../common/header';

const history = createBrowserHistory({ forceRefresh: true });

function responseGoogle() {
  history.push('/');
}

// eslint-disable-next-line react/prefer-stateless-function
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(response) {
    if (!localStorage.getItem('access_token')) {
      localStorage.setItem('access_token', response.accessToken);
    }
    history.push('/homepage');
    this.setState({ loginSuccess: true });
  }
  render() {
    return (
      <div>
        <Header />
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default LoginPage;
