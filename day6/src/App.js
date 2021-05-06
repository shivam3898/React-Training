import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import UserSetting from './components/UserSetting';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home/:id" component={Home} />
      <Route exact path="/edit/:id" component={UserSetting} />
    </Switch>
  )

}

export default App;
