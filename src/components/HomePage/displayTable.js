/* eslint-disable react/prefer-stateless-function */
import React from 'react';
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

// eslint-disable-next-line react/prefer-stateless-function
class DisplayTable extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Table>
          <TableHeader>
            <TableRow>
              {this.props.tableHeaders.map((header, index) =>
                <TableHeaderColumn key={index}>{header}</TableHeaderColumn>,
                            )}
            </TableRow>
          </TableHeader>
          <TableBody>
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
};

export default DisplayTable;
