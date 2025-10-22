const { sessionMiddleware } = require('@blocklet/sdk/lib/middlewares/session');
const router = require('express').Router();

router.use('/user', sessionMiddleware(), (req, res) => res.json(req.user || {}));

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

module.exports = router;
