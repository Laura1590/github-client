import React, { ComponentType, Component } from "react";
import { Query } from "react-apollo";
import { compose } from "redux";
import { connect } from "react-redux";
import { query } from "../../data/queries/repositories";
import { NavigationProps, Directions } from "../Types";
import { RouteComponentProps, withRouter } from "react-router";
import RepositoryList from "./RepositoryList";
import { ContentLoad } from "../messages/Loaders";

type MatchParams = {
  selectedUser: string;
}

type IState = {
  rowsPerPage: number;
}

class Repositories extends Component<NavigationProps & RouteComponentProps<MatchParams>, IState> {
  state = {
    rowsPerPage: 5,
  };

  render() {
    const {
      cursors: { direction, startCursor, endCursor },
      match: { params: { selectedUser: user } }
    } = this.props;
    const { rowsPerPage: rows } = this.state;
    const right = direction === Directions.right
    const hasCursor = !!(startCursor && endCursor);
    return (
      <Query
        query={query(right, hasCursor)}
        variables={{ user, rows, startCursor, endCursor }}
        skip={!user}
        pollInterval={60 * 1000}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data }) => {
          const hasData = data && data.user && data.user.repositories;
          const changeRowsPerPage = rowsPerPage => this.setState({ rowsPerPage });
          return (
            <ContentLoad loading={loading} error={error} hideContent={!hasData}>
              <RepositoryList
                data={data}
                rowsPerPage={rows}
                changeRowsPerPage={changeRowsPerPage}
              />
            </ContentLoad>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = state => ({
  cursors: state.repositories,
})

export default compose<ComponentType>(
  connect(mapStateToProps),
  withRouter,
)(Repositories);