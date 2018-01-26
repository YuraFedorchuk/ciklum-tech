const redis         = require('redis');
const config        = require('./../config').redis;
const processFatal  = require('./fatalHandler');
const logger        = require('./logger');

const client = redis.createClient({
    host: config.host,
    port: config.port
});

client.on('error', processFatal);

client.on('end', () => {
    logger.info(__filename, 'redis client disconnected');
});

module.exports = client;