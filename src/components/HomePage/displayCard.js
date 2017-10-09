/* eslint-disable react/prefer-stateless-function,jsx-a11y/no-static-element-interactions */
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
      sortByOption: [],
      newsSource: '',
      newsPosts: [],
    };

    this.getSourceNewsPosts = this.getSourceNewsPosts.bind(this);
    this.getSortByFilter = this.getSortByFilter.bind(this);
  }


  getSourceNewsPosts(source) {
    this.setState({ newsSource: source }, () => {
      this.getPosts();
    });
    this.setState({ fetchingNewsPosts: true });
  }


  getSortByFilter(filter) {
    this.setState({ sortByOption: filter }, () => {
      this.getPosts();
    });
    return this.state.sortByOption;
  }

  render() {
    return (

      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title={<h4
                tabIndex={-42}
              >{this.props.sourcesList.name}</h4>}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              {this.props.sourcesList.description}
              {this.props.sourcesList.sortBysAvailable.map((name, index) =>
                <CardActions key={index}>
                  <i className="material-icons">swap_vert</i>
                  <h6
                    tabIndex={-42}
                    onClick={() =>
                          this.getSortByFilter(name)}
                  >{name}</h6>
                </CardActions>,
                )}
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>

    );
  }
}

DisplayCard.propTypes = {
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  getNewsPostsWithFilters: PropTypes.func,
  getNewsPostsWithoutFilters: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.string),
};

function mapToStateToProps(state) {
  return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    getNewsPostsWithFilters: (source, sortBy) => {
      dispatch(posts.getAllNewsPostsWithFilter(source, sortBy));
    },
    getNewsPostsWithoutFilters: (source) => {
      dispatch(posts.getAllNewsPostsWithoutFilter(source));
    },
  };
}

export default connect(mapToStateToProps, mapDispatchToProps)(DisplayCard);
