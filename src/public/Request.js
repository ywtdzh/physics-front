import Axios from 'axios';
import Config from './config';

const parseCookie = (cookieStr) => {
    const KVPairs = cookieStr.split('; ');
    const cookie = {};
    KVPairs.forEach(KVPair => {
        const values = KVPair.split('=');
        if (values.length === 2) cookie[values[0]] = values[1];
    });
    return cookie;
};

const getToken = () => {
    let token;
    if (window.localStorage instanceof Object) {
        token = window.localStorage.loginToken;
    }
    if (!token || token === 'null') {
        token = parseCookie(document.cookie).loginToken;
    }
    return token;
};

const logOut = () => {
    document.cookie = 'loginToken=';
    if (window.localStorage) window.localStorage.loginToken = '';
    Axios.post(`${Config.server()}/api/user/logout`, {token: getToken()});
};

const getUserInfo = (loginInfo, callback) => {
    (async () => {
        let loginToken;
        if (window.localStorage) loginToken = window.localStorage.loginToken;
        else loginToken = parseCookie(document.cookie).loginToken;
        let logged = false;
        if (loginInfo === null && loginToken) {
            await Axios.post(`${Config.server()}/api/user/info`, {token: getToken()})
                .then(res => {
                    const response = res.data;
                    if (response.status) {
                        logged = true;
                        if (callback instanceof Function) { // noinspection JSUnresolvedVariable
                            callback({
                                id: response.data.id,
                                type: response.data.user_group === 0 ? 'elder' : 'naive',
                                device: response.data.device || undefined,
                            });
                        }
                    } else {
                        callback();
                    }
                });
        }
        if (loginInfo instanceof Object && !logged)
            Axios.post(`${Config.server()}/api/user/login`, loginInfo)
                .then(res => {
                    const response = res.data;
                    if (!response.status) {
                        if (callback instanceof Function) // noinspection JSUnresolvedVariable
                            callback(new Error(response.msg));
                        return;
                    }
                    if (window.localStorage instanceof Object)
                        window.localStorage.loginToken = response.data.token;
                    document.cookie = "loginToken=" + response.data.token;
                    // noinspection JSUnresolvedVariable
                    let userInfo = {
                        id: loginInfo.id,
                        type: response.data.user_group === 0 ? 'elder' : 'naive',
                        device: response.data.device || undefined,
                    };
                    if (callback instanceof Function)
                        callback(userInfo);
                });
    })().catch(e => {
        callback(e);
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
        })
        .catch(e => {
            callback(e);
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
                callback(response.data || []);
        })
        .catch(e => {
            callback(e);
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
                callback(response.data || {});
        })
        .catch(e => {
            callback(e);
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
                callback(response.data);
        })
        .catch(e => {
            callback(e);
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
                callback(response.data);
        })
        .catch(e => {
            callback(e);
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
        })
        .catch(e => {
            callback(e);
        });
};

const submitCode = (code, callback = null) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/code/submit`, {token, code})
        .then(res => {
            const response = res.data;
            if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
                callback(new Error(response.msg));
            } else if (callback instanceof Function)
                callback();
        })
        .catch(e => {
            callback(e);
        });
};

const deleteUsers = (users, callback) => {
    const token = getToken();
    Axios.post(`${Config.server()}/api/user/delete`, {
        token,
        users,
    }).then(res => {
        const response = res.data;
        if (!response.status && callback instanceof Function) { // noinspection JSUnresolvedVariable
            callback(new Error(response.msg));
        }
        if (callback instanceof Function)
            callback();
    })
        .catch(e => {
            callback(e);
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
