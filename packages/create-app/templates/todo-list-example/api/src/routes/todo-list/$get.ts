import { GetObjectCommand, SpaceClient } from '@did-space/client';
import { streamToString } from '@did-space/core';
import type { Request, Response } from 'express';

import { authService, wallet } from '../../libs/auth';

export default async function $get(req: Request, res: Response) {
  const { user } = await authService.getUser(req.user?.did as string);
  if (!user?.didSpace?.endpoint) {
    return res.status(404).send('DID Spaces endpoint does not exist. Log in again to complete the authorization');
  }

  const spaceClient = new SpaceClient({
    wallet,
    // @ts-ignore
    endpoint: user.didSpace.endpoint,
  });

  const output = await spaceClient.send(
    new GetObjectCommand({
      key: 'todo-list.json',
    }),
  );

  if (output.statusCode === 200) {
    return res.json({ todoList: JSON.parse(await streamToString(output.data)) });
  }

  if (output.statusCode === 404) {
    return res.json({ todoList: [] });
  }

  return res.status(output.statusCode).send(output.statusMessage);
}
