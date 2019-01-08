import gql from "graphql-tag";

export const mutation = gql`
  mutation($repositoryId: ID! $title: String! $body: String!) {
    createIssue (
      input: {
        repositoryId:$repositoryId
        title:$title
        body:$body
      }
    ) {
      issue {
        id
        title
        body
      }
    }
  }
`;