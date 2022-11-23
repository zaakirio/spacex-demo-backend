import * as supertest from "supertest";
import { db } from "../../../../../models";
import { createApp } from "../../../../../app";
import {
  cleanDb,
  createDummyUser,
  checkUser,
} from "../../../../../helpers/testFunctions";
import * as faker from "faker";

describe("Resolvers:User:Integration:", () => {
  let agent: supertest.SuperTest<supertest.Test>;
  beforeEach(async () => {
    await cleanDb();
    const app = await createApp();
    agent = supertest(app);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it("Create user", async () => {
    const contactNumber = faker.phone.phoneNumber();
    const user = await createDummyUser({contactNumber});
    checkUser({source: user});
    
  });
  
});
