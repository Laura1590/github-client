import { Directions } from "../../components/Types";

export const REPOSITORY_PAGINATION_RESET = 'REPOSITORY_PAGINATION_RESET'
export const REPOSITORY_PAGINATION_CHANGE_PAGE = 'REPOSITORY_PAGINATION_CHANGE_PAGE'
export const REPOSITORY_PAGINATION_GO_TO_START = 'REPOSITORY_PAGINATION_GO_TO_START'
export const REPOSITORY_PAGINATION_GO_TO_END = 'REPOSITORY_PAGINATION_GO_TO_END'
export const REPOSITORY_SELECT = 'REPOSITORY_SELECT'

export function resetPagination() {
  return {
    type: REPOSITORY_PAGINATION_RESET,
  }
}

export function goLeft(startCursor, endCursor) {
  return {
    type: REPOSITORY_PAGINATION_CHANGE_PAGE,
    data: {
      direction: Directions.left,
      startCursor,
      endCursor,
    }
  }
}

export function goRight(startCursor, endCursor) {
  return {
    type: REPOSITORY_PAGINATION_CHANGE_PAGE,
    data: {
      direction: Directions.right,
      startCursor,
      endCursor,
    }
  }
}

export function goToStart() {
  return {
    type: REPOSITORY_PAGINATION_GO_TO_START,
  }
}

export function goToEnd() {
  return {
    type: REPOSITORY_PAGINATION_GO_TO_END,
  }
}

export function selectRepository(selectedRepository) {
  return {
    type: REPOSITORY_SELECT,
    data: {
      selectedRepository
    }
  }
}