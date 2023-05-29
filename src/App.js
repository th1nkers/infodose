import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Users from './user/pages/Users';
import NewDoc from './docs/pages/NewDoc';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserDocs from './docs/pages/UserDocs';
import UpdateDoc from './docs/pages/UpdateDoc';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useState, useCallback } from 'react';

function App() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  // Function to handle user login
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  // Function to handle user logout
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    // If the user is logged in, render these routes
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userid/docs">
          <UserDocs />
        </Route>
        <Route path="/docs/new">
          <NewDoc />
        </Route>
        <Route path="/docs/:docId">
          <UpdateDoc />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    // If the user is not logged in, render these routes
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userid/docs">
          <UserDocs />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
