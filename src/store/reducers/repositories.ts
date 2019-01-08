import * as repositoriesActions from '../actions/repositories';
import { Directions } from '../../components/Types';

const initialRepositories = {
  startCursor: null,
  endCursor: null,
  direction: Directions.right,
  selectedRepository: null,
}

export function repositories(state = initialRepositories, action: any) {
  switch (action.type) {
    case repositoriesActions.REPOSITORY_PAGINATION_RESET:
      return initialRepositories
    case repositoriesActions.REPOSITORY_PAGINATION_CHANGE_PAGE:
      return Object.assign({}, state, {
        startCursor: action.data.startCursor,
        endCursor: action.data.endCursor,
        direction: action.data.direction,
      })
    case repositoriesActions.REPOSITORY_PAGINATION_GO_TO_START:
      return Object.assign({}, state, {
        startCursor: null,
        endCursor: null,
        direction: Directions.right,
      })
    case repositoriesActions.REPOSITORY_PAGINATION_GO_TO_END:
      return Object.assign({}, state, {
        startCursor: null,
        endCursor: null,
        direction: Directions.left,
      })
    case repositoriesActions.REPOSITORY_SELECT:
      return Object.assign({}, state, {
        selectedRepository: action.data.selectedRepository
      })
    default:
      return state
  }
}
