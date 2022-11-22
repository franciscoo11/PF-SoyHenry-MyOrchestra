import { prisma } from "../../lib/prisma";
import axios from "axios";
import { useState } from "react";
// import cloudinary from "../frontend/utils/cloudinary";

// export const cloudinaryImage = async(url:any)=>{
//     const sendImage = await cloudinary.uploader.upload(url,{
//         allowed_formats:['png','jpg','jpeg','gift']
//     })
//     return sendImage;
// }


export const postImageCloudinary =  (file0:any)=>{
    try {
        const formData = new FormData();
        const [url,setUrl]= useState();
        formData.append("file", file0);
        formData.append("upload_preset", "orchestras-uploads");
        axios('https://api.cloudinary.com/v1_1/orchestrascloudinary/image/upload',{
            method: 'POST',
            data:formData
        }).then((response)=>setUrl(response.data.secure_url))
       
       return url
    } catch (error) {
        return 'controller cloudinary'
    }
    }