export default `
  fragment IssuesFragment on Issue {
    id
    title
    number
    createdAt
    author {
      login
    }
  }
`;