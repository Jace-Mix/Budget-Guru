import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return(
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/cards" exact>
          <CardPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
            <SignUpPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;