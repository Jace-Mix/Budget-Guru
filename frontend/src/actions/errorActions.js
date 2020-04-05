import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errors
export const returnErrors = (error, status, id = null) =>
{
    return {
        type: GET_ERRORS,
        payload: {error, status, id}
    };
};

// Clear errors
export const clearErrors = () =>
{
    return {
        type: CLEAR_ERRORS
    };
};