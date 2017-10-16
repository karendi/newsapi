/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayTable from './displayTable';
import Header from '../common/header';
import ProgressIndicator from '../common/showProgress';
import ErrorSnackbar from '../common/snackBar';
import FilterComponent from '../common/filterComponent';
import * as sources from '../../actions/sourcesActions';
import * as posts from '../../actions/newsPostsActions';

const history = createBrowserHistory({ forceRefresh: true });

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      newsSources: [],
      newsSourcesNames: [],
      fetching: false,
      filteredResults: [],
      tableHeaders: [
        'Source', 'Description',
      ],
      showErrorSnackbar: false,
    };

    this.fetchNewsSources = this.fetchNewsSources.bind(this);
    this.displayErrorSnackbar = this.displayErrorSnackbar.bind(this);
    this.getNewsSourcesNames = this.getNewsSourcesNames.bind(this);
    this.filterResults = this.filterResults.bind(this);
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
    this.getNewsSourcesNames(nextProps);
  }

  getNewsSourcesNames(nextProps) {
    this.setState({ newsSourcesNames: nextProps.sources.data.sources.map(source => source.name) });
  }

  fetchNewsSources() {
    this.setState({ fetching: true });
  }

  displayErrorSnackbar() {
    this.setState({ showErrorSnackbar: true });
  }

  filterResults(searchText) {
// eslint-disable-next-line array-callback-return
    this.state.newsSources.filter((data) => {
      if (data.name.includes(searchText)) {
        const sourceArticles = this.props.getNewsPostsWithoutFilters(data.id);
        history.push({ pathname: `/news-source/${data.id}`,
          state: { articles: sourceArticles.articles } });
      }
    });
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
    if (showSnackbar && this.props.posts.postsError.length !== 0) {
      snackBar = <ErrorSnackbar message="We could not retrieve the posts" />;
    } else {
      snackBar = null;
    }
    return (
      <div>
        <Header />
        <FilterComponent
          dataSource={this.state.newsSourcesNames}
          filterFunction={searchText => this.filterResults(searchText)}
        />
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
