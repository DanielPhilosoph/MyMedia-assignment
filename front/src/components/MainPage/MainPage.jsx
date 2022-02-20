import React from "react";
import NavBar from "../NavBar/NavBar";
import UsersPage from "./UsersPage/UsersPage";
import "../../CSS/mymedia.css";

export default function MainPage() {
  const root = document.querySelector(":root");
  root.style.setProperty("--body-bg-color", "white");

  return (
    <div>
      <NavBar />
      <UsersPage />
    </div>
  );
}
