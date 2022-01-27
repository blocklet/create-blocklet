const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const env = require('../libs/env');

router.use('/env', (req, res) => res.json(env));
router.use('/user', middleware.user(), (req, res) => res.json(req.user));

module.exports = router;
