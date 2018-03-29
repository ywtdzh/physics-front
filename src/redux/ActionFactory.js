export const ACTION_TYPE = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_EQUIP_STATUS: 'FETCH_EQUIP_STATUS',
    FETCH_OWN_EQUIP_STATUS: 'FETCH_OWN_EQUIP_STATUS',
    FETCH_USER_INFO: 'FETCH_USER_INFO',
    FETCH_CODE: 'FETCH_CODE',
    FETCH_DOWNLOAD_LINK: 'DOWNLOAD_LINK',
};

const ActionFactory = {
    createUsers(users) {
        return {type: ACTION_TYPE.FETCH_USERS, users};
    },
    createEquipStatus(equipStatus) {
        return {type: ACTION_TYPE.FETCH_EQUIP_STATUS, equipStatus};
    },
    createOwnEquipStatus(ownEquipStatus) {
        return {type: ACTION_TYPE.FETCH_OWN_EQUIP_STATUS, ownEquipStatus};
    },
    createUserInfo(userInfo){
        return {type:ACTION_TYPE.FETCH_USER_INFO, userInfo};
    },
    createCode(code) {
        return {type: ACTION_TYPE.FETCH_CODE, code};
    },
    createDownloadLink(downloadLink) {
        return {type: ACTION_TYPE.FETCH_DOWNLOAD_LINK, downloadLink};
    },
};

export default ActionFactory;