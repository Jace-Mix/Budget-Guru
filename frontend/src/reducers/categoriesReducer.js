import { CATEGORY_SUCCESS, CATEGORY_FAIL, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_ERROR, RESET_SUCCESS, RESET_FAIL, TOGGLE_RESET } from '../actions/types';

const initialState = {
    createdBudget: false,
    isLoading: false,
    didReset: false,
    account: null
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORY_LOADED:
            return {
                ...state,
                isLoading: false,
                account: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                account: action.payload,
                didReset: true,
            }
        case TOGGLE_RESET:
            return {
                ...state,
                didReset: false
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                ...action.payload,
                createdBudget: true,
            }
        case CATEGORY_ERROR:
        case CATEGORY_FAIL:
        case RESET_FAIL:
            return {
                ...state,
                createdBudget: false,
                didReset: false,
                account: null
            }
        default:
            return state
    }
}