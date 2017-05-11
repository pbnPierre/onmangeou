const secret = require('./secret');
const globalConfig = require('../global-config');

module.exports = {
    host: globalConfig.host,
    port: globalConfig.port,

    apis: {
        place: {
            key: secret.keys.place,
            baseUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
        },
        streetview: {
            key: secret.keys.streetview,
            baseUrl: 'https://maps.googleapis.com/maps/api/streetview'
        }
    }
};
