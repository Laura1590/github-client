import { resetPagination } from "./repositories";

export const USERS_SEARCH = 'USERS_SEARCH'

export function searchForUsers(searchText) {
  return {
    type: USERS_SEARCH,
    data: searchText,
  }
}

export function selectUser(user) {
  return dispatch => {
    dispatch(resetPagination());
  }
}