import { QueryShipsArgs, QueryShipsMissingAttributesArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/ship';
import { sequelize } from '../../../models';

const ships = async (rootValue, { input }: QueryShipsArgs, context: GraphqlContext): Promise<ShipAttributes[]> => {
  return shipController.get(input, context);
};

const shipsMissingAttributes = async (
  rootValue,
  { input }: QueryShipsMissingAttributesArgs,
  context: GraphqlContext
): Promise<Array<{ shipId: string; missingCount: number }>> => {
  const { attributes } = input;

  // Get all ships with default pagination
  const ships = await shipController.get({
    pagination: {
      limit: 1000, // Set a high limit to get all ships
      offset: 0
    }
  }, context);

  // For each ship, count missing attributes
  return ships.map(ship => {
    const missingCount = attributes.reduce((count, attr) => {
      // Check if the attribute exists and is not null/undefined
      const value = ship[attr as keyof ShipAttributes];
      return count + (value === null || value === undefined ? 1 : 0);
    }, 0);

    return {
      shipId: ship.id,
      missingCount
    };
  });
};

const shipsWithMissions = async (): Promise<Array<{
  id: string;
  name: string | null;
  type: string | null;
  class: string | null;
  active: boolean;
  home_port: string | null;
  year_built: number | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  missionCount: number;
  missionNames: string[];
}>> => {
  const [results] = await sequelize.query(`
        SELECT 
            s.id,
            s.name,
            s.type,
            s.class,
            s.active,
            s.home_port,
            s.year_built,
            s.image,
            s.createdAt,
            s.updatedAt,
            COUNT(m.id) as mission_count,
            GROUP_CONCAT(m.name) as mission_names
        FROM 
            ships s
        LEFT JOIN 
            missions m ON s.id = m.shipId
        GROUP BY 
            s.id, s.name, s.type, s.class, s.active, s.home_port, s.year_built, s.image, s.createdAt, s.updatedAt
        ORDER BY 
            mission_count DESC;
    `);

  return (results as any[]).map(row => ({
    id: row.id,
    name: row.name,
    type: row.type,
    class: row.class,
    active: row.active,
    home_port: row.home_port,
    year_built: row.year_built,
    image: row.image,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    missionCount: row.mission_count,
    missionNames: row.mission_names ? row.mission_names.split(',') : []
  }));
};

// const addShip = async (rootValue, _, context: GraphqlContext): Promise<ShipAttributes | null> => {
//   return null;
// };

const query = { ships, shipsMissingAttributes, shipsWithMissions };

const mutation = {};

const Ship = { query, mutation };
export { Ship };
