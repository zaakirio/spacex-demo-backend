import { GraphqlContext } from "../../../config";
import { umzug } from "../../../migrate";


const dbUp = async (rootValue, context: GraphqlContext): Promise<boolean> => {

  await umzug.up();
  return true;
};


const query = { dbUp };
const mutation = {  };

const Admin = { query, mutation };
export { Admin };
