import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../helper/functions";

export default function UserDiv({ user }) {
  const navigate = useNavigate();

  const onDivClick = () => {
    navigate(`/${user.email}`);
  };

  return (
    <div className="userDiv" onClick={onDivClick}>
      <h4>
        {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}
      </h4>
      <h5 className="userDivEmail">{user.email}</h5>
    </div>
  );
}
