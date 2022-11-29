import { Sequelize, Model, DataTypes, InferAttributes } from 'sequelize';
import { Address, AddressAttributes } from './Address';

type UserAttributes = InferAttributes<User>;

class User extends Model<UserAttributes> {
  declare id?: string;
  declare firstName?: string | null;
  declare contactNumber?: string;
  declare email?: string;
  declare profileImage?: string;
  declare addressId?: string;
  declare address?: AddressAttributes;

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
