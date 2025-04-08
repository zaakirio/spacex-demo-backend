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
    body: JSON.stringify({ query: '{ ships { id name image class active } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  const missionName = ["Mars", "Moon", "Jupiter", "Saturn", "Uranus", "Neptune"];

  await Promise.all(
    ships.map((ship: any) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
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
