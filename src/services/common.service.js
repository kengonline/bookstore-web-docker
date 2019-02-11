import QueryString from "query-string"
import _ from 'lodash'

// Constants
import { SORT_DIRECTION } from "src/constants/common.constant";

export const getResponse = (payload, defaultValue = null) => {
    const { data = defaultValue, response, statusFlag, cancelled } = payload;

    let error = {};

    if (payload.response) {
        // Server throw exception
        error = response.data.payload;
    } else {
        // Can't connect server
        error = payload;
    }

    return {
        payload: data,
        success: statusFlag,
        error,
        cancelled
    }
}

export const sortIntStringMix = (a, b) => {
    //if empty, assign default string. ! is the lowest order in printable ascii
    a = _.isEmpty(a) ? "!" : a;
    b = _.isEmpty(b) ? "!" : b;

    if (isNaN(a) && isNaN(b)) {
        return a.localeCompare(b);
    } else if (isNaN(a) && !isNaN(b)) {
        return -1
    } else if (!isNaN(a) && isNaN(b)) {
        return 1
    } else {
        const intA = parseInt(a, 10)
        const intB = parseInt(b, 10)
        return intA - intB;
    }
}

export const randomString = (length) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';
    for (let i = length; i > 0; --i) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

export const getParams = (urlParams) => {
    return QueryString.parse(urlParams);
}

export const naturalSorter = (as, bs) => {
    let a, b, a1, b1, i = 0, n, L,
        rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;  /** Todo : แก้จาก regex ให้เป็น code ปกติ */
    if (as === bs) return 0;
    a = as.toLowerCase().match(rx);
    b = bs.toLowerCase().match(rx);
    L = a.length;
    while (i < L) {
        if (!b[i]) return 1;
        a1 = a[i];
        b1 = b[i++];
        if (a1 !== b1) {
            n = a1 - b1;
            if (!isNaN(n)) return n;
            return a1 > b1 ? 1 : -1;
        }
    }
    return b[i] ? -1 : 0;
}

export const messageToOpener = (message, target) => {
    if (window.opener && typeof window.opener.postMessage === 'function') {
        window.opener.postMessage(message, target)
    }
}


export const saveFile = (data, fileName, mimeType) => {
    let binary = atob(data.replace(/\s/g, ''));
    let len = binary.length;
    let buffer = new ArrayBuffer(len);
    let view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    onSave(view, fileName, mimeType);
}

const onSave = (data, fileName, mimeType) => {
    var blob = new Blob([data], { type: mimeType });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName);
    }
    else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', fileName);

        if (tempLink.download === undefined) {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

export const parseAntSorter = (direction = '') => {
    return SORT_DIRECTION[direction.toUpperCase()]
}

export const transformPaginationSorter = (sorter) => {
    const { by, mode } = sorter
    if (by === undefined || mode === undefined) {
        return undefined
    } else {
        return [sorter]
    }
}

export const getDefaultOptions = (options = []) => {
    if (options.length) {
        return options[0]
    } else {
        return {};
    }
}

export const getDefaultOnlyOneOptions = (options) => {
    if (options.length === 1) {
        return options[0]
    } else {
        return {};
    }
}

export const getFileName = (path = '') => {
    const pathArr = path.split('/');
    return pathArr[pathArr.length - 1];
}