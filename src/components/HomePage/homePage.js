/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DisplayCard from './displayCard';
import Header from '../common/header';
import * as sources from '../../actions/sourcesActions';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      newsSources: [],
    };
  }
  componentDidMount() {
    if (this.props.sources.length === 0) {
      this.props.getSources();
    }
  }

  componentWillReceiveProps(nextProps) {
    const retrievedSources = nextProps.sources.sources;
    this.setState({ newsSources: retrievedSources });
  }
  render() {
    return (
      <div>
        <Header />
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
