import { queries, mutations } from './resolvers';
import { User } from './typeDeclarations/user';
import { blockApp } from './typeDeclarations/blockApp';
import { Pagination } from './typeDeclarations/pagination';
import { date } from './typeDeclarations/date';

export const typeDefs = [mutations, queries, date, User, Pagination, blockApp];
