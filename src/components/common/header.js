/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Header extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="News Api App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Header;
