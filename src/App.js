import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Users from './user/pages/Users';
import NewDoc from './docs/pages/NewDoc'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserDocs from './docs/pages/UserDocs';

function App() {
  return <>
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact><Users /></Route>
          <Route path="/docs/new"><NewDoc /></Route>
          <Route path="/:userid/docs"><UserDocs /></Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  </>;
}

export default App;
