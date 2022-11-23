if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
import { db } from "../models";
import * as faker from "faker";


const populate = async () => {
  for(let count = 0; count<=50; count++){
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    await db.User.create({
      firstName: `${firstName} ${lastName}`,
      contactNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(firstName, lastName),
    });

  }
  
  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
