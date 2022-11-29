import { queries, mutations } from './resolvers';
import { User } from './declarations/user';
import { blockApp } from './declarations/blockApp';
import { Pagination } from './declarations/pagination';
import { date } from './declarations/date';

export const typeDefs = [mutations, queries, date, User, Pagination, blockApp];
