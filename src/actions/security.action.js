export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const setUserProfile = (payload) => {
    return {
        type: SET_USER_PROFILE,
        payload
    }
}

export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE';
export const clearUserProfile = () => {
    return {
        type: CLEAR_USER_PROFILE
    }
}