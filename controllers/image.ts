import { AuthScope } from "../config";
import { UserAttributes } from "../models/User";
import { s3Controller } from "./s3";

const refactorImage = async (
  {
    image,
    expires,
  }: {
    image?: string;
    expires?: number;
  },
  authScope: AuthScope,
): Promise<string | undefined> => {
  if (image && !image.includes("http")) {
    return (
      (await s3Controller.access({ fileName: image, expires }, authScope)) ||
      image
    );
  }
  return image;
};

const refactorUser = async (
  {
    user,
  }: {
    user: UserAttributes;
  },
  authScope: AuthScope,
): Promise<UserAttributes> => {
  if (user.profileImage) {
    user.profileImage = await refactorImage(
      { image: user.profileImage, expires: 86400 },
      authScope,
    );
  }

  return user;
};


const imageController = {
  refactorUser,
  refactorImage,
};
export { imageController };
