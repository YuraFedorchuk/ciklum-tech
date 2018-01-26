'use strict';

const client    = require('./redisClient');
const logger    = require('./logger');

module.exports = err => {
    logger.error(__filename, 'fatal error', err);
    client.quit();
    logger.info(__filename, 'process exited with status 1');    
    process.exit(1);
};