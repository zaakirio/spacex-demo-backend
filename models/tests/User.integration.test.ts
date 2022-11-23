import { db } from "../";
import { cleanDb } from "../../helpers/testFunctions";

describe("Models:User", () => {
  beforeEach(async () => {
    await cleanDb();
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  it("should require a type", async () => {
    let hasError = false;
    try {
      const user = await db.User.create({
        firstName: "test",
      });
      expect(user).toBeUndefined();
    } catch (error) {
      hasError = true;
    }
    expect(hasError).toBeTruthy();
  });
  it("should create a user", async () => {
    const user = await db.User.create({ firstName: "test" });
    expect(user.id).toBeDefined();
  });
});
