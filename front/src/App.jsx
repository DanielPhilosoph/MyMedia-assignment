import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { useSelector } from "react-redux";
import MainPage from "./components/MainPage/MainPage";
import UserPage from "./components/MainPage/UserPage/UserPage";

function App() {
  const state = useSelector((state) => state);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {state.currentUser !== "" ? <Route path="/users" element={<MainPage />} /> : ""}
          {state.users.map((user) => {
            return (
              <Route key={user._id} path={`/${user.email}`} element={<UserPage user={user} />} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
