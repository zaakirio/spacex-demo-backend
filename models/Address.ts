import { Sequelize, Model, DataTypes, InferAttributes } from 'sequelize';

type AddressAttributes = InferAttributes<Address>;

class Address extends Model<AddressAttributes> {
  declare id?: string;
  declare address?: string | null;
  declare postcode?: string | null;

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
