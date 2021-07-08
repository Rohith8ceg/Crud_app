import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import axios from "axios";
import { useAlert } from "react-alert";

const User = (props) => {
  var initialUserState = {
    id: null,
    username: "",
    name: "",
    role: "",
    loggedInUser: "",
  };

  const loggedInUser = props.location.state.lg_user;
  const lgUserRole = props.location.state.role;
  initialUserState = {
    ...initialUserState,
    loggedInUser: loggedInUser,
    lgUserRole: lgUserRole,
  };
  const [CurrentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const alert = useAlert();

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        var final = response.data;
        final["loggedInUser"] = loggedInUser;
        final["lgUserRole"] = lgUserRole;
        setCurrentUser(final);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...CurrentUser, [name]: value });
  };

  const updateUser = () => {
    axios({
      method: "put",
      url: `http://localhost:8000/router/user/${CurrentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: CurrentUser,
    })
      .then((response) => {
        console.log(response.data);
        alert.success("The user was updated successfully!");
        //setMessage("The user was updated successfully!");
        back();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        if (e.response.status === 403)
          setMessage("You cannot update this user");
        console.log(message);
      });
  };

  const deleteUser = () => {
    axios({
      method: "delete",
      url: `http://localhost:8000/router/user/${CurrentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: CurrentUser,
    })
      .then((response) => {
        console.log(response.data);
        alert.success("The user was deleted successfully!");
        back();
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 403)
          setMessage("You cannot delete this user");
      });
  };

  const back = () => {
    props.history.push("/");
  };

  return (
    <div>
      {CurrentUser ? (
        <div className="login-box">
          <h4>User Details </h4>
          <br />
          <form>
            <div className="textbox">
              <label className="label" htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                value={CurrentUser.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>
            <div className="textbox">
              <label className="label" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={CurrentUser.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div className="textbox">
              <label className="label" htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={CurrentUser.role}
                onChange={handleInputChange}
                name="role"
              />
            </div>
          </form>
          <br />          
          {(lgUserRole === "admin" ) || (CurrentUser.username === loggedInUser) ?  (
            <button className="btn btn-danger mr-2" onClick={deleteUser}>
              Delete
            </button>
          ) : (
            <div></div>
          )}
          {" "}
          {CurrentUser.username === loggedInUser ? (
            <button
              type="submit"
              className="btn btn-success"
              onClick={updateUser}
            >
              Update User
            </button>
          ) : (
            <div></div>
          )}
          <p>{message}</p>
          <button className="btn btn-warning" onClick={back}>
            Go back
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
