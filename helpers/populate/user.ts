import { db } from '../../models';
import { User } from '../../models/User';

const createUser = async (args?: User): Promise<User> => {
  return db.User.create({
    ...args,
  });
};

export { createUser };
