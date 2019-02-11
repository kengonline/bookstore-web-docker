import { combineReducers } from 'redux'

import * as Action from 'src/actions/security.action'

const userProfile = (state = {}, action) => {
    switch (action.type) {
        case Action.SET_USER_PROFILE:
            return action.payload;
        case Action.CLEAR_USER_PROFILE:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    userProfile
})