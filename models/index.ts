import { Sequelize } from 'sequelize';
import { config } from '../config';
import { DataTypeAbstract, ModelAttributeColumnOptions } from 'sequelize';
import { User } from './User';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
  logging: false,
  pool: {
    acquire: 30000,
  },
});

const db = {
  sequelize,
  User: User.initModel(sequelize),
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

export { sync, db, sequelize };
