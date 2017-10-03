/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

class DisplayCard extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={this.props.sourcesList.name}
              actAsExpander
              showExpandableButton
            />
            <CardActions>
              <FlatButton label="Action 1" />
              <FlatButton label="Action 2" />
            </CardActions>
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
  sourcesList: PropTypes.arrayOf(PropTypes.string),
};


export default DisplayCard;
