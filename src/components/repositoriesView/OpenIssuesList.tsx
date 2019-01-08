import React, { ComponentType } from 'react';
import { Theme, WithStyles, IconButton, Typography, Paper, Toolbar, Button, Table, TableBody, TableRow, TableCell, Select, withStyles, Tooltip, MenuItem } from '@material-ui/core';
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Info } from '@material-ui/icons';
import OpenIssuesItem from './OpenIssuesItem';
import { goToStart, goLeft, goRight, goToEnd } from '../../store/actions/openIssues';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavigationProps } from '../Types';

const styles = (theme: Theme) => {
  return ({
    root: {},
    tableWrapper: {
      overflowX: 'auto' as 'auto',
    },
    toolbar: {
      paddingRight: theme.spacing.unit,
      display: 'flex',
      flexFlow: 'row',
    },
    icon: {
      paddingLeft: theme.spacing.unit,
    },
    grow: {
      flex: 1,
    },
    textButton: {
      textTransform: 'none' as 'none',
      color: theme.palette.common.white,
    },
  });
}

type IOwnProps = {
  data: any;
  openDialog: () => void;
  rowsPerPage: number;
  changeRowsPerPage: (rowsPerPage) => void;
}

const OpenIssuesList = (props: IOwnProps & NavigationProps & WithStyles) => {
  const { data, classes, rowsPerPage, changeRowsPerPage, openDialog } = props;
  const { goLeft, goRight, goToStart, goToEnd } = props;
  const openIssues = data.node.issues.edges.map(edge => edge.node);
  const { startCursor, endCursor, hasPreviousPage, hasNextPage } = data.node.issues.pageInfo;
  const emptyRows = rowsPerPage - (openIssues.length || 1);

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" id="tableTitle"> Open Issues </Typography>
        <Tooltip className={classes.icon} title={`There are ${data.node.issues.totalCount} open issues on this repository`} placement="bottom">
          <Info color="disabled" />
        </Tooltip>
        <div className={classes.grow} />
        <Button variant="contained" color="primary" className={classes.textButton} onClick={openDialog}>
          Create issue
        </Button>
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableBody>
            {openIssues.map(issue =>
              <OpenIssuesItem issue={issue} key={issue.id} />
            )}
            {!openIssues.length &&
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
)(OpenIssuesList);