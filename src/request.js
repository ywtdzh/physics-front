const getUserInfo = (type, callback) => {
    if (type === 'elder')
        callback({
            id: '1',
            username: 'claim',
            type: 'elder',
            number: '201593098',
            sex: 'male',
            // device: '01',
        });
    else
        callback({
            id: '2',
            username: 'X_ming',
            type: 'naive',
            number: '123456789',
            sex: 'male',
            device: '01',
        });
};

const getUsers = (callback) => {
    callback([
        {
            id: '2',
            username: 'X_ming',
            type: 'naive',
            number: '123456789',
            sex: 'male',
            registerTime: '2017-12-26T10:06:53.551Z',
            device: '01',
        },
        {
            id: '3',
            username: 'Z_ling',
            type: 'naive',
            number: '123456798',
            sex: 'female',
            registerTime: '2017-12-26T10:28:53.551Z',
            device: '02',
        },
    ]);
};

const getEquipStatus = (callback) => {
    callback([
        {
            id: 1,
            data1: 'a',
            data2: 'b',
            data3: 'c',
        },
        {
            id: 2,
            data1: 'd',
            data2: 'e',
            data3: 'f',
        },
        {
            id: 3,
            data1: 'g',
            data2: 'h',
            data3: 'i',
        },
    ]);
};

const getOwnEquipStatus = (callback) => {
    callback({
        id: 1,
        data1: 'a',
        data2: 'b',
        data3: 'c',
    });
};

const getEvaluate = (callback) => {
    callback({
        id: 2,
        data1: 'd',
        data2: 'e',
        data3: 'f',
    });
};

export default {getEquipStatus, getEvaluate, getOwnEquipStatus, getUserInfo, getUsers};
