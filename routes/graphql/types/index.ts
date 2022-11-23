import { user } from "./typeDeclarations/user";
import { blockApp } from "./typeDeclarations/blockApp";
import { s3 } from "./typeDeclarations/s3";
import { pagination } from "./typeDeclarations/pagination";
import { date } from "./typeDeclarations/date";
import { queries, mutations } from "./resolvers";

export const typeDefs = [
  user,
  blockApp,
  s3,
  pagination,
  date,
  queries,
  mutations
];
