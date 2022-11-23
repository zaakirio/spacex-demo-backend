import * as Sequelize from "sequelize";
import { config } from "../config";
import { initUser } from "./User";

if (process.env.NODE_ENV !== "production") {
  Sequelize.Promise.config({
    longStackTraces: true,
  });
}

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | Sequelize.DataTypeAbstract | Sequelize.DefineAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: "mysql",
  logging: false,
  operatorsAliases: false,
  pool: {
    acquire: 30000,
  },
});

const db = {
  sequelize,
  User: initUser(sequelize),
};

Object.keys(db)
  .map((key) => db[key])
  .forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  });

const sync = async (options?: { force?: boolean }) => {
  const force = (options && options.force) || false;
  if (force && config.nodeEnv === "production") {
    throw new Error("Models: Cannot force sync in a production environment");
  }
  try {
    await sequelize.sync({ force });
  } catch (error) {
    throw error;
  }
};

export { sync, db };
