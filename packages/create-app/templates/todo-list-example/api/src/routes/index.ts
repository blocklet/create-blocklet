import { sessionMiddleware } from '@blocklet/sdk/lib/middlewares/session';
import { Router } from 'express';

import todoListRouter from './todo-list';

const router = Router();

router.use('/user', sessionMiddleware(), (req, res) => res.json(req.user || {}));
router.use('/todo-list', sessionMiddleware(), todoListRouter);

export default router;
