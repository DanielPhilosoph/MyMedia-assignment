import React from "react";
import NavBar from "../NavBar/NavBar";
import UsersPage from "./UsersPage/UsersPage";
import "../../CSS/mymedia.css";

import { changeBodyBackGround } from "../../helper/functions";

export default function MainPage() {
  changeBodyBackGround("white");

  return (
    <div>
      <NavBar />
      <UsersPage />
    </div>
  );
}
