import cloudinary from "../frontend/utils/cloudinaryConfig";
export const convertToCloudinaryUrlUser = async (url:any,email:any) => {
    let jeje='colombia-sonido'
    const options = {
        upload_preset: 'orquesta-net',
        allowed_formats: ['png', 'jpg', 'jpeg','gif'],
        folder:`orquesta-net/orchestras/${email}`,
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

export const convertToCloudinaryUrlOrchestras = async (url:any) => {
    let jeje='colombia-sonido'
    const options = {
        upload_preset: 'orquesta-net',
        allowed_formats: ['png', 'jpg', 'jpeg','gif'],
        folder:`orquesta-net/orchestras/${jeje}`,
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

