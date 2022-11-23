import cloudinary from "../frontend/utils/cloudinaryConfig"
export const convertToCloudinaryUrl = async (url:any) => {
    const upImg = await cloudinary.uploader.upload(
        url, {
            upload_preset: 'orchestras-uploads',
            allowed_formats: ['png', 'jpg', 'jpeg', 'gif'],
        },
        (error:any) => {
            if(error) console.log(error)
        }
    )
    console.log(upImg.secure_url)

    return upImg.secure_url
}