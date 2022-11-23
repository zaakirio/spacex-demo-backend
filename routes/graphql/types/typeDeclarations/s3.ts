import { gql } from "apollo-server-express";

export const s3 = gql`
  type S3SignedUrl {
    signedUrl: String!
    accessUrl: String!
  }

  input UploadS3SignedUrlInput {
    fileName: String!
    mime: String!
  }
`;
