import { UPDATE_CURRENT_USER, UPDATE_USERS } from "../reduxActions/actionKeyWords";

const initialize = {
  users: [],
  currentUser: "",
};

export default function mainReducer(state = initialize, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, users: action.payload };
    case UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
