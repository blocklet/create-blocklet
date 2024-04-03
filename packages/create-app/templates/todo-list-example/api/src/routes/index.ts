import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import todoListRouter from './todo-list';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/todo-list', middleware.user(), todoListRouter);

export default router;
