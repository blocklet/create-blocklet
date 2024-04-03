import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import $get from './$get';
import $put from './$put';

const todoListRouter = Router();

// Step 2: the function of reading and writing DID Space is implemented
todoListRouter.get('/', middleware.user(), $get);
todoListRouter.put('/', middleware.user(), $put);

export default todoListRouter;
