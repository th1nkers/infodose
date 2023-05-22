import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Fields from './field/pages/Fields';
import NewTopic from './places/pages/NewTopic';
import MainHeader from './shared/components/Navigation/MainHeader';
import Footer from './shared/components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <main>
        <MainHeader />
        <Switch>
          <Route path="/explore" exact>
            <Fields />
          </Route>
          <Route path="/places/new" exact>
            <NewTopic />
          </Route>
          <Redirect to="/explore" />
        </Switch>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
