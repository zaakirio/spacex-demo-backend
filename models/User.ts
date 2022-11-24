import * as Sequelize from 'sequelize';

interface UserAttributes {
  id?: string;
  firstName?: string | null;
  contactNumber?: string;
  email?: string;
  profileImage?: string;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

const initUser = (sequelize: Sequelize.Sequelize): UserModel => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: { type: Sequelize.STRING, allowNull: true },
    contactNumber: { type: Sequelize.STRING, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: true },
    profileImage: { type: Sequelize.STRING, allowNull: true },
  };
  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
};

export { initUser, UserAttributes, UserInstance, UserModel };
