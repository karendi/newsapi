/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

class DisplayCard extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={<a href="">{this.props.sourcesList.name}</a>}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              {this.props.sourcesList.description}
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>

    );
  }
}

DisplayCard.propTypes = {
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default DisplayCard;
