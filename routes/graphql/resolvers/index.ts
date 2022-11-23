import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { User } from "./user";
import { BlockApp } from "./blockApp";
import { S3 } from "./s3";
import { Admin } from './admin';

const Date = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

const resolvers = {
  Query: {
    ...User.query,
    ...BlockApp.query,
    ...S3.query,
   ...Admin.query,
  },
  Mutation: {
    ...User.mutation,
    ...BlockApp.mutation,
    ...S3.mutation,
    ...Admin.mutation,
  },
  Date,
};

export { resolvers };
