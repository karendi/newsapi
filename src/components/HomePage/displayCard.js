/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DisplayCard extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchingNewsPosts: false,
      sortByOption: [],
      newsSource: '',
      newsPosts: [],
    };
  }

  render() {
// eslint-disable-next-line react/prop-types
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader />
            <CardText expandable />
          </Card>
        </MuiThemeProvider>
      </div>

    );
  }
}

export default DisplayCard;
