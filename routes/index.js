const express = require('express');
const router = express.Router();

const ctrl = require('./../controllers');

router.post('/echoAtTime', ctrl.echoAtTime)

module.exports = router;