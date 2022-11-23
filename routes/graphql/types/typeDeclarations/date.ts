import { gql } from "apollo-server-express";

const date = gql`
  scalar Date
`;

export { date };
