import { Sequelize, Model, DataTypes } from 'sequelize';

interface UserAttributes {
  id?: string;
  firstName?: string | null;
  contactNumber?: string;
  email?: string;
  profileImage?: string;
}

class User extends Model<UserAttributes, UserAttributes> implements UserAttributes {
  id?: string;
  firstName?: string | null;
  contactNumber?: string;
  email?: string;
  profileImage?: string;

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
      },
      {
        sequelize,
        tableName: 'User',
        timestamps: false,
      },
    );
    return User;
  }
}

export { User, UserAttributes };
