import { Directions } from "../../components/Types";

export const OPEN_ISSUES_RESET = 'OPEN_ISSUES_RESET'
export const OPEN_ISSUES_PAGINATION_CHANGE_PAGE = 'OPEN_ISSUES_PAGINATION_CHANGE_PAGE'
export const OPEN_ISSUES_PAGINATION_GO_TO_START = 'OPEN_ISSUES_PAGINATION_GO_TO_START'
export const OPEN_ISSUES_PAGINATION_GO_TO_END = 'OPEN_ISSUES_PAGINATION_GO_TO_END'
export const OPEN_ISSUES_SELECT = 'OPEN_ISSUES_SELECT'

export function reset() {
  return {
    type: OPEN_ISSUES_RESET,
  }
}

export function goLeft(startCursor, endCursor) {
  return {
    type: OPEN_ISSUES_PAGINATION_CHANGE_PAGE,
    data: {
      direction: Directions.left,
      startCursor,
      endCursor,
    }
  }
}

export function goRight(startCursor, endCursor) {
  return {
    type: OPEN_ISSUES_PAGINATION_CHANGE_PAGE,
    data: {
      direction: Directions.right,
      startCursor,
      endCursor,
    }
  }
}

export function goToStart() {
  return {
    type: OPEN_ISSUES_PAGINATION_GO_TO_START,
  }
}

export function goToEnd() {
  return {
    type: OPEN_ISSUES_PAGINATION_GO_TO_END,
  }
}

export function selectIssue(selectedIssue) {
  return {
    type: OPEN_ISSUES_SELECT,
    data: {
      selectedIssue
    }
  }
}