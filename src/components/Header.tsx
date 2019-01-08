import React, { Component, ComponentType } from "react";
import { withStyles, WithStyles, AppBar, InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Search } from "@material-ui/icons";
import { searchForUsers } from "../store/actions/users";
import { connect } from "react-redux";
import { debounce } from "debounce";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router";

const styles = theme => ({
  root: {
    zIndex: 1,
  },
  appBar: {
    flexFlow: 'row',
    color: theme.palette.common.white,
  },
  search: {
    position: 'relative' as 'relative',
    flex: 2,
    flexBasis: 'auto',
    maxWidth: 400,
    margin: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: '100%',
    position: 'absolute' as 'absolute',
    pointerEvents: 'none' as 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit' as 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  grow: {
    flex: 1,
  },
  growTwice: {
    flex: 2,
  },
});

type IProps = {
  searchForUsers: any
}

class Header extends Component<WithStyles & IProps & RouteComponentProps<null>> {
  public render() {
    const { classes, searchForUsers, history } = this.props;
    const search = debounce(searchForUsers, 200);
    const isOnUserPage = history.location.pathname.match(/^\/user\//)
    const goToUsersPage = (e) => e.key === 'Enter' && !isOnUserPage && history.push('/user');
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search users…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={event => search(event.target.value)}
              onKeyPress={goToUsersPage}
            />
          </div>
          <div className={classes.growTwice} />
        </AppBar>
      </div>
    )
  }
}

const mapDispatchToProps = {
  searchForUsers
}

export default compose<ComponentType>(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Header)