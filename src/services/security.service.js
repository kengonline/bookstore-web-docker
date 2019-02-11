// Configs
import store from 'src/configs/store.config'

// Constants
import { LOGIN_TYPE } from 'src/constants/storage.constant'

// APIs
// import * as AuthAPI from 'src/apis/authenticate.api'
// import * as UserAPI from "src/apis/user.api";

// Services
import { setLoginType, removeLoginType, getLoginType } from "src/services/storage.service";
import { getResponse } from "src/services/common.service";
import { redirect } from "src/services/router.service";

// Actions
import { setUserProfile } from "src/actions/security.action";

export const login = async (credential = {}, loginType = LOGIN_TYPE.TEMPORARY) => {
    // const response = await getResponse(AuthAPI.login(credential));

    // if (response.success) {
    //     setLoginType(loginType);
    //     await store.dispatch(setUserProfile(response.payload));
    // }

    // return response;
}

export const logout = async () => {
    // const response = await getResponse(AuthAPI.logout());

    // if (response.success) {
    //     removeLoginType();
    //     redirect('/login')
    // }

    // return response;
}

export const fetchUserProfile = async () => {
    // const response = await getResponse(UserAPI.getProfile());

    // if (response.success) {
    //     await store.dispatch(setUserProfile(response.payload));
    // }

    // return response;
}

export const verifyUserProfile = () => {
    if (getLoginType() === LOGIN_TYPE.PERMANENT) {
        return fetchUserProfile();
    }
}

export const isAuthenticated = () => {
    const { token } = store.getState().securityReducer;
    return !!token;
}

export const isAuthorize = (requiredPermissions = []) => {
    if (!Array.isArray(requiredPermissions)) {
        throw new Error('requiredPermissions must be array.');
    }

    if (!isAuthenticated()) {
        return false;
    } else if (requiredPermissions.length === 0) {
        return true;
    }

    const { userProfile = {} } = store.getState().securityReducer;
    const { permissionObject } = userProfile;

    return requiredPermissions.find(permission => permissionObject.indexOf(permission) > -1);
}