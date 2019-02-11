/* eslint-disable */
export default {
    API_SERVER: process.env.REACT_APP_API_SERVER,
    API_RESOURCE: process.env.REACT_APP_API_RESOURCE,
    VERSION: process.env.REACT_APP_VERSION,
    TIMEZONE: process.env.REACT_APP_DEFAULT_TIMEZONE,
    NOTIFICATION_DURATION: process.env.REACT_APP_NOTIFICATION_DURATION || 5,
    DEBOUNCE_INPUT: process.env.REACT_APP_DEBOUNCE_INPUT || 1000,
    ENABLE_LOGGER: process.env.REACT_APP_ENABLE_LOGGER === undefined ? false : process.env.REACT_APP_ENABLE_LOGGER,
}