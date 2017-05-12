const
    express = require('express'),
    path = require('path'),
    config = require('./config'),
    OnMangeOu = require('./OnMangeOu')
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

    const omo = new OnMangeOu();
    omo.search(req.query.location, (data, errorMsg) => {
        if (errorMsg) {
            res.json({result: 'ko', reason: errorMsg});
        } else {
            res.json({result: 'ok', data: data});
        }
    });
});

app.listen(config.port, config.host, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://' + config.host + ':' + config.port);
});
