import {ACTION_TYPE} from "./ActionFactory";

const users = (state = [], action) => {
    return action.type === ACTION_TYPE.FETCH_USERS ?
        action.users :
        state || [];
};
const equipStatus = (state = [], action) => {
    return action.type === ACTION_TYPE.FETCH_EQUIP_STATUS ?
        action.equipStatus :
        state || [];
};
const ownEquipStatus = (state = {}, action) => {
    return action.type === ACTION_TYPE.FETCH_OWN_EQUIP_STATUS ?
        action.ownEquipStatus :
        state || {};
};
const userInfo = (state = {}, action) => {
    return action.type === ACTION_TYPE.FETCH_USER_INFO ?
        action.userInfo :
        state || {};
};
const code = (state = {}, action) => {
    return action.type === ACTION_TYPE.FETCH_CODE ?
        action.code :
        state || {};
};
const downloadLink = (state = {}, action) => {
    return action.type === ACTION_TYPE.FETCH_DOWNLOAD_LINK ?
        action.downloadLink :
        state || {};
};

export default {
    users,
    equipStatus,
    ownEquipStatus,
    userInfo,
    code,
    downloadLink,
};