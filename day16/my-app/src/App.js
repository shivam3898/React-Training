import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UserSettings from './components/UserSettings';

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewUser from "./components/NewUser";
import User from "./components/User";
import Product from "./components/ProductList";
import ProductList from "./components/ProductList";
import NewProduct from "./components/NewProduct";

const UserList = React.lazy(() => import('./components/UserList'))

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.roles.includes("ROLE_ADMIN"));
      console.log(isAdmin)
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>

        {/* Header */}
        <Header currentUser={currentUser} logOut={logout} />

        {/* Sidebar */}
        {currentUser && (
          <div>
            <Sidebar isAdmin={isAdmin} />
            <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
              <i className="bi bi-list fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addUser"><NewUser isAdmin={isAdmin} /></Route>
            <Route exact path="/products"><Product isAdmin={isAdmin} /></Route>
            <Route exact path="/addProduct"><NewProduct isAdmin={isAdmin} /></Route>
            <Route exact path="/settings" render={() => (
              localStorage.getItem("user") ? <UserSettings /> : <Redirect to="/login" />
            )} />
            <Suspense fallback={<div>Loading Component</div>}>
              <Route exact path="/userList" component={UserList} />
            </Suspense>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;