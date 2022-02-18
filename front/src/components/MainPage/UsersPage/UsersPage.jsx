import React from "react";
import UserDiv from "./UserDiv/UserDiv";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fireErrorAlert } from "../../../helper/functions";
import { updateUsers } from "../../../reduxActions/actions";

export default function UsersPage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get("http://localhost:3001/user/users", {
          headers: { Authorization: state.currentUser.token },
        });
        updateUsers(dispatch, response.data.users);
      } catch (error) {
        fireErrorAlert(error.response.data.error);
      }
    }
    getUsers();
  }, []);

  console.log(state.users);
  return (
    <div>
      <div>
        <h1 className="usersPageHeaderH1">Users</h1>
      </div>
      <div>
        {state.users.map((user) => {
          return <UserDiv key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
}
