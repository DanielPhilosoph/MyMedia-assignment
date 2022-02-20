import React, { useRef } from "react";
import UserDiv from "./UserDiv/UserDiv";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { fireErrorAlert } from "../../../helper/functions";
import { updateUsers } from "../../../reduxActions/actions";
import { BASE_URL } from "../../../config/config";

export default function UsersPage() {
  const search = useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(`${BASE_URL}/user/users`, {
          headers: { Authorization: state.currentUser.token },
        });
        updateUsers(dispatch, response.data.users);
      } catch (error) {
        fireErrorAlert(error.response.data.error);
      }
    }
    getUsers();
  }, []);

  function debounce(func, timeout = 500) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null);
      }, timeout);
    };
  }

  const onSearchChange = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/users?query=${search.current.value}`, {
        headers: { Authorization: state.currentUser.token },
      });
      updateUsers(dispatch, response.data.users);
    } catch (error) {
      fireErrorAlert(error.response.data.error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="usersPageHeaderH1">Users</h1>
      </div>
      <div className="searchDiv">
        <input
          ref={search}
          type={"text"}
          className="searchBar"
          onChange={debounce(() => onSearchChange())}
        />
      </div>
      <div>
        {state.users.map((user) => {
          return <UserDiv key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
}
