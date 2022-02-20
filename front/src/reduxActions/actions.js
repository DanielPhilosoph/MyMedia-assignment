const { UPDATE_CURRENT_USER, UPDATE_USERS } = require("./actionKeyWords");

export const updateCurrentUser = (dispatch, user) => {
  const action = {
    type: UPDATE_CURRENT_USER,
    payload: user,
  };
  dispatch(action);
};

export const updateUsers = (dispatch, users) => {
  const action = {
    type: UPDATE_USERS,
    payload: users,
  };
  dispatch(action);
};
