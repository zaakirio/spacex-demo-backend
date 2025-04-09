import { gql } from 'graphql-tag';

const Mission = gql`
  type Mission {
    id: ID!
    name: String!
    shipId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input MissionsInput {
    id: ID
    name: String
    shipId: ID
  }
`;

export { Mission }; 