import { gql } from 'graphql-tag';

const Ship = gql`
  type Ship {
    id: ID!
    name: String
    image: String
    class: String
    type: String
    active: Boolean!
    home_port: String
    year_built: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type ShipMissingAttributes {
    shipId: ID!
    missingCount: Int!
  }

  input ShipsInput {
    id: ID
    name: String
    class: String
    type: String
    active: Boolean
    home_port: String
    year_built: Int
    pagination: PaginationInput!
  }

  input MissingAttributesInput {
    attributes: [String!]!
  }

  extend type Query {
    shipsMissingAttributes(input: MissingAttributesInput!): [ShipMissingAttributes!]!
  }
`;

export { Ship };

