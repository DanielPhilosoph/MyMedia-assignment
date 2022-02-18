import { UPDATE_CURRENT_USER, UPDATE_SEARCH, UPDATE_USERS } from "../reduxActions/actionKeyWords";

const initialize = {
  users: [],
  searchString: "",
  currentUser: "",
};

export default function mainReducer(state = initialize, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, users: action.payload };
    case UPDATE_SEARCH:
      return { ...state, searchString: action.payload };
    case UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
