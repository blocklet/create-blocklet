import { PutObjectCommand, SpaceClient } from '@did-space/client';
import type { Request, Response } from 'express';
import isArray from 'lodash/isArray';
import { authService, wallet } from '../../libs/auth';

export default async function $put(req: Request, res: Response) {
  if (!isArray(req.body.todoList)) {
    throw new Error('TodoList must be an array');
  }

  const { user } = await authService.getUser(req.user?.did as string);
  if (!user?.didSpace?.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({
    wallet,
    // @ts-ignore
    endpoint: user.didSpace.endpoint,
  });
  await spaceClient.send(
    new PutObjectCommand({
      key: 'todo-list.json',
      data: JSON.stringify(req.body.todoList),
    })
  );

  return res.send();
}
