const
    express = require('express'),
    https = require('https'),
    querystring = require('querystring'),
    path = require('path'),
    config = require('./config.js')
;

const app = express();
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/search', (req, res) => {
    if (!req.query.location) {
        res.json({result: 'ko', reason: 'missing [location] parameter'})
        return;
    }

    let params = {
        location: req.query.location,
        radius: req.query.radius || 300,
        type: req.query.type || 'restaurant',
        opennow: true,
        key: config.apis.place.key
    };
    if (req.query.pagetoken) {
        params.pagetoken = req.query.pagetoken;
    }

    const url = config.apis.place.baseUrl + '?' + querystring.stringify(params);
    https.get(url, (httpsRes) => {
        if (httpsRes.statusCode !== 200) {
            res.json({result: 'ko', reason: 'bad status code received from api'})
            return;
        }

        let rawData = '';
        httpsRes.on('data', (chunk) => rawData += chunk);
        httpsRes.on('end', () => {
            const json = JSON.parse(rawData);
            res.json({result: 'ok', data: json});
        });
    });
});

app.get('/image', (req, res) => {
    if (!req.query.location) {
        res.json({result: 'ko', reason: 'missing [location] parameter'})
        return;
    }

    let params = {
        size: '200x200',
        location: req.query.location,
        key: config.apis.streetview.key
    };

    const url = config.apis.streetview.baseUrl + '?' + querystring.stringify(params);
    https.get(url, (httpsRes) => {
        if (httpsRes.statusCode !== 200) {
            res.json({result: 'ko', reason: 'bad status code received from api'})
            return;
        }

        let rawData = Buffer.alloc(0);
        httpsRes.on('data', (chunk) => rawData = Buffer.concat([rawData, Buffer.from(chunk)]));
        httpsRes.on('end', () => {
            res.json({result: 'ok', image: rawData.toString('base64')});
        });
    });
});

app.listen(config.port, config.host, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://' + config.host + ':' + config.port);
});
