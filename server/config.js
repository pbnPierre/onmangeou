const secret = require('./secret.js');

module.exports = {
    server: {
        host: 'localhost',
        port: 1337
    },
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
