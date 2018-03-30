export default {
    host: '172.6.1.200',
    port: 9090,
    protocol: 'http',
    server: function () {
        return `${this.protocol}://${this.host}:${this.port}`
    },
};