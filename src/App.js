import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Users from './user/pages/Users';
import NewDoc from './docs/pages/NewDoc'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserDocs from './docs/pages/UserDocs';
import UpdateDoc from './docs/pages/UpdateDoc';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useState } from 'react';
import { useCallback } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [])

  let routes;

  if (isLoggedIn) {
    routes = (<Switch>
      <Route path="/" exact><Users /></Route>
      <Route path="/:userid/docs"><UserDocs /></Route>
      <Route path="/docs/new"><NewDoc /></Route>
      <Route path="/docs/:docId"><UpdateDoc /></Route>
      <Redirect to="/" />
    </Switch>
    );
  } else {
    routes = (<Switch>
      <Route path="/" exact><Users /></Route>
      <Route path="/:userid/docs"><UserDocs /></Route>
      <Route path="/auth"><Auth /></Route>
      <Redirect to="/auth" />
    </Switch>
    );
  }

  return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
    <Router>
      <MainNavigation />
      <main>

        {routes}

      </main>
    </Router>
  </AuthContext.Provider>;
}

export default App;
