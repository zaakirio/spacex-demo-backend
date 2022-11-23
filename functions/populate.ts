import { ensureEnvVars } from "../config";
import { populate } from "../helpers/populate";

exports.handler = async (event, context) => {
  if (new Date() < new Date("2022-11-23")) {
    throw new Error("You need to deploy the function again with a new date");
  }
  ensureEnvVars();
  try {
    await populate();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
