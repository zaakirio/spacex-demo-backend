if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';

const populate = async () => {
  await cleanDb();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image class active home_port year_built type } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  const missionName = ["Ceres", "Pallas", "Vesta", "Astraea", "Juno", "Diana", "Hygiea", "Eunomia", "Psyche", "Euphrosyne", "Damocloid", "Centaur", "Dioretsa"];

  await Promise.all(
    ships.map((ship: any) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
        home_port: ship.home_port,
        year_built: ship.year_built,
        type: ship.type
      });
    })
  );

  const getShips = await db.Ship.findAll();


  await Promise.all(
    missionName.map((missionName: string) => {
      return db.Mission.create({
        name: missionName,
        shipId: getShips[Math.floor(Math.random() * getShips.length)].id,
      });
    })
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
