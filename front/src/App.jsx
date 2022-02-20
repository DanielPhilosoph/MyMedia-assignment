import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import MainPage from "./components/MainPage/MainPage";
import UserPage from "./components/MainPage/UserPage/UserPage";
import { useEffect } from "react";
import { getLocalStorageInfo } from "./helper/functions";
import axios from "axios";
import { BASE_URL } from "./config/config";
import { updateCurrentUser, updateUsers } from "./reduxActions/actions";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const usersPagesRoutes = state.users.map((user) => {
    return <Route key={user._id} path={`/${user.email}`} element={<UserPage user={user} />} />;
  });

  useEffect(() => {
    if (getLocalStorageInfo() && getLocalStorageInfo().token) {
      async function checkToken() {
        try {
          const response = await axios.get(`${BASE_URL}/user/${getLocalStorageInfo().id}`, {
            headers: { authorization: getLocalStorageInfo().token },
          });
          if (response.data.user) {
            updateCurrentUser(dispatch, response.data.user);
          }
          const response2 = await axios.get(`${BASE_URL}/user/users`, {
            headers: { authorization: getLocalStorageInfo().token },
          });
          if (response2.data.users) {
            updateUsers(dispatch, response2.data.users);
          }
        } catch (error) {}
      }
      checkToken();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {state.currentUser !== "" ? <Route path="/users" element={<MainPage />} /> : ""}
          {state.currentUser !== "" ? usersPagesRoutes : ""}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
