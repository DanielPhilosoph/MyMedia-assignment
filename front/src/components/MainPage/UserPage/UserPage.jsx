import React from "react";
import { capitalizeFirstLetter, formatDate } from "../../../helper/functions";
import NavBar from "../../NavBar/NavBar";
export default function UserPage({ user }) {
  return (
    <div>
      <NavBar />
      <div className="userPageMainDiv">
        <h3 className="userPageHeader">
          {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}
        </h3>
        <h5 className="userPageEmail">{user.email}</h5>
        <div style={{ margin: "auto", width: "50%" }}>
          {user.entries.map((entry, i) => {
            return (
              <div className="entryDiv" key={entry._id}>
                <span>Entry at {formatDate(entry.loggingTime).date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
