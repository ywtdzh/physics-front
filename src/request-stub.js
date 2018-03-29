const getUserInfo = (type, callback) => {
    if (type === 'elder')
        callback({
            id: '1',
            type: 'elder',
            // device: '01',
        });
    else
        callback({
            id: '2',
            type: 'naive',
            device: '01',
        });
};

const getUsers = (callback) => {
    callback([
        {
            id: '2',
            type: 'naive',
            device: '01',
        },
        {
            id: '3',
            type: 'naive',
            device: '02',
        },
    ]);
};

const getEquipStatus = (callback) => {
    callback([
        {
            device: 1,
            msg: "compile_failed",
            detail: "",
            pwm: 10000,
            generator_i: 5000,
            generator_u: 5000,
            payload_i: 5000,
            payload_u: 5000,
        },
        {
            device: 2,
            msg: "compile_failed",
            detail: "",
            pwm: 10000,
            generator_i: 5000,
            generator_u: 5000,
            payload_i: 5000,
            payload_u: 5000,
        },
        {
            device: 3,
            msg: "compile_failed",
            detail: "",
            pwm: 10000,
            generator_i: 5000,
            generator_u: 5000,
            payload_i: 5000,
            payload_u: 5000,
        },
    ]);
};

const getOwnEquipStatus = (callback) => {
    callback({
        device: 1,
        msg: "compile_failed",
        detail: "",
        pwm: 10000,
        generator_i: 5000,
        generator_u: 5000,
        payload_i: 5000,
        payload_u: 5000,
    });
};

const getCode = (callback) => {
    callback({
        status: true,
        code: 'int main() {\nprintf("hello world");\n}\n',
    });
};

const getDownloadLink = (callback) => {
    callback({
        status: true,
        downloadLink: 'https://www.baidu.com',
    });
};

export default {getEquipStatus, getOwnEquipStatus, getUserInfo, getUsers, getCode};
