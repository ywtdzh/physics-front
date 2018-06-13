export default {
    host: 'energy.oureda.cn',
    port: 80,
    staticPort: 80,
    protocol: 'http',
    server: function () {
        return `${this.protocol}://${this.host}:${this.port}`;
    },
    staticServer: function () {
        return `${this.protocol}://${this.host}:${this.staticPort}`;
    },
    defaultCode: "int onUpdate(int generator_i, int generator_u, int payload_i, int payload_u) {}",
};