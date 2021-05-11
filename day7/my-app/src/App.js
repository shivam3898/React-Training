import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './images/logo.png';

import AuthService from './services/authService';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import UserSettings from './components/UserSettings';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  // const [adminPanel, setAdminPanel] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // setAdminPanel(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} className="logo" />
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/settings"} className="nav-link">
                User Settings
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" render={() => (
            localStorage.getItem("user") ? <Redirect to="/home" /> : <Login />
          )} />
          <Route exact path="/profile" render={() => (
            localStorage.getItem("user") ? <Profile /> : <Redirect to="/login" />
          )} />
          <Route exact path="/settings" render={() => (
            localStorage.getItem("user") ? <UserSettings /> : <Redirect to="/login" />
          )} />
        </Switch>
      </div>
    </div>
  );

}

export default App;
