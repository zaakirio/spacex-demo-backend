import { userController } from "../../../controllers/user";
import { GraphqlContext } from "../../../config";
import { UserAttributes } from "../../../models/User";
import {
  QueryUserArgs,
  MutationEditUserArgs,
  MutationRemoveCustomerArgs,
} from "../../../common/types/backend";

const user = async (
  rootValue,
  { input }: QueryUserArgs,
  context: GraphqlContext,
): Promise<UserAttributes> => {
  if (!input) {
    throw new Error("Resolver:User::Please provide an input.");
  }
  return await userController.get(input, context);
};

const editUser = async (
  rootValue,
  { input }: MutationEditUserArgs,
  context: GraphqlContext,
): Promise<UserAttributes> => {
  return await userController.edit(input, context);
};

// V3
const removeUser = async (
  rootValue,
  { input }: MutationRemoveCustomerArgs,
  context: GraphqlContext,
): Promise<boolean> => {
  return await userController.remove(input, context);
};

const query = {
  user,
};
const mutation = {
  editUser,
  removeUser,
};

const User = { query, mutation };
export { User };
