import React from 'react';
import { ApolloConsumer } from 'react-apollo';

export const withApolloClient = (ConnectedComponent) => class extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {client => <ConnectedComponent {...this.props} client={client} />}
      </ApolloConsumer>
    );
  }
}