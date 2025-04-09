import { QueryMissionsArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { missionController } from '../../../controllers';
import { MissionAttributes } from '../../../models/mission';

const missions = async (rootValue, { input }: QueryMissionsArgs, context: GraphqlContext): Promise<MissionAttributes[]> => {
    return missionController.get(input, context);
};

const query = { missions };

const mutation = {};

const Mission = { query, mutation };
export { Mission };