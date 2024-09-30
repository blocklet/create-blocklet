const middlewares = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

module.exports = router;
