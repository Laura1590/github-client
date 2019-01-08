import React, { ComponentClass } from 'react';
import { IssueListItem } from '../Types';
import { WithStyles, withStyles, TableRow, Typography, Theme, TableCell } from '@material-ui/core';
import { selectIssue } from '../../store/actions/openIssues';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouterProps } from 'react-router';

const styles = (theme: Theme) => ({
  root: {
  },
  text: {
    flex: 1,
  },
})

type IOwnProps = {
  issue: IssueListItem;
}

type IProps = {
  selectedIssue: string;
  selectIssue: (issue: string) => void;
}

function OpenIssuesItem(props: IOwnProps & IProps & WithStyles & RouterProps) {
  const { classes, selectedIssue, selectIssue, issue } = props;
  const select = () => selectedIssue != issue.id && selectIssue(issue.id);
  const timeAgo = Math.floor((Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 3600 * 24));
  return (
    <TableRow
      className={classes.root}
      hover
      selected={selectedIssue == issue.id}
      onClick={select}
    >
      <TableCell>
        <Typography className={classes.text}>{issue.title}</Typography>
        <Typography className={classes.text} color='textSecondary'>#{issue.number} opened {timeAgo} days ago by {issue.author.login}</Typography>
      </TableCell>
    </TableRow>
  )
}

const mapStateToProps = state => ({
  selectedIssue: state.openIssues.selectedIssue,
})

const mapDispatchToProps = {
  selectIssue,
}

export default compose<ComponentClass<IOwnProps>>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(OpenIssuesItem)
