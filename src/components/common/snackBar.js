import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class ErrorSnackbar extends React.Component {

  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Snackbar
            open={this.state.open}
            message={this.props.message}
            autoHideDuration={4000}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

ErrorSnackbar.propTypes = {
  message: PropTypes.string,
};

export default ErrorSnackbar;
