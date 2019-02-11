import { createStore, applyMiddleware } from 'redux';
import Config from 'src/configs/env.config';

// Reducers
import rootReducer from 'src/reducers/index'

// Third parties
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
let middlewares = [];

if (Config.ENABLE_LOGGER === "true") {
    middlewares.push(loggerMiddleware)
}

const configureStore = createStore(
    rootReducer,
    applyMiddleware(
        promise,
        thunkMiddleware, // lets us dispatch() functions
        ...middlewares
    )
)

export default configureStore;