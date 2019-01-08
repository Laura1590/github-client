import React, { ComponentType } from 'react';
import { Card, CardContent, Typography, withStyles, Theme, WithStyles, CardMedia, Divider } from '@material-ui/core';
import { User } from '../Types';
import classnames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { selectUser } from '../../store/actions/users';
import { connect } from 'react-redux';

const styles = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit,
    width: 200,
    height: 128,
  },
  card: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    textAlign: 'center' as 'center',
    height: '100%',
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    position: 'relative' as 'relative',
  },
  media: {
    backgroundSize: 'cover',
    position: 'absolute' as 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    opacity: 0,
    '&:hover': {
      opacity: 1,
    }
  },
  content: {
    '&:hover': {
      opacity: 0,
    },
  },
  name: {
    fontSize: 'larger',
  },
  repos: {
    opacity: 0.8,
  },
  divider: {
    backgroundColor: theme.palette.primary.light,
    height: 2,
    marginTop: theme.spacing.unit - 2,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    opacity: 0,
  },
  selected: {
    opacity: 1,
  },
})

type IOwnProps = {
  user: User;
}
type IProps = {
  selectUser: any;
}

type MatchParams = {
  selectedUser: string;
}

function UserCard(props: WithStyles & IOwnProps & IProps & RouteComponentProps<MatchParams>) {
  const { user, selectUser, classes, match } = props;
  const selectedUser = match && match.params.selectedUser;
  const isSelected = selectedUser === user.login;
  const select = () => isSelected && selectUser(user.login)
  return (
    <div className={classes.root}>
      <Card onClick={select} className={classes.card}>
        <CardMedia image={user.avatarUrl} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography color='inherit' className={classes.name}>
            {user.login}
          </Typography>
          <Typography color='inherit' className={classes.repos}>
            {user.repositories.totalCount} Repositories
            &#8226;&nbsp;
            {user.starredRepositories.totalCount} Stars
          </Typography>
        </CardContent>
      </Card>
      <Divider className={classnames(classes.divider, { [classes.selected]: isSelected })} />
    </div>
  );
}

const mapDispatchToProps = {
  selectUser
}

export default compose<ComponentType<IOwnProps>>(
  withRouter,
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(UserCard);