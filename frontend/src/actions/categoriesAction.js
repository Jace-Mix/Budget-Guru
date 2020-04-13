import axios from 'axios';
import { returnErrors } from './errorActions';
import { CATEGORY_SUCCESS, CATEGORY_FAIL, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_ERROR, HAS_DASHBOARD, NO_DASHBOARD, RESET_SUCCESS, RESET_FAIL } from './types';
import { tokenConfig } from './authActions';

export const updateCategories = ({ MonthlyIncome, MonthlyBill, Clothing, FoodDrink, Home, Entertainment, Transportation, Health, Misc }) => (dispatch, getState) =>
{
    const body = JSON.stringify({ MonthlyIncome, MonthlyBill, Clothing, FoodDrink, Home, Entertainment, Transportation, Health, Misc });

    axios.post('/api/categories/update', body, tokenConfig(getState)).then(res => dispatch({
        type: CATEGORY_SUCCESS,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'CATEGORY_FAIL'))
        dispatch({
            type: CATEGORY_FAIL
        })
    });
}

export const loadCategories = () => (dispatch, getState) =>
{
    dispatch({ type: CATEGORY_LOADING });
    axios.get('/api/categories/getCategories', tokenConfig(getState)).then(res => 
    {
        dispatch({ type: CATEGORY_LOADED, payload: res.data });
        if (res.data.Active)
        {
            dispatch({ type: HAS_DASHBOARD });
        }
        else
        {
            dispatch({ type: NO_DASHBOARD });
        }
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: CATEGORY_ERROR
        })
    })
}

export const resetCategories = () => (dispatch, getState) =>
{
    axios.get('/api/categories/resetCategories', tokenConfig(getState)).then(res =>
    {
        dispatch({ type: RESET_SUCCESS, payload: res.data });
        dispatch({ type: NO_DASHBOARD });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'RESET_FAIL'));
        dispatch({
            type: RESET_FAIL
        })
    })
}
