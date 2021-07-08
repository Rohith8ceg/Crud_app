import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useAlert } from "react-alert";

const Login = () => {
  const cookies = new Cookies();
  const initialUserState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [authenticated, setauthenticated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [Error, setError] = useState(null);
  
  const setauth = (val) => {
    setauthenticated(val);
  };
  useEffect(() => {
    getSession();
  }, []);
  const getSession = () => {
    axios({
      method: "get",
      url: "/api/session",
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      if (response.data.isAuthenticated) {
        setauth(true);
      } else {
        setauth(false);
      }
    });
  };
  
  const alert = useAlert();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const logUser = (event) => {
    var data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/login/",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      withCredentials: true,
      data: data,
    })
      .then((response) => {
        setauthenticated(true);
        console.log("---", authenticated);
        alert.success("Welcome "+user.username+" !!!")
      })
      .catch((e) => {
        if (e.response.status === 401) alert.error("Wrong credentials");
        if (e.response.status === 400) setError("Bad Request, Try again");
        if (e.response.status === 406) setError(e.response.data.error);
        console.log(e.response);
      });
  };



  return (
    <div className="submit-form">
      {authenticated ? (
        <UserList isAuth={authenticated}/>
      ) : (
//         <div class="login-box">
//   <h1>Login</h1>
//   <div class="textbox">
//     <i class="fas fa-user"></i>
//     <input type="text" placeholder="Username">
//   </div>

//   <div class="textbox">
//     <i class="fas fa-lock"></i>
//     <input type="password" placeholder="Password">
//   </div>

//   <input type="button" class="btn" value="Sign in">
// </div>    
        <div className="login-box">
          
     
          <h1>Login</h1>
          <div className="textbox">
          <i class="fas fa-user"></i>
            <input
              type="text"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="textbox">
          <i class="fas fa-envelope"></i>
            <input
              type="text"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="textbox">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <br></br>
          <button onClick={logUser} className="btn btn-success">
            Submit
            </button>
          <br></br>
          <Link to={"/user-create"} className="nav-link">
            Dont have an account ?
          </Link>
          <br></br>
          {Error ? <p>{Error}</p> : <p></p>}
        </div>
      )}
    </div>
  );
};

export default Login;
