/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './displayTable';
import Header from '../common/header';
import ProgressIndicator from '../common/showProgress';
import * as sources from '../../actions/sourcesActions';
import * as posts from '../../actions/newsPostsActions';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      newsSources: [],
      fetching: false,
      tableHeaders: [
        'Source', 'Description',
      ],
    };

    this.fetchNewsSources = this.fetchNewsSources.bind(this);
  }
  componentDidMount() {
    if (this.props.sources.length === 0) {
      this.fetchNewsSources();
      this.props.getSources();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fetching: false });
    const retrievedSources = nextProps.sources.sources;
    this.setState({ newsSources: retrievedSources });
  }

  fetchNewsSources() {
    this.setState({ fetching: true });
  }

  render() {
    const showFetchingProgress = this.state.fetching;
    let progressBar;
    if (showFetchingProgress) {
      progressBar = <ProgressIndicator />;
    } else {
      progressBar = null;
    }
    return (
      <div>
        <Header />
        { progressBar }
        <DisplayTable
          postsWithFilters={source => (this.props.getNewsPostsWithFilters(source))}
          postsWithoutFilters={source => (this.props.getNewsPostsWithoutFilters(source))}
          tableRows={this.state.newsSources}
          tableHeaders={this.state.tableHeaders}
          posts={this.props.posts}
        />,
      </div>
    );
  }
}

HomePage.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  getSources: PropTypes.func,
  getNewsPostsWithFilters: PropTypes.func,
  getNewsPostsWithoutFilters: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.string),
};


function mapStateToProps(state) {
  return { sources: state.sources,
    posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    getSources: () => {
      dispatch(sources.getAllSources());
    },
    getNewsPostsWithFilters: (source, sortBy) => {
      dispatch(posts.getAllNewsPostsWithFilter(source, sortBy));
    },
    getNewsPostsWithoutFilters: (source) => {
      dispatch(posts.getAllNewsPostsWithoutFilter(source));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
