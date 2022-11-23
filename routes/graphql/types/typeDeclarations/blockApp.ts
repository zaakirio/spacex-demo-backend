import { gql } from "apollo-server-express";

export const blockApp = gql`
  type BlockApp {
    title: String
    message: String
  }

  input BlockAppInput {
    buildVersion: String!
    deviceBrand: String!
    appType: String
  }
`;
