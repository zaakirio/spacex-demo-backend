import { Sequelize, Model, DataTypes } from 'sequelize';
import { Address, AddressAttributes } from './Address';

interface UserAttributes {
  id?: string;
  firstName?: string | null;
  contactNumber?: string;
  email?: string;
  profileImage?: string;
  addressId?: string;
  address?: AddressAttributes;
}

class User extends Model<UserAttributes> {
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        firstName: { type: DataTypes.STRING, allowNull: true },
        contactNumber: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        profileImage: { type: DataTypes.STRING, allowNull: true },
        addressId: { type: DataTypes.UUID, allowNull: false },
      },
      {
        sequelize,
      },
    );

    User.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });
    return User;
  }
}

export { User, UserAttributes };
