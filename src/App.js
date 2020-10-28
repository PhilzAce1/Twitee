import React from 'react';
import 'antd/dist/antd.css';

import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import { GlobalProvider } from './context/globalContext';
import Header from './components/Header';
import AuthRoute from './hoc/AuthRoute';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <Switch>
        <Route exact path="/" component={AuthRoute(Home, false)} />
        <Route exact path="/login" component={AuthRoute(Login, false)} />
        <Route exact path="/signup" component={AuthRoute(Signup, false)} />
        <Route exact path="/posts" component={AuthRoute(Posts, true)} />
        <Route path="*" component={AuthRoute(Home, false)} />
      </Switch>
    </GlobalProvider>
  );
}

export default App;
