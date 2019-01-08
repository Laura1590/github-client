import React, { ComponentType } from 'react';
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserList from './UserList';
import { ContentLoad } from '../messages/Loaders';
import { query } from '../../data/queries/users';

type IProps = {
  searchText: string;
}

const Users = (props: IProps) => {
  return (
    <Query
      query={query}
      variables={{ searchText: escape(props.searchText) }}
      skip={!props.searchText}
      pollInterval={60 * 1000}
      notifyOnNetworkStatusChange
    >
      {({ loading, error, data }) => {
        const hasData = data && data.search;
        const users = hasData && data.search.edges
          .map(edge => edge.node)
          // filter out users like Laura1500 that have no values
          .filter(user => user.login);
        return (
          <ContentLoad loading={loading} error={error} hideContent={!hasData}>
            <UserList users={users} />
          </ContentLoad>
        );
      }}
    </Query>
  )
};

const mapStateToProps = state => ({
  searchText: state.users.searchText
})

export default compose<ComponentType>(
  connect(mapStateToProps),
)(Users);
