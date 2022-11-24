import cloudinary from "../frontend/utils/cloudinaryConfig";
export const convertToCloudinaryUrlUser = async (
  url: any,
  email: any,
  folder: any
) => {
  const options = {
    upload_preset: "orquesta-net",
    allowed_formats: ["png", "jpg", "jpeg", "gif"],
    folder: `orquesta-net/users/${email}/${folder}`,
    use_filename: false,
    unique_filename: false,
    overwrite: true,
    public_id: `${email}-${folder}`,
  };
  const upImg = await cloudinary.uploader.upload(url, options, (error: any) => {
    if (error) return error;
  });
  return upImg.secure_url;
};

export const convertToCloudinaryUrlOrchestras = async (
  url: any,
  name: any,
  folder: any
) => {
  const options = {
    upload_preset: "orquesta-net",
    allowed_formats: ["png", "jpg", "jpeg", "gif"],
    folder: `orquesta-net/orchestras/${name}/${folder}`,
    use_filename: false,
    unique_filename: false,
    overwrite: true,
    public_id: `${name}-${folder}`,
  };
  const upImg = await cloudinary.uploader.upload(url, options, (error: any) => {
    if (error) return error;
  });
  return upImg.secure_url;
};

