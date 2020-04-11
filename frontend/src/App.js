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
import SignUpPage from './pages/SignUpPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ErrorPage from './pages/Page404';
import ConfirmResetPage from './pages/ConfirmResetPage';
import ResetPage from './pages/ResetPage';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';

class App extends Component
{
    componentDidMount()
    {
        store.dispatch(loadUser());
    };

    render()
    {
        // {localStorage.getItem('token') !== null ? <DashboardPage /> : <Redirect to="/error"/>}
        // {localStorage.getItem('token') !== null ? <CategoriesPage /> : <Redirect to="/error"/>}
        return(
            <Provider store={store}>
            <Router>
              <Switch>
                <Route path="/" exact>
                  <MainPage />
                </Route>
                <Route path="/login" exact>
                  <LoginPage />
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
                <Route path="/confirmation" exact>
                    <ConfirmationPage />
                </Route>
                <Route path="/reset" exact>
                    <ResetPage />
                </Route>
                <Route path="/confirmreset" exact>
                    <ConfirmResetPage />
                </Route>
                <Route path="/dashboard" exact>
                    <DashboardPage />         
                </Route>
                <Route path="/categories" exact>
                    <CategoriesPage />
                </Route>
                <Route path="/error" exact>
                    <ErrorPage />
                </Route>
                <Redirect to="/error" />
              </Switch>
            </Router>
            </Provider>
        );
    }
}

export default App;