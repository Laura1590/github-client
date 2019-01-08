import React, { ComponentClass } from 'react';
import { Repository } from '../Types';
import { WithStyles, withStyles, TableRow, TableCell, Theme } from '@material-ui/core';
import { selectRepository } from '../../store/actions/repositories';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouterProps } from 'react-router';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => ({
  root: {

  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  }
})

type IOwnProps = {
  repository: Repository;
}

type IProps = {
  selectedRepository: string;
  selectRepository: (repository: string) => void;
}

function RepositoryListRow(props: IOwnProps & IProps & WithStyles & RouterProps) {
  const { classes, selectedRepository, selectRepository, repository } = props;
  const select = () => selectedRepository != repository.id && selectRepository(repository.id);
  return (
    <TableRow
      className={classes.root}
      hover
      selected={selectedRepository == repository.id}
      onClick={select}
    >
      <TableCell>
        <Link className={classes.link} to={`/repository/${repository.id}`}>
          {repository.name}
        </Link>
      </TableCell>
      <TableCell align="right">
        {repository.stargazers.totalCount} Stars
        &#8226;&nbsp;
        {repository.watchers.totalCount} Watching
      </TableCell>
    </TableRow>
  )
}

const mapStateToProps = state => ({
  selectedRepository: state.repositories.selectedRepository,
})

const mapDispatchToProps = {
  selectRepository,
}

export default compose<ComponentClass<IOwnProps>>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(RepositoryListRow)
