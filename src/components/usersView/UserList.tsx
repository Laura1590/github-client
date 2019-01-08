import React, { ComponentType, Fragment } from 'react';
import { WithStyles, withStyles, Theme, Typography, } from '@material-ui/core';
import UserCard from './UserCard';
import { User } from '../Types';
import { compose } from 'redux';
import Scrollable from '../helpers/Scrollable';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => ({
  title: {
    paddingLeft: theme.spacing.unit,
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    width: 'fit-content',
    paddingBottom: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  }
})

type IOwnProps = {
  users: User[];
}

function UserList(props: IOwnProps & WithStyles) {
  const { classes, users } = props;
  return (
    <Fragment>
      <Typography variant="h6" className={classes.title}> Users </Typography>
      <Scrollable>
        <div className={classes.content}>
          {users
            .map(user =>
              <Link
                to={`/user/${user.login}`}
                key={user.login}
                className={classes.link}
              >
                <UserCard user={user} />
              </Link>
            )}
        </div>
      </Scrollable>
    </Fragment>
  );
}

export default compose<ComponentType<IOwnProps>>(
  withStyles(styles),
)(UserList);
