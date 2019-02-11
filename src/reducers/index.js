import { combineReducers } from 'redux';
import securityReducer from 'src/reducers/security.reducer'
import alertReducer from 'src/reducers/alert.reducer'
import notificationReducer from 'src/reducers/notification.reducer'

export default combineReducers({
    securityReducer,
    alertReducer,
    notificationReducer
});