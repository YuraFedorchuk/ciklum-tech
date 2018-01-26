const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

const logger        = require('./core/logger');
const core          = require('./core/core');
const config        = require('./config');
const router        = require('./routes');
const middleware    = require('./middleware');


const PORT = process.env.PORT || config.defaultPort;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

app.use(bodyParser.json());

app.use(middleware.requestLogger);
app.use(router);
app.use(middleware.responseLogger);


app.listen(PORT, () => {
    logger.info(__filename, `Server running on ${PORT}`);
});