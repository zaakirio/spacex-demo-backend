import { Sequelize, Model, DataTypes } from 'sequelize';

interface AddressAttributes {
  id?: string;
  address?: string | null;
  postcode?: string | null;
}

class Address extends Model<AddressAttributes> {
  static initModel(sequelize: Sequelize) {
    Address.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        address: { type: DataTypes.STRING, allowNull: true },
        postcode: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize,
      },
    );

    return Address;
  }
}

export { Address, AddressAttributes };
