import * as AWS from "aws-sdk";
import { S3SignedUrl } from "../common/types/backend";
import { AuthScope, config } from "../config";

/**
 * FileName can be either user-type/profile/id/name.png or user-type/profile/name.png
 */
const upload = async (
  { fileName, mime, userId }: { fileName: string; mime: string, userId: string },
  authScope: AuthScope,
): Promise<S3SignedUrl> => {
  const files = fileName.split("/");
  if (files.length !== 4 && files.length !== 3) {
    throw new Error(
      "Controller:S3::Please provide a correct filename e.g. 'user-type/profile/id/name.png'.",
    );
  }

  if (
    authScope.userId !== userId 
  ) {
    throw new Error(
      "Controller:User::Cannot access another users information.",
    );
  }

  try {
    const s3 = new AWS.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: "eu-west-1",
    });
    const s3Params = {
      Bucket: config.bucketName,
      Key: fileName,
      ContentType: mime,
      Expires: 10 * 60, // time to expire in seconds - 10 min
    };
    const signedUrl = s3.getSignedUrl("putObject", s3Params);

    const accessUrl = await access({ fileName }, authScope);
    if (!accessUrl) {
      throw new Error("Controller:S3::Please try again.");
    }

    return { signedUrl, accessUrl };
  } catch {}

  throw new Error("Controller:S3::Please talk to the network admin.");
};

const access = async (
  { fileName, expires }: { fileName: string; expires?: number },
  authScope: AuthScope,
): Promise<string | null> => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: "eu-west-1",
    });
    const s3Params = {
      Bucket: config.bucketName,
      Key: fileName,
      Expires: expires ? expires : 60 * 60, // time to expire in seconds - 60 min
    };
    return s3.getSignedUrl("getObject", s3Params);
  } catch {}
  return null;
};

const s3Controller = { upload, access };
export { s3Controller };
