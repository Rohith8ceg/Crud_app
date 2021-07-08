import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateUser from "./components/CreateUser";
import User from "./components/User";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      {/*<nav className="navbar navbar-expand navbar-dark bg-dark">
        {" "}
        <div className="navbar-nav mr-auto">
           {isAuthenticated ? (
            <li className="nav-item">
              <Link to={"/logout-user"} className="nav-link">
                Logout
              </Link>
            </li>
          ) : (
            <div></div>
          )} 
          <li className="nav-item">
            <Link to={"/logout"} className="nav-link">
              Logout
            </Link>
          </li>
        </div>
      </nav>*/}
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/user-list"]} component={UserList} />
          <Route exact path={["/user-create"]} component={CreateUser} />
          <Route exact path={["/user-detail/:id"]} component={User} />
          <Route exact path={["/","/login"]} component={Login} />
          <Route exact path={["/logout"]} component={Logout} />
        </Switch>
      </div>
    </div>
  );
}

export default App;