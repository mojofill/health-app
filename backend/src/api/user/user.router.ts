import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import User from '../../entities/User.entity';
import UserInformation from '../../entities/UserInformation.entity';
import { UserInformationWebJson } from '../../entities/UserInformation.entity';

const UserRouter = Router();

UserRouter.use(authenticate);

UserRouter.get('/isAuthenticated', async (req, res) => {
  res.status(200).end();
});

export const getUserById = async (id: number, scope: string[] = []) => {
  return User.findOne({
    where: {
      id,
    },
    relations: scope,
  });
};

UserRouter.get('/me', async (req, res) => {
  const scope = (req.query.scope as string) ?? '';
  const user = await getUserById(
    req.userId,
    scope.split(',').filter((e) => e !== '')
  );

  console.log(user);

  if (!user) return res.status(404).send({ error: 'Invalid user' }).end();

  res.send(user.toWebJson());
});

UserRouter.get('/userinfo', async (req, res) => {
  const user = await getUserById(req.userId, ['userInformation']);

  if (!user) return res.status(404).send({ error: 'Invalid user' }).end();

  res.status(200).send(user.userInformation.toWebJson());
});

UserRouter.post('/updateUser', async (req, res) => {
  const user = await getUserById(req.userId, ['userInformation']);
  const updates: UserInformationWebJson = req.body.updates ?? {};

  if (!user) return res.status(404).send({ error: 'Invalid user' }).end();

  const info = await UserInformation.findOne({
    where: {
      id: user?.userInformation.id,
    },
  });

  if (!info) return res.status(404).send({ error: 'Invalid user information' }).end();

  for (const k of Object.keys(updates)) {
    const key = k as keyof UserInformationWebJson;
    if (!(key in info)) continue;
    const v = updates[key];
    // @ts-ignore
    info[key] = updates[key];
  }

  user.isSetUp = true;

  await info.save();
  await user.save();

  res.status(200).end();
});

export default UserRouter;
