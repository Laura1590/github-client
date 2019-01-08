import gql from "graphql-tag";
import RepositoryFragment from "../fragments/RepositoryFragment";
import PageInfoFragment from "../fragments/PageInfoFragment";

const fragments = `
  ${RepositoryFragment}
  ${PageInfoFragment}
`;

const queryFirst = gql`
  query ($user: String!, $rows: Int!) {
    user(login: $user) {
      repositories(first: $rows) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          node {
            ...RepositoryFragment
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryRight = gql`
  query ($user: String!, $rows: Int!, $endCursor: String!) {
    user(login: $user) {
      repositories(first: $rows, after: $endCursor) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          node {
            ...RepositoryFragment
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryLeft = gql`
  query ($user: String!, $rows: Int!, $startCursor: String!) {
    user(login: $user) {
      repositories(last: $rows, before: $startCursor) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          node {
            ...RepositoryFragment
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryLast = gql`
  query ($user: String!, $rows: Int!) {
    user(login: $user) {
      repositories(last: $rows) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          node {
            ...RepositoryFragment
          }
        }
      }
    }
  }
  ${fragments}
`;

export const query = (right, hasCursor) => right
  ? hasCursor ? queryRight : queryFirst
  : hasCursor ? queryLeft : queryLast;
