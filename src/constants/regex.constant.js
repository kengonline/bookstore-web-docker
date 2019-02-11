export const TAG_REMOVE = /(<([^>]+)>)/ig

export const EVERYTHING_EXCECPT_NUMBER_AND_DECIMAL = /[^0-9.]/g;

export const INTEGER_OR_DECIMAL_ONLY = /^(\-?\d+(\.\d+)?)$/g;

export const LATITUDE = /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,7})?|90(\.0{1,7})?)$/;

export const LONGITUDE = /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,7})?)|180(\.0{1,7})?)$/;

export const EMAIL = /^([a-zA-Z0-9]([\._-]?[a-zA-Z0-9_-]){1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const URL = /^((https?|http):\/\/)?([a-zA-Z0-9]{2,}.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*/;