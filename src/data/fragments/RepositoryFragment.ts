export default `
  fragment RepositoryFragment on Repository {
    id
    name
    stargazers {
      totalCount
    }
    watchers {
      totalCount
    }
  }
`;