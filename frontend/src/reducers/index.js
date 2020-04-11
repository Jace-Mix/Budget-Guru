import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer
});