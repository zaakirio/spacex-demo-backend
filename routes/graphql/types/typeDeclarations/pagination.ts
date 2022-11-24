import { gql } from "apollo-server-express";

export const Pagination = gql`
  input PaginationInput {
    limit: Int!
    offset: Int!
  }
`;
