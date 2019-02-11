import axios from 'axios';

// Constants
import { AXIOS_CANCELLED_MESSAGE } from 'src/constants/common.constant'

export const getRequestSource = () => {
    return axios.CancelToken.source();
}

export const cancelRequest = (source) => {
    if (typeof source === 'object' && typeof source.cancel === 'function') {
        source.cancel(AXIOS_CANCELLED_MESSAGE);
    }
}