import { s3Controller } from "../../../controllers/s3";
import {
  MutationUploadS3SignedUrlArgs,
  S3SignedUrl,
} from "../../../common/types/backend";
import { GraphqlContext } from "../../../config";

// V3
const uploadS3SignedUrl = async (
  rootValue,
  { input }: MutationUploadS3SignedUrlArgs,
  context: GraphqlContext,
): Promise<S3SignedUrl> => {
  return s3Controller.upload(input, context);
};

const query = {};

const mutation = {
  uploadS3SignedUrl,
};

const S3 = { query, mutation };
export { S3 };
