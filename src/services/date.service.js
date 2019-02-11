import moment from 'moment';

export const getDateTimeRangeText = (ts1, ts2, dateFormat = 'DD/MM/YYYY', timeFormat = 'HH:mm') => {
    const dateTime1 = moment(ts1);
    const date1 = dateTime1.clone().startOf('day');
    const dateTime2 = moment(ts2);
    const date2 = dateTime2.clone().startOf('day');

    const dateTimeFormat = `${dateFormat} ${timeFormat}`

    if (date1.isSame(date2)) {
        return `${dateTime1.format(dateTimeFormat)} - ${dateTime2.format(timeFormat)}`
    } else {
        return `${dateTime1.format(dateTimeFormat)} - ${dateTime2.format(dateTimeFormat)}`
    }
}

export const getStartOf = (date, unit) => {
    if (date === undefined) {
        return undefined;
    }

    return date.clone().startOf(unit)
}

export const getEndOf = (date, unit) => {
    if (date === undefined) {
        return undefined;
    }

    return date.clone().endOf(unit)
}

export const isSameDate = (date1, date2) => {
    if (date1 === undefined && date2 === undefined) {
        return true;
    } else if (date1 === undefined) {
        return false;
    } else if (date2 === undefined) {
        return false;
    } else {
        const value1 = date1.clone().startOf('date');
        const value2 = date2.clone().startOf('date');

        return value1.isSame(value2)
    }
}