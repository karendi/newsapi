/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const history = createBrowserHistory({ forceRefresh: true });

class DisplayTable extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchingPosts: false };

    this.selectNewsSource = this.selectNewsSource.bind(this);
  }

  selectNewsSource(row) {
    this.setState({ fetchingPosts: true });
    const newsSource = this.props.tableRows[row].id;
    this.props.postsWithoutFilters(newsSource);
  }
  render() {
    const newsSource = this.props.posts.source;
    if (this.props.posts.articles !== undefined) {
      history.push({ pathname: `/news-source/${newsSource}`,
        state: { articles: this.props.posts.articles } });
    }
    return (
      <MuiThemeProvider>
        <Table
          selectable
          selected
          onCellClick={row => (this.selectNewsSource(row))}
        >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              {this.props.tableHeaders.map((header, index) =>
                <TableHeaderColumn key={index}>{header}</TableHeaderColumn>,
              )}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.tableRows.map((source, index) =>
              <TableRow key={index}>
                <TableRowColumn>{source.name}</TableRowColumn>
                <TableRowColumn>{source.description}</TableRowColumn>
              </TableRow>,
              )
              }
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

DisplayTable.propTypes = {
  tableHeaders: PropTypes.arrayOf(PropTypes.string),
  tableRows: PropTypes.arrayOf(PropTypes.string),
  postsWithoutFilters: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayTable;
