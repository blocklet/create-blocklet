const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

module.exports = router;
