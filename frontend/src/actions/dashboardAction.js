import axios from 'axios';
import { returnErrors } from './errorActions';
import { SPENT_SUCCESS, SPENT_FAIL, EARNED_SUCCESS, EARNED_FAIL, CLEAR_MSG, CATEGORY_LOADED} from './types';
import { tokenConfig } from './authActions';

export const updateSpent = ({ Spent, Category }) => (dispatch, getState) =>
{
    const body = JSON.stringify({ Spent, Category });

    axios.post('/api/dashboard/updateSpent', body, tokenConfig(getState)).then(res => 
    {
        dispatch({type: CATEGORY_LOADED, payload: res.data.account});
        dispatch({type: SPENT_SUCCESS, payload: res.data});
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'SPENT_FAIL'));
        dispatch({
            type: SPENT_FAIL
        })
    });
}

export const updateEarned = ({ Earned }) => (dispatch, getState) =>
{
    const body = JSON.stringify({ Earned });
    axios.post('/api/dashboard/updateEarned', body, tokenConfig(getState)).then(res =>
    {
        dispatch({type: CATEGORY_LOADED, payload: res.data.account});
        dispatch({type: EARNED_SUCCESS, payload: res.data});
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'EARNED_FAIL'));
        dispatch({
            type: EARNED_FAIL
        })
    });
}

export const clearMsg = () =>
{
    return {
        type: CLEAR_MSG
    };
};