import { randomString } from 'src/services/common.service'

export const ADD_ALERT = 'ADD_ALERT';
export const addAlert = (type, message, detail, technicalDetail, options) => {
    return {
        type: ADD_ALERT,
        payload: { id: randomString(5), type, message, detail, technicalDetail, ...options }
    }
}

export const REMOVE_ALERT = 'REMOVE_ALERT';
export const removeAlert = (id) => {
    return {
        type: REMOVE_ALERT,
        payload: id
    }
}

export const CLEAR_ALERT = 'CLEAR_ALERT';
export const clearAlert = () => {
    return {
        type: CLEAR_ALERT,
        payload: []
    }
}