import { gql } from "apollo-server-express";

const queries = gql`
  type Query {
    dbUp: Boolean!
    blockApp(input: BlockAppInput!): BlockApp!
    user(input: UserInput!): User!
  }
`;

const mutations = gql`
  type Mutation {
    editUser(input: EditUserInput!): User!
    removeUser(input: RemoveUserInput!): User!
    uploadS3SignedUrl(input: UploadS3SignedUrlInput!): S3SignedUrl!
  }
`;

export { queries, mutations };
