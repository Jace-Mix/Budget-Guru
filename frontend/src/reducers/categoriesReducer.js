import { CATEGORY_SUCCESS, CATEGORY_FAIL, CATEGORY_LOADING, CATEGORY_LOADED, CATEGORY_ERROR } from '../actions/types';

const initialState = {
    createdBudget: false,
    isLoading: false,
    account: null,
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
        case CATEGORY_SUCCESS:
            return {
                ...state,
                ...action.payload,
                createdBudget: true,
            }
        case CATEGORY_ERROR:
        case CATEGORY_FAIL:
            return {
                ...state,
                createdBudget: false,
                account: null
            }
        default:
            return state
    }
}