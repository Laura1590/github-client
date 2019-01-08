import * as userActions from '../actions/users';

const initialUsers = {
  searchText: '',
};

export function users(state = initialUsers, action: any) {
  switch (action.type) {
    case userActions.USERS_SEARCH:
      return Object.assign({}, state, {
        searchText: action.data
      })
    default:
      return state
  }
}