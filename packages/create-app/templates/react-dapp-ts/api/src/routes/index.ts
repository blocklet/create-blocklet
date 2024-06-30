import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

export default router;
