const router = require('express').Router();
const env = require('../libs/env');

router.use('/', (req, res) => res.json(env));

module.exports = router;
