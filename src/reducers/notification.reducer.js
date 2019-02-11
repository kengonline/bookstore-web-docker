import { combineReducers } from 'redux';

// Actions
import * as Action from 'src/actions/notification.action'

const timeout = (state = false, action) => {
    switch (action.type) {
        case Action.OPEN_TIMEOUT:
            return true;
        case Action.CLOSE_TIMEOUT:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    timeout
})