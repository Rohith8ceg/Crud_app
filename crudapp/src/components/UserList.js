import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";
import Login from "./Login";
import history from "../history";
import { useAlert } from "react-alert";

const UserList = () => {
  const [User, setUser] = useState([]);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [CurrentIndex, setCurrentIndex] = useState(-1);
  const [isLogin, setisLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedinUser, setLoggedInUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [logUser, setLogUser] = useState("");
  const [role, setRole] = useState("");
  const alert = useAlert();

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    UserDataService.getAll()
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
        setisLogin(true);
      })
      .catch((e) => {
        console.log("---" + e.message);
        setisLogin(false);
        window.location.href = "/login";
      });
    whoami();
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
        setLogUser(data.username);
        setLoggedInUser(data.username);
        setRole(data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const lgout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then((response) => {
        setisLogin(false);
      })
      .catch((e) => {
        console.log(e);
      });
    history.push("/login");
    alert.success("Logged out successfully!");
  };

  return (
    <>{isLogin ? (
      <div>
        <div class="btn-lgout">
          <button className="btn btn-warning" onClick={lgout}>
            Logout
          </button>
        </div>
        <div className="list row">
          <div className="col-md-8">
            <br />
            <h4 className="center">Users List</h4>

            <ul className="grid-container">
              {User &&
                User.map((user, index) => (
                  <li
                    className="item"
                    onClick={() => setActiveUser(user, index)}
                    key={index}
                  >
                    {user.name}

                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-12">
            {CurrentUser ? (
              <div>
                <br />
                <div>
                  <label className="label">
                    <strong>Name:</strong>
                  </label>{" "}
                  {CurrentUser.name}
                </div>
                <div>
                  <label className="label">
                    <strong>Username:</strong>
                  </label>{" "}
                  {CurrentUser.username}
                </div>
                <div>
                  <label className="label">
                    <strong>Role:</strong>
                  </label>{" "}
                  {CurrentUser.role}
                </div>
                <div>
                  <label className="label">
                    <strong>Email:</strong>
                  </label>{" "}
                  {CurrentUser.email}
                </div>
                <br />
                {role === "admin" || (CurrentUser.username === loggedinUser) ? (
                  <Link
                  to={{
                    pathname: "/user-detail/" + CurrentUser.id,
                    state: { lg_user: logUser, role: role },
                  }}
                  className="btn btn-warning"
                >
                  Update/Delete
                </Link>
                ) : (
                  <div></div>
                )}

              </div>
            ) : (
              <div>
                <br />
              </div>
            )}
          </div>
        </div>
      </div>) : (<Login />)}
    </>
  );
};

export default UserList;