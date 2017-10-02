/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/header';
import * as newsPostsActions from '../../actions/newsPostsActions';

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

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  getPosts: PropTypes.func,
};

function mapStateToProps(state) {
  return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (source, sortBy) => {
      dispatch(newsPostsActions.getAllNewsPosts(source, sortBy));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
