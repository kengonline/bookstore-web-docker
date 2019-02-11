import _ from 'lodash';

// Config
import router from 'src/configs/router.config'

// Component
import Authenticate from 'src/components/security/Authenticate'

const { push } = router;

let list = [];
let routerObj = {};

export const addRouter = (component) => {
    let targetComponent = component;

    if (component.WrappedComponent) {
        targetComponent = component.WrappedComponent;
    }

    const { title, path, secure, permissions = [] } = targetComponent.configRoute();

    if (path) {
        const obj = { title, path, component, secure, permissions };
        list.push(obj);
        routerObj[path] = obj;
    }

    return component;
};

export const getRouters = () => list;

export const getRouterObj = () => routerObj;

export const getAsRouter = () => {
    let routers = list.sort((value1, value2) => {
        if (value1.path < value2.path)
            return 1;
        else if (value1.path > value2.path)
            return -1
        else
            return 0
    });

    return routers.map(function (router) {
        if (router.secure)
            router.component = Authenticate(router.component);

        return router;
    });
};

export const isSecurePath = (targetPath) => {
    for (let obj of list) {
        if (isMatchedPath(obj.path, targetPath)) {
            return obj.secure === true;
        }
    }

    return false;
}

export const isMatchedPath = (originalPath, targetPath) => {
    const targetPathArr = targetPath.split('/');
    const originalPathArr = originalPath.split('/');

    if (targetPathArr.length !== originalPathArr.length)
        return false;

    for (let [i, path] of originalPathArr.entries()) {
        if (path !== targetPathArr[i] && path.indexOf(":") === -1) {
            return false;
        }
    }

    return true;
}

const getPathArr = (path) => path.split('/').filter(item => item)

const getAllPath = (url) => {
    const array = getPathArr(url);

    let result = [];
    for (let index = 0; index < array.length; index++) {
        const targetArr = array.slice(0, index + 1);
        result.push(`/${targetArr.join('/')}`);
    }
    return result;
}

export const getNestedPath = (url) => {
    const paths = getAllPath(url);

    return list.filter(original => {
        return paths.find(path => isMatchedPath(original.path, path) && !_.isEmpty(original.title))
    }).reverse();
}

export const redirect = (targetPath) => {
    return push(targetPath);
}

export const getUrl = (originalPath, url) => {
    if (originalPath === '/') {
        return '/'
    }

    const total = originalPath.split('/').length;
    const urlArr = url.split('/').slice(0, total);

    return urlArr.join('/');
}