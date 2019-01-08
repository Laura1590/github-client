import React, { ComponentType } from 'react';
import { NavigationProps } from '../Types';
import { WithStyles, Theme, Paper, Toolbar, Typography, Tooltip, Table, TableBody, TableRow, TableCell, IconButton, Select, withStyles, MenuItem } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import { Info, ArrowLeft, ChevronLeft, ChevronRight, ArrowRight } from '@material-ui/icons';
import RepositoryListRow from './RepositoryListRow';
import { goLeft, goRight, goToStart, goToEnd } from '../../store/actions/repositories';
import { compose } from 'redux';
import { connect } from 'react-redux';

const styles = (theme: Theme) => ({
  root: {
  },
  tableWrapper: {
    overflowX: 'auto' as 'auto',
  },
  toolbar: {
    paddingRight: theme.spacing.unit * 3,
    display: 'flex',
  },
  headerText: {
    flex: 1,
  },
})

type MatchParams = {
  selectedUser: string;
}
type IOwnProps = {
  data: any;
  rowsPerPage: number;
  changeRowsPerPage: (rowsPerPage) => void;
}

const RepositoryList = (props: IOwnProps & NavigationProps & WithStyles & RouteComponentProps<MatchParams>) => {
  const { data, rowsPerPage, changeRowsPerPage } = props;
  const { classes, match: { params: { selectedUser } } } = props;
  const { goLeft, goRight, goToStart, goToEnd } = props;
  const repositories = data.user.repositories.edges.map(edge => edge.node);
  const { startCursor, endCursor, hasPreviousPage, hasNextPage } = data.user.repositories.pageInfo;
  const emptyRows = rowsPerPage - (repositories.length || 1);

  return (
    <div className={classes.root}>
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" id="tableTitle" className={classes.headerText}> Repositories </Typography>
          <Tooltip title={`Viewing repositories for ${selectedUser}`} placement="left">
            <Info color="disabled" />
          </Tooltip>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableBody>
              {repositories.map(repository =>
                <RepositoryListRow repository={repository} key={repository.id} />
              )}
              {!repositories.length &&
                <TableRow>
                  <TableCell colSpan={6} >
                    <Typography variant="body2"> No entries </Typography>
                  </TableCell>
                </TableRow>
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <IconButton className={classes.button} aria-label="Start" disabled={!hasPreviousPage} onClick={goToStart}>
            <ArrowLeft />
          </IconButton>
          <IconButton className={classes.button} aria-label="Left" disabled={!hasPreviousPage} onClick={() => goLeft(startCursor, endCursor)}>
            <ChevronLeft />
          </IconButton>
          <Select value={rowsPerPage} onChange={ev => changeRowsPerPage(parseInt(ev.target.value))}>
            {[5, 10, 20, 30].map(option =>
              <MenuItem key={option} value={option}>{option}</MenuItem>
            )}
          </Select>
          <IconButton className={classes.button} aria-label="Right" disabled={!hasNextPage} onClick={() => goRight(startCursor, endCursor)}>
            <ChevronRight />
          </IconButton>
          <IconButton className={classes.button} aria-label="End" disabled={!hasNextPage} onClick={goToEnd}>
            <ArrowRight />
          </IconButton>
        </div>
      </Paper>
    </div>
  )
}

const mapDispatchToProps = {
  goLeft,
  goRight,
  goToStart,
  goToEnd,
}

export default compose<ComponentType<IOwnProps>>(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(RepositoryList);