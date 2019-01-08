import React, { ComponentType } from 'react';
import { Theme, WithStyles, IconButton, Typography, withStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { compose } from 'redux';
import { withRouter, RouterProps } from 'react-router';
import { Repository } from '../Types';

const styles = (theme: Theme) => {
  return ({
    root: {
      paddingTop: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
    },
    repoInfo: {
      flex: 1,
      textAlign: 'right' as 'right',
    },
  });
}

type IOwnProps = {
  repository: Repository;
}

const OpenIssuesHeader = (props: IOwnProps & WithStyles & RouterProps) => {
  const { repository, classes, history } = props;
  if (!repository) return <noscript />
  return (
    <div className={classes.root}>
      <IconButton onClick={history.goBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h5" id="tableTitle"> {repository.name} </Typography>
      <Typography className={classes.repoInfo}>
        {repository.stargazers.totalCount} Stars
        &#8226;&nbsp;
        {repository.watchers.totalCount} Watching
      </Typography>
    </div>
  )
}

export default compose<ComponentType<IOwnProps>>(
  withStyles(styles),
  withRouter,
)(OpenIssuesHeader);