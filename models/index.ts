import * as Sequelize from 'sequelize';
import { config } from '../config';
import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
import { initUser } from './User';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
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
  .map(key => db[key])
  .forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  });

const sync = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    throw error;
  }
};

export { sync, db };
