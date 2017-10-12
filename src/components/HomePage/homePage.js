/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './displayTable';
import Header from '../common/header';
import ProgressIndicator from '../common/showProgress';
import ErrorSnackbar from '../common/snackBar';
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
      showErrorSnackbar: false,
    };

    this.fetchNewsSources = this.fetchNewsSources.bind(this);
    this.displayErrorSnackbar = this.displayErrorSnackbar.bind(this);
  }
  componentDidMount() {
    if (this.props.sources.data.length === 0) {
      this.fetchNewsSources();
      this.props.getSources();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fetching: false });
    const retrievedSources = nextProps.sources.data.sources;
    this.setState({ newsSources: retrievedSources });
    if (nextProps.posts.postsError.length !== 0) {
      this.displayErrorSnackbar();
    }
  }

  fetchNewsSources() {
    this.setState({ fetching: true });
  }

  displayErrorSnackbar() {
    if (this.props.posts.postsError.length === 0) {
      this.setState({ showErrorSnackbar: true });
    }
  }

  render() {
    const showFetchingProgress = this.state.fetching;
    const showSnackbar = this.state.showErrorSnackbar;
    let progressBar;
    let snackBar;
    if (showFetchingProgress) {
      progressBar = <ProgressIndicator />;
    } else {
      progressBar = null;
    }
    if (showSnackbar) {
      snackBar = <ErrorSnackbar message="We could not retrieve the articles" />;
    } else {
      snackBar = null;
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
          posts={this.props.posts.postsData}
        />
        { snackBar }
      </div>
    );
  }
}

HomePage.propTypes = {
  sources: PropTypes.objectOf(PropTypes.any),
  getSources: PropTypes.func,
  getNewsPostsWithFilters: PropTypes.func,
  getNewsPostsWithoutFilters: PropTypes.func,
  posts: PropTypes.objectOf(PropTypes.array),
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
