/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ProgressIndicator extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <CircularProgress size={80} thickness={5} />
      </MuiThemeProvider>
    );
  }

}

export default ProgressIndicator;
