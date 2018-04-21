import Axios from 'axios';
import Config from './config';

const getToken = () => {
    let token;
    if (window.localStorage instanceof Object) {
        token = window.localStorage.token;
    }
    if (token === undefined) {
        token = document.cookie;
    }
    return token;
};

const logOut = () => {
    Axios.post(`${Config.server()}/api/user/logout`, {token: getToken()});
};

const getUserInfo = (loginInfo, callback) => {
    Axios.post(`${Config.server()}/api/user/login`, loginInfo)
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (window.localStorage instanceof Object)
                window.localStorage.token = response.data.token;
            // noinspection JSUnresolvedVariable
            let userInfo = {
                id: loginInfo.id,
                type: response.data.user_group === 0 ? 'elder' : 'naive',
                device: response.data.device || undefined,
            };
            if (callback instanceof Function)
                callback(userInfo);
        });
};

const getUsers = (callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/user/list`, {token})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            else if (callback instanceof Function)
                callback(response.data instanceof Array ?
                    response.data.map(source => ({id: source.id, device: source.device, type: 'naive'})) :
                    new Error('Typeof "data" field do not match'));
        });
};

const getEquipStatus = (callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/device/status_all`, {token})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback(response.data);
        });
};

const getOwnEquipStatus = (callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/device/status`, {token})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback(response.data);
        });
};

const getCode = (callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/code/get`, {token})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback({status: response.status, code: response.data});
        });
};

const getDownloadLink = (callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/user/history`, {token})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback({downloadLink: response.data});
        });
};

const createOrUpdateUser = (userAuthenticate, callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/user/register`, {
        token,
        target_user_id: userAuthenticate.id,
        target_user_password: userAuthenticate.password,
        device: userAuthenticate.device || undefined,
    })
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback({status: response.status, code: response.data});
        });
};

const submitCode = (code, callback = null) => {
    const token = getToken();
    Axios.post(`${Config.server()} /api/code/submit`, {token, code})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            }
            if (callback instanceof Function)
                callback();
        });
};

const deleteUsers = (users, callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/user/delete`, {
        token,
        users,
    }).then(res=>{
        const response = res.data;
        if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
            callback(new Error(response.msg));
        }
        if (callback instanceof Function)
            callback();
    });
};

export default {
    getEquipStatus,
    logOut,
    getOwnEquipStatus,
    getUserInfo,
    getUsers,
    getCode,
    getDownloadLink,
    createOrUpdateUser,
    submitCode,
    deleteUsers,
};
