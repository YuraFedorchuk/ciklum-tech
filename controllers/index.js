'use strict';

const api    = require('./../api');
const logger = require('./../core/logger');

module.exports = {
    echoAtTime: (req, res) => {
        api.echoAtTime(req.body.message, req.body.date)
            .then(message => {
                res.status(200).end(message);
            })
            .catch(err => {
                logger.error(__filename, 'Api error', err);

                res.status(400).end(err.message);
            });
    }
}