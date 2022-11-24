import axios from "axios";
import Cookies from "universal-cookie";

export const getUserEmail=async (user:any)=>{ 
    const cookie = new Cookies();
    if(user?.email_verified){   
      await  axios.post(`http://localhost:3000/api/user?isGmail=${user?.email_verified}`,{
        email:user?.email,
        name: user?.name,
        avatar: user?.picture
    }).then(
        (response)=>{
            cookie.set("UserloginData", response.data, { path: "/" })
        }
        )
    
}else if(user?.email){

    await  axios.get(`http://localhost:3000/api/user/${user?.email}`)
    .then(
        (response)=>{
            cookie.set("UserloginData", response.data, { path: "/" })
        }
        )      
}
}

