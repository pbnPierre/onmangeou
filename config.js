const secret = require('./secret.js');

module.exports = {
    server: {
        host: 'localhost',
        port: 1337
    },
    api: {
        key: secret.api.key,
        baseUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    }
};
