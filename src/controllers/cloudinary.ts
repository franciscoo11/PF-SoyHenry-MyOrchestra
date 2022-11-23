import cloudinary from "../frontend/utils/cloudinaryConfig";
export const convertToCloudinaryUrl = async (url:any) => {
    const options = {
        upload_preset: 'orquesta-net',
        allowed_formats: ['png', 'jpg', 'jpeg','gif'],
        folder:'orquesta-net/users',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
    const upImg = await cloudinary.uploader.upload(
        url, options,
        (error:any) => {
            if(error) return error
        }
    )
    return upImg.secure_url
}
