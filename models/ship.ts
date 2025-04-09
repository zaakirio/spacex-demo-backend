import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

type OmitTypes = '';

class Ship extends Model<
  InferAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare class?: string | null;
  declare type?: string | null;
  declare name?: string | null;
  declare image?: string | null;
  declare active: boolean;
  declare home_port?: string | null;
  declare year_built?: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Ship.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        class: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        home_port: { type: DataTypes.STRING, allowNull: true },
        year_built: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Ship;
  }
  // public static associate = ({  }) => {
  // };
}

export { Ship, Ship as ShipAttributes };
