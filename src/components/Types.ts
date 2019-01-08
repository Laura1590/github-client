export type Countable = {
  totalCount: number;
}

export type User = {
  login: string;
  avatarUrl: string;
  repositories: Countable;
  starredRepositories: Countable;
}

export type Repository = {
  id: string;
  name: string;
  stargazers: Countable;
  watchers: Countable;
}

export type IssueListItem = {
  id: string;
  title: string;
  number: number;
  createdAt: string;
  author: {
    login: string;
  }
}

export const Directions = {
  left: 'left',
  right: 'right',
}

export type Cursors = {
  startCursor: string,
  endCursor: string,
  direction: string,
}

export type NavigationProps = {
  cursors: Cursors,
  goLeft: (startCursor: string, endCursor: string) => void,
  goRight: (startCursor: string, endCursor: string) => void,
  goToStart: () => void,
  goToEnd: () => void,
  reset: () => void,
}
