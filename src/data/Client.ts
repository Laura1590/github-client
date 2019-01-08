import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      accept: 'application/vnd.github.starfire-preview+json',
    }
  }
});

const introspectionQueryResultData = require('./fragmentTypes.json');
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

// test client
client
  .query({ query: gql`{viewer{login}}` })
  .then((result: any) => console.log(
    `Authentication successful using key ending in ${(process.env.REACT_APP_GITHUB_TOKEN || '').slice(-4)}
      %cWelcome ${result.data.viewer.login} 🚀 \n`, 'font-size: large'))
  .catch(() => console.error('Authentication failed'));

export default client;