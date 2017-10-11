/* eslint-disable react/prefer-stateless-function,jsx-a11y/
react/jsx-no-comment-textnodes,react/prop-types */
import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../common/header';

class DisplayCard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.location.state.articles.map((article, index) =>
          <div key={index}>
            <MuiThemeProvider>
              <Card>
                <CardHeader
                  title={<h5>{article.title}</h5>}
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  {article.description}
                  <CardActions>
                    <a href={article.url}>Go to Article</a>
                  </CardActions>
                </CardText>
              </Card>
            </MuiThemeProvider>
          </div>,
          )}
      </div>

    );
  }
}

export default DisplayCard;
