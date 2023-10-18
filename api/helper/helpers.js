//find cloudinary public ID
export const cloudPublicId = (url) => {
  return url.split("/")[url.split("/").length - 1].split(".")[0];
};
