import { HAS_DASHBOARD, NO_DASHBOARD, SPENT_SUCCESS, SPENT_FAIL, EARNED_SUCCESS, EARNED_FAIL, CLEAR_MSG } from '../actions/types';

const initialState = {
    hasDashboard: false,
    changeMsg: null
}

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case HAS_DASHBOARD:
            return {
                ...state,
                hasDashboard: true
            }
        case NO_DASHBOARD:
            return {
                ...state,
                hasDashboard: false
            }
        case EARNED_SUCCESS:
        case SPENT_SUCCESS:
            return {
                ...state,
                changeMsg: action.payload.msg
            }
        case EARNED_FAIL:
        case SPENT_FAIL:
        case CLEAR_MSG:
            return {
                ...state,
                changeMsg: null
            }
        default:
            return state;
    }
}