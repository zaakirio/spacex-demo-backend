import { gql } from "apollo-server-express";

export const pagination = gql`
  input PaginationInput {
    limit: Int!
    offset: Int!
  }
`;
