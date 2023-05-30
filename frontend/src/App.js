import React, {Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import Users from './user/pages/Users';
// import NewDoc from './docs/pages/NewDoc';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
// import UserDocs from './docs/pages/UserDocs';
// import UpdateDoc from './docs/pages/UpdateDoc';
// import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(()=>import('./user/pages/Users'))
const NewDoc = React.lazy(()=>import('./docs/pages/NewDoc'))
const UserDocs = React.lazy(()=>import('./docs/pages/UserDocs'))
const UpdateDoc = React.lazy(()=>import('./docs/pages/UpdateDoc'))
const Auth = React.lazy(()=>import('./user/pages/Auth'))

function App() {

  const {token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
    // If the user is logged in, render these routes
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/docs">
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
        <Route path="/:userId/docs">
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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
