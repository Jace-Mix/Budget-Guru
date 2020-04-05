import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import store from './store'

// Pages
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import SignUpPage from './pages/SignUpPage';

class App extends Component
{
    componentDidMount()
    {
        store.dispatch(loadUser());
    };

    render()
    {
        return(
            <Provider store={store}>
            <Router>
              <Switch>
                <Route path="/" exact>
                  <MainPage />
                </Route>
                <Route path="/cards" exact>
                    {localStorage.getItem('token') !== null ? <CardPage /> : <Redirect to="/"/>}
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
            </Provider>
        );
    }
}

export default App;