import { AuthScope } from '../config';
import { db } from '../models';
import { MissionAttributes } from '../models/mission';

const get = async ({ shipId }: { shipId: string }, authScope: AuthScope): Promise<MissionAttributes[]> => {
    const missions = await db.Mission.findAll({
        where: {
            shipId: shipId
        }
    });

    return missions;
};

const missionController = {
    get,
};
export { missionController };