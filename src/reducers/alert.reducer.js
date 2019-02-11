import { combineReducers } from 'redux'

import * as Action from 'src/actions/alert.action'

const alerts = (state = [], action) => {
    switch (action.type) {
        case Action.ADD_ALERT:
            return [...state, action.payload];
        case Action.REMOVE_ALERT:
            return state.filter((alert, i) => alert.id !== action.payload);
        case Action.CLEAR_ALERT:
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    alerts
})