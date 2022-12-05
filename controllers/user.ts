import { AuthScope } from '../config';
import { db } from '../models';
import { User } from '../models/User';

const get = async ({ userId }: { userId: string }, authScope: AuthScope): Promise<User> => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('Controller:User::Could not find user.');
  }

  return user;
};

const fromAuth = async (authScope: AuthScope): Promise<User | undefined> => {
  if (!authScope.userId) {
    return undefined;
  }

  const [userInstance] = await db.User.findOrCreate({
    where: { id: authScope.userId },
  });

  return userInstance;
};

const userController = {
  get,
  fromAuth,
};
export { userController };
