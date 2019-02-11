import axios from 'axios'

// Configs
import Config from 'src/configs/env.config'
import store from 'src/configs/store.config'

// Constants
import { AXIOS_CANCELLED_MESSAGE } from "src/constants/common.constant";

// Services
import { buildError, alertDanger } from 'src/services/alert.service'
import { getResponse } from 'src/services/common.service'
import { redirect } from 'src/services/router.service'
import { logout } from "src/services/security.service";

// Actions
import { openTimeout, closeTimeout } from "src/actions/notification.action";

const CODES_IGNORED = [];

const serverInstance = axios.create({
    baseURL: Config.API_SERVER,
    withCredentials: true
});
serverInstance.defaults.headers.post['Content-Type'] = 'application/json';

const successInterceptor = response => {
    store.dispatch(closeTimeout());
    return { ...response, statusFlag: true };
}
const errorInterceptor = error => {
    if (error.message === "Network Error") {
        store.dispatch(openTimeout());
    }

    const cancelled = error.message === AXIOS_CANCELLED_MESSAGE;
    const response = getResponse(error);

    if (!cancelled && CODES_IGNORED.indexOf(response.error.code) === -1) {
        alert(transform(error));
    }

    return Promise.reject({ ...error, statusFlag: false, cancelled });
}

const transform = ({ response }) => {
    const { status, config, data } = response;
    const payload = data ? data.payload : undefined;
    let error;

    if (status === 404) {
        error = buildError(`Url ${config.url} not found.`, undefined, undefined, response);
    } else if ([400, 403, 415].indexOf(status) >= 0) {
        error = buildError(payload.message, undefined, undefined, response);
    } else if (status === 401) {
        error = buildError('Session timeout or unauthenticated.', undefined, undefined, response);
        logout();
    } else if (status === 503) {
        error = buildError('Service unavailable.', undefined, undefined, response);
    } else {
        let technicalDetailMsg;
        if (data != null && payload) {
            technicalDetailMsg = (payload.message) ? payload.message : data;
        }
        let message = 'There is an error with the internet connection or a system error has occurred. Please try again or call us for assistance.';
        let detail = `Application can't open the page ${config.url}. Please try again later.`
        error = buildError(message, detail, technicalDetailMsg, response);
        redirect('/error')
    }

    return error;
}

const alert = (error) => {
    console.error(error);
    const { message, detail, technicalDetail } = error;
    alertDanger(message, detail, technicalDetail, { autoDismiss: true });
}

serverInstance.interceptors.response.use(successInterceptor, errorInterceptor);

export {
    serverInstance
}