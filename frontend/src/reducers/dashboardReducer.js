import { HAS_DASHBOARD, NO_DASHBOARD } from '../actions/types';

const initialState = {
    hasDashboard: false
}

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case HAS_DASHBOARD:
            return {
                hasDashboard: true
            }
        case NO_DASHBOARD:
            return {
                hasDashboard: false
            }
        default:
            return state;
    }
}