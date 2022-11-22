import { prisma } from "../../lib/prisma";
import axios from "axios";
// import cloudinary from "../frontend/utils/cloudinary";

// export const cloudinaryImage = async(url:any)=>{
//     const sendImage = await cloudinary.uploader.upload(url,{
//         allowed_formats:['png','jpg','jpeg','gift']
//     })
//     return sendImage;
// }


export const postImageCloudinary= async (file0:any)=>{
try {
    const file = new FormData();
file.append("file", file0);
file.append("upload_preset", "orchestras-uploads");
    const data = await axios('https://api.cloudinary.com/v1_1/orchestrascloudinary/image/upload',{
        method: 'POST',
        data:file
    })
    
   return data.data.secure_url
} catch (error) {
    return 'errocito'
}
}