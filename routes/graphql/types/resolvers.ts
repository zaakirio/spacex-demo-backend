import { gql } from 'graphql-tag';

const queries = gql`
  type Query {
    user(input: UserInput!): User!
    blockApp(input: BlockAppInput!): BlockApp!
    ships(input: ShipsInput!): [Ship!]
    shipsMissingAttributes(input: MissingAttributesInput!): [ShipMissingAttributes!]!
    missions(input: MissionsInput!): [Mission!]
    shipsWithMissions: [ShipWithMissions!]!
  }
`;

const mutations = gql`
  type Mutation {
    addUser: User
  }
`;

export { queries, mutations };
