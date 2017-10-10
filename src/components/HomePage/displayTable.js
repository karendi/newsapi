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

  componentWillReceiveProps(nextProps) {
// eslint-disable-next-line react/prop-types
    const data = nextProps.posts.articles;
// eslint-disable-next-line react/prop-types
    const source = nextProps.posts.source;
    if (data !== undefined) {
      history.push(`/news-source/${source}`);
    }
  }

  selectNewsSource(row) {
    this.setState({ fetchingPosts: true });
    const newsSource = this.props.tableRows[row].id;
    this.props.postsWithoutFilters(newsSource);
  }
  render() {
    return (
      <MuiThemeProvider>
        <Table
          selectable
          selected
          onCellClick={row => (this.selectNewsSource(row))}
        >
          <TableHeader>
            <TableRow>
              {this.props.tableHeaders.map((header, index) =>
                <TableHeaderColumn key={index}>{header}</TableHeaderColumn>,
                            )}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox>
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
