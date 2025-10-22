const { sessionMiddleware } = require('@blocklet/sdk/lib/middlewares/session');
const router = require('express').Router();

router.use('/user', sessionMiddleware(), (req, res) => res.json(req.user || {}));

module.exports = router;
