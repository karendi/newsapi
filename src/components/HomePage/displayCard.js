/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import * as posts from '../../actions/newsPostsActions';

class DisplayCard extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchingNewsPosts: false,
    };

    this.getSourceNewsPosts = this.getSourceNewsPosts.bind(this);
  }

  getSourceNewsPosts(source, sortBy) {
    this.setState({ fetchingNewsPosts: true });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
              title={<h4
                tabIndex={-42}
                onClick={() => this.getSourceNewsPosts()}
              >{this.props.sourcesList.name}</h4>}
              actAsExpander
              showExpandableButton
            />
            {this.props.sourcesList.sortBysAvailable.map((name, index) =>
              <CardActions key={index}>
                <i className="material-icons">swap_vert</i>
                <h6>{name}</h6>
              </CardActions>,
            )}
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
  getNewsPosts: PropTypes.func,
};

function mapToStateToProps(state) {
  return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    getNewsPosts: () => {
      dispatch(posts.getAllNewsPosts());
    },
  };
}

export default connect(mapToStateToProps, mapDispatchToProps)(DisplayCard);
