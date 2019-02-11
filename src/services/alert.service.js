import store from 'src/configs/store.config'
import { notification } from 'antd'
import { addAlert, removeAlert, clearAlert } from 'src/actions/alert.action'
import { TYPES } from 'src/constants/alert.constant'

const { danger, info, success, warning } = TYPES;

const alert = async (type, message, detail, technicalDetail, options) => {
    const { alerts } = store.getState().alertReducer;

    if (!isDuplicate(alerts, { type, message, detail, technicalDetail })) {
        const result = await store.dispatch(addAlert(type, message, detail, technicalDetail, options))
        notification[type]({ message, description: detail, onClose: () => remove(result.payload.id) });
    }
}

const remove = (id) => {
    store.dispatch(removeAlert(id))
}

const isDuplicate = (alerts, error) => {
    let isDuplicate = false;

    for (let alert of alerts) {
        if (alert.type === error.type && alert.message === error.message && alert.detail === error.detail && alert.technicalDetail === error.technicalDetail) {
            isDuplicate = true;
            break;
        }
    }

    return isDuplicate;
}

export const clear = () => {
    store.dispatch(clearAlert());
}

export const buildError = (message, detail, technicalDetail, response) => {
    return { message, detail, technicalDetail, response };
}

export const alertDanger = (message, detail, technicalDetail, options = {}) => {
    alert(danger, message, detail, technicalDetail, options);
}

export const alertInfo = (message, detail, technicalDetail, options = {}) => {
    alert(info, message, detail, technicalDetail, options);
}

export const alertSuccess = (message, detail, technicalDetail, options = {}) => {
    alert(success, message, detail, technicalDetail, options);
}

export const alertWarning = (message, detail, technicalDetail, options = {}) => {
    alert(warning, message, detail, technicalDetail, options);
}

export const destroy = async () => {
    await clear();
    notification.destroy();

    return true;
}