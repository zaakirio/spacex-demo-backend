import * as supertest from "supertest";
import { db } from "../models";
import { UserAttributes, UserInstance } from "../models/User";

const cleanDb = async () => {
  await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
  await db.sequelize.drop();
  await db.sequelize.sync();
  await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
};

const createDummyUser = async (
  args?: UserAttributes,
): Promise<UserInstance> => {
  const user = await db.User.create({
    firstName: "test",
    ...args,
  });
  return user;
};

const checkUser = ({
  source,
  target,
}: {
  source: UserInstance;
  target?: UserAttributes;
}) => {
  expect(source).toHaveProperty("id");
  expect(source).toHaveProperty("contactNumber");
  expect(source).toHaveProperty("firstName");
  expect(source).toHaveProperty("email");

  if (target) {
    expect(source).toMatchObject({
      firstName: target.firstName,
      contactNumber: target.contactNumber || null,
      email: target.email || null,
      profileImage: target.profileImage || null,
    });
  }
};

const checkApolloResponse = (response: supertest.Response) => {
  try {
    expect(response.error).toBe(false);
    expect(response.body.errors).toBeUndefined();
  } catch (error) {
    console.error(JSON.stringify(response.body.errors, null, 2));
    console.error(JSON.stringify(response.error, null, 2));
    throw error;
  }
};

export {
  cleanDb,
  createDummyUser,
  checkUser,
  checkApolloResponse
};
