import gql from "graphql-tag";
import IssuesFragment from "../fragments/IssuesFragment";
import RepositoryFragment from "../fragments/RepositoryFragment";
import PageInfoFragment from "../fragments/PageInfoFragment";

const fragments = `
  ${IssuesFragment}
  ${RepositoryFragment}
  ${PageInfoFragment}
`;

const queryFirst = gql`
  query ($repositoryId: ID!, $rows: Int!) {
    node(id: $repositoryId) {
      ...RepositoryFragment
      ... on Repository {
        issues(states: [OPEN], first: $rows) {
          totalCount
          pageInfo {
            ...PageInfoFragment
          }
          edges {
            node {
              ...IssuesFragment
            }
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryRight = gql`
  query ($repositoryId: ID!, $rows: Int!, $endCursor: String!) {
    node(id: $repositoryId) {
      ...RepositoryFragment
      ... on Repository {
        issues(states: [OPEN], first: $rows, after: $endCursor) {
          totalCount
          pageInfo {
            ...PageInfoFragment
          }
          edges {
            node {
              ...IssuesFragment
            }
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryLeft = gql`
  query ($repositoryId: ID!, $rows: Int!, $startCursor: String!) {
    node(id: $repositoryId) {
      ...RepositoryFragment
      ... on Repository {
        issues(states: [OPEN], last: $rows, before: $startCursor) {
          totalCount
          pageInfo {
            ...PageInfoFragment
          }
          edges {
            node {
              ...IssuesFragment
            }
          }
        }
      }
    }
  }
  ${fragments}
`;

const queryLast = gql`
  query ($repositoryId: ID!, $rows: Int!) {
    node(id: $repositoryId) {
      ...RepositoryFragment
      ... on Repository {
        issues(states: [OPEN], last: $rows) {
          totalCount
          pageInfo {
            ...PageInfoFragment
          }
          edges {
            node {
              ...IssuesFragment
            }
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
