import React, { ComponentType, Component, Fragment } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { NavigationProps, Directions } from "../Types";
import { query } from "../../data/queries/openIssues";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { reset } from "../../store/actions/openIssues";
import NewIssueDialog from "./NewIssueDialog";
import OpenIssuesList from "./OpenIssuesList";
import { ContentLoad } from "../messages/Loaders";
import OpenIssuesHeader from "./OpenIssuesHeader";


type MatchParams = {
  id: string;
}

type IState = {
  rowsPerPage: number;
  dialogOpen: boolean;
}

class OpenIssues extends Component<NavigationProps & RouteComponentProps<MatchParams>, IState> {
  state = {
    rowsPerPage: 5,
    dialogOpen: false,
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  }

  openDialog = () => {
    this.setState({ dialogOpen: true });
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const {
      cursors: { direction, startCursor, endCursor },
      match: { params: { id: repositoryId } }
    } = this.props;
    const { rowsPerPage: rows, dialogOpen } = this.state;
    const right = direction === Directions.right
    const hasCursor = !!(startCursor && endCursor);
    return (
      <Query
        query={query(right, hasCursor)}
        variables={{ repositoryId, rows, startCursor, endCursor }}
        skip={!repositoryId}
        pollInterval={60 * 1000}
        notifyOnNetworkStatusChange
      >
        {({ loading, error, data }) => {
          const hasData = data && data.node;
          const changeRowsPerPage = rowsPerPage => this.setState({ rowsPerPage });
          return (
            <Fragment>
              <OpenIssuesHeader repository={hasData && data.node} />
              <ContentLoad loading={loading} error={error} hideContent={!hasData}>
                <OpenIssuesList data={data} openDialog={this.openDialog} rowsPerPage={rows} changeRowsPerPage={changeRowsPerPage} />
                <NewIssueDialog open={dialogOpen} close={this.closeDialog} repositoryId={hasData && data.node.id} />
              </ContentLoad>
            </Fragment>
          )
        }}
      </Query>
    );
  }
}

const mapStateToProps = state => ({
  cursors: state.openIssues,
})

const mapDispatchToProps = {
  reset,
}

export default compose<ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(OpenIssues);