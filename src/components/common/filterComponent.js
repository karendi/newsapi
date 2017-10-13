/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';

class FilterComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <AutoComplete
          onUpdateInput={
              (searchText) => { this.props.filterFunction(searchText); }}
          floatingLabelText="Search for a news source"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.dataSource}
          maxSearchResults={5}
        />
      </MuiThemeProvider>

    );
  }
}

FilterComponent.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.string),
  filterFunction: PropTypes.func,
};

export default FilterComponent;
