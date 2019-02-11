import Cookies from 'universal-cookie';

const LOGIN_TYPE = "LOGIN_TYPE"
const cookies = new Cookies();

export const setLoginType = (type) => {
    cookies.set(LOGIN_TYPE, type);
}

export const getLoginType = () => {
    cookies.get(LOGIN_TYPE);
}

export const removeLoginType = () => {
    cookies.remove(LOGIN_TYPE);
}