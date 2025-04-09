import { gql } from 'graphql-tag';

const ShipWithMissions = gql`
  type ShipWithMissions {
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
    missionCount: Int!
    missionNames: [String!]!
  }
`;

export { ShipWithMissions }; 