import { gql } from "apollo-server-express";

export const user = gql`
  type User {
    id: ID!
    firstName: String
    profileImage: String
    contactNumber: String
    email: String
    phoneVerification: String
  }

  input UserInput {
    customerId: String!
  }

  input EditUserInput {
    id: String!
    firstName: String
    email: String
    
    "user/profile/{id}/{filename}"
    profileImage: String
  }

  input RemoveUserInput {
    id: String!
  }
`;
