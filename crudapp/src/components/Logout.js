import React, { useState } from "react";
import history from "../history";

const Logout = () => {
  const [message, setMessage] = useState("");
  const logOut = () => {
    fetch("/userapi/logout", {
      credentials: "same-origin",
    })
      .then((response) => {
        console.log(response.data.message);
        setMessage(response.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
    history.push("/login");
    window.location.href = "/";
  };
  return (
    <>
      <p>{{ message }}</p>
      {logOut()}
    </>
  );
};

export default Logout;
