import { User } from './user';
import { BlockApp } from './blockApp';

const resolvers = {
  Query: {
    ...User.query,
    ...BlockApp.query,
  },
  Mutation: {
    ...User.mutation,
    ...BlockApp.mutation,
  },
};

export { resolvers };
