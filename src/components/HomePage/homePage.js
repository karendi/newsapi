/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Header from '../common/header';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1> Home Page</h1>
      </div>
    );
  }
}

export default HomePage;
