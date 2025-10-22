import { sessionMiddleware } from '@blocklet/sdk/lib/middlewares/session';
import { Router } from 'express';

import $get from './$get';
import $put from './$put';

const todoListRouter = Router();

// Step 2: the function of reading and writing DID Space is implemented
todoListRouter.get('/', sessionMiddleware(), $get);
todoListRouter.put('/', sessionMiddleware(), $put);

export default todoListRouter;
