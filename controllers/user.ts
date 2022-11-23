import { AuthScope } from "../config";
import { UserAttributes } from "../models/User";
import { db } from "../models";
import { Op } from "sequelize";
import { emailController } from "./email";
import { imageController } from "./image";

const get = async (
  {
    userId,
  }: {
    userId: string;
  },
  authScope: AuthScope,
): Promise<UserAttributes> => {
  if (
    authScope.userId !== userId 
  ) {
    throw new Error(
      "Controller:User::Cannot access another users information.",
    );
  }

  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error("Controller:User::Could not find user");
  }


  return await imageController.refactorUser({ user }, authScope);
};

const edit = async (
  {
    id,
    firstName,
    email,
    profileImage,
  }: {
    id: string;
    firstName?: string | null;
    email?: string | null;
    profileImage?: string | null;
  },
  authScope: AuthScope,
): Promise<UserAttributes> => {
  if (
    authScope.userId !== id 
  ) {
    throw new Error(
      "Controller:User::Cannot access another users information.",
    );
  }

  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error("Controller:User::Could not find user");
  }

  if (email && !emailController.isValid({ email })) {
    throw new Error("Controller:User::Please send a valid email address.");
  }

  const editUser = await db.User.update(
    {
      firstName: firstName ?? undefined,
      email: email ? email : undefined,
      profileImage: profileImage ?? undefined,
    },
    { where: { id: { [Op.eq]: user.id } } },
  );
  if (!editUser) {
    throw new Error("Controller:User::Could not update user.");
  }

  const dbUser = await get({ userId: id }, authScope);
  if (!dbUser) {
    throw new Error("Controller:User::Could not get user.");
  }

  return await imageController.refactorUser(
    { user: dbUser },
    authScope,
  );
};

const remove = async (
  {
    userId,
  }: {
    userId: string;
  },
  authScope: AuthScope,
): Promise<boolean> => {
  if (
    authScope.userId !== userId 
  ) {
    throw new Error(
      "Controller:User::Cannot access another users information.",
    );
  }

  const user = await db.User.findByPk(userId);

  if (!user) {
    throw new Error("Controller:User::Could not find user.");
  }

  const destroyUser = await db.User.destroy({
    where: { id: { [Op.eq]: user.id } },
  });
  if (!destroyUser) {
    throw new Error(
      "Controller:User::Could not delete user, please try again.",
    );
  }

  return true;
};

const userController = {
  get,
  edit,
  remove
};
export { userController };
