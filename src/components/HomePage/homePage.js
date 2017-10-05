/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayCard from './displayCard';
import Header from '../common/header';
import ProgressIndicator from './showProgress';
import * as sources from '../../actions/sourcesActions';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      newsSources: [],
      fetching: false,
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
        {this.state.newsSources.map((name, index) =>
          <DisplayCard key={index} sourcesList={name} />,
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  getSources: PropTypes.func,
};


function mapStateToProps(state) {
  return { sources: state.sources };
}

function mapDispatchToProps(dispatch) {
  return {
    getSources: () => {
      dispatch(sources.getAllSources());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
