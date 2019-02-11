import moment from 'moment';

// APIs
import * as API from "src/apis/activity.api";

// Services
import { getResponse } from "src/services/common.service";

export const fetchLatest = async (cancelToken, size) => {
    return getResponse(await API.getLatest(cancelToken, size), []);
}

export const transformToCards = (list = []) => {
    return list.map(item => {
        return {
            ...item,
            text: item.type,
            type: item.type,
            createdDate: moment(item.createdDate)
        }
    })
}