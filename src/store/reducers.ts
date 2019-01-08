import { combineReducers } from "redux";
import { users } from "./reducers/users";
import { repositories } from "./reducers/repositories";
import { openIssues } from "./reducers/openIssues";

const rootReducer = combineReducers({
  users,
  repositories,
  openIssues,
})

export default rootReducer
