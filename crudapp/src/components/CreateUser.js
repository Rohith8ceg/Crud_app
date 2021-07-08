import React, { useState } from "react";
import UserDataService from "../services/UserService";
import Login from "./Login"
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const CreateUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    password: "",
    name: "",
    role: "",
  };
  const [User, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [Error, setError] = useState("")
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };
  const alert = useAlert();
  const saveUser = () => {
    var data = {
      username: User.username,
      email: User.email,
      password: User.password,
      name: User.name,
      role: User.role,
    };
    UserDataService.create(data)
      .then((response) => {
        setUser({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          name: response.data.name,
          role: response.data.role,
        });
        setSubmitted(true);
        console.log(response.data);
        console.log(response.data.username);
      })
      .catch((e) => {
        alert.error(e.response.data.error);
        console.log(e.response.data.error);
      });
  };
  // const newUser = () => {
  //   setUser(initialUserState);
  //   setSubmitted(false);
  // };
  return (
    <div className="bg">
    <div className="submit-form">
      {submitted ? (
        <Login/>
      ) : (
        <div className="login-box">
          <h1>Sign Up</h1>
          <div className="textbox">
          <i class="fas fa-user"></i>
            <input
              type="text"
              id="name"
              required
              value={User.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="textbox">
          <i class="fas fa-user"></i>
            <input
              type="text"
              id="username"
              required
              value={User.username}
              onChange={handleInputChange}
              name="username"
              placeholder="Username"
            />
          </div>
          {/* <div className="textbox">
            <i class="fas fa-info"></i>
            <input
              type="text"
              id="role"
              required
              value={User.role}
              onChange={handleInputChange}
              name="role"
              placeholder="Role"
            />
          </div> */}
           <div className="textbox">
           <i class="fas fa-info"></i>
            <select className="transparent"
              id="role"
              defaultValue={User.role}
              onChange={handleInputChange}
              name="role"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="textbox">
          <i class="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              required
              value={User.email}
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
              value={User.password}
              onChange={handleInputChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <br/>    
          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
          <br></br>
          <a className="nav-link" href="/">Have an account ?</a>
          <br></br>
          {Error ? <p>{Error}</p> : <p></p>}
        </div>
      )}
    </div>
    </div>
  );
};

export default CreateUser;
