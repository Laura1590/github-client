import gql from "graphql-tag";

export const query = gql`
query($searchText: String!) {
  search(query: $searchText, first: 100, type: USER) {
    userCount
    edges {
      node {
        ... on User {
          login
          avatarUrl
          repositories {
            totalCount
          }
          starredRepositories {
            totalCount
          }
        }
      }
    }
  }
}`;