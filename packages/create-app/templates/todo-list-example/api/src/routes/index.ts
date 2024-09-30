import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import todoListRouter from './todo-list';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));
router.use('/todo-list', middlewares.session(), todoListRouter);

export default router;
