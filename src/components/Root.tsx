import React from 'react';
import { withStyles, WithStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { defaultTheme } from './themes';
import { Route, Redirect } from 'react-router';
import Header from './Header';
import OpenIssues from './repositoriesView/OpenIssues';
import Users from './usersView/Users';
import Repositories from './usersView/Repositories';
import Scrollable from './helpers/Scrollable';

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
  },
  rest: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'column',
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    maxWidth: 1320,
    boxSizing: 'border-box' as 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

function Root(props: WithStyles) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={defaultTheme}>
        <Header />
        <div className={classes.rest} >
          <Scrollable fillHeight>
            <div className={classes.content}>
              <Route exact path="/" render={() => <Redirect to="/user" />} />
              <Route exact path="/user/:selectedUser?" component={Users} />
              <Route exact path="/user/:selectedUser" component={Repositories} />
              <Route exact path="/repository/:id" component={OpenIssues} />
            </div>
          </Scrollable>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default withStyles(styles)(Root);
