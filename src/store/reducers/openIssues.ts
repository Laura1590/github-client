import * as openIssuesActions from '../actions/openIssues';
import { Directions } from '../../components/Types';

const initialOpenIssues = {
  startCursor: null,
  endCursor: null,
  direction: Directions.right,
  selectedIssue: null,
}

export function openIssues(state = initialOpenIssues, action: any) {
  switch (action.type) {
    case openIssuesActions.OPEN_ISSUES_RESET:
      return initialOpenIssues
    case openIssuesActions.OPEN_ISSUES_PAGINATION_CHANGE_PAGE:
      return Object.assign({}, state, {
        startCursor: action.data.startCursor,
        endCursor: action.data.endCursor,
        direction: action.data.direction,
      })
    case openIssuesActions.OPEN_ISSUES_PAGINATION_GO_TO_START:
      return Object.assign({}, state, {
        startCursor: null,
        endCursor: null,
        direction: Directions.right,
      })
    case openIssuesActions.OPEN_ISSUES_PAGINATION_GO_TO_END:
      return Object.assign({}, state, {
        startCursor: null,
        endCursor: null,
        direction: Directions.left,
      })
    case openIssuesActions.OPEN_ISSUES_SELECT:
      return Object.assign({}, state, {
        selectedIssue: action.data.selectedIssue
      })
    default:
      return state
  }
}
