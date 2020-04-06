import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, AWAITING_CONFIRM } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    confirmMsg: null,
    isAuthenticated: null,
    isAwaitingConfirm: null,
    isLoading: false,
    user: null
};

export default function(state = initialState, action) 
{
    switch(action.type) 
    {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case AWAITING_CONFIRM:
            return{
                ...state,
                isAwaitingConfirm: true,
                confirmMsg: action.payload.msg
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAwaitingConfirm: false,
                confirmMsg: null
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                confirmMsg: null,
                user: null,
                isAuthenticated: false,
                isAwaitingConfirm: false,
                isLoading: false
            }
        default:
            return state;
    }
}