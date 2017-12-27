export const ACTION_TYPE = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_EQUIP_STATUS: 'FETCH_EQUIP_STATUS',
    FETCH_OWN_EQUIP_STATUS: 'FETCH_OWN_EQUIP_STATUS',
    FETCH_EVALUATE: 'FETCH_EVALUATE',
    FETCH_USER_INFO: 'FETCH_USER_INFO',
};

const ActionFactory = {
    createUsers(users) {
        return {type: ACTION_TYPE.FETCH_USERS, users: users};
    },
    createEquipStatus(equipStatus) {
        return {type: ACTION_TYPE.FETCH_EQUIP_STATUS, equipStatus: equipStatus};
    },
    createOwnEquipStatus(ownEquipStatus) {
        return {type: ACTION_TYPE.FETCH_OWN_EQUIP_STATUS, ownEquipStatus: ownEquipStatus};
    },
    createEvaluate(evaluate) {
        return {type: ACTION_TYPE.FETCH_EVALUATE, evaluate: evaluate};
    },
    createUserInfo(userInfo){
        return {type:ACTION_TYPE.FETCH_USER_INFO, userInfo:userInfo};
    },
};

export default ActionFactory;