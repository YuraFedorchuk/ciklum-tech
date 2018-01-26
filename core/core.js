const api           = require('./../api');
const logger        = require('./logger');
const processFatal  = require('./fatalHandler');

try {
    api.processExpired()
        .then()
        .catch(err => {
            throw err;
        }); 
} catch(err) {
    logger.error(__filename, 'expired messages processing error', err);
}

process.on('uncaughtException', processFatal);