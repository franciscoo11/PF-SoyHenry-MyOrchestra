import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import {getUserEmail  } from "../utils/getUserEmail";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const { user, error, isLoading } = useUser();
  const cookie = new Cookies();
  cookie.set("Userlogin", user, { path: "/" })
  const [loging, setLoging] = useState();
  const { cookies }: any = cookie;
 

  useEffect(() => {
     getUserEmail(user)
    setLoging(cookie.get("Userlogin"));
    console.log(cookie.get("UserloginData"));
  }, [cookies.Userlogin,user]);


  
  const handlelogout = () => {
    cookie.remove("Userlogin");
    cookie.remove("UserloginData");
    setLoging(cookie.get("Userlogin"));   
  };
  if (loging === "undefined" || loging === undefined) {
    return <LoggedOut  />;
  
  } else if(cookie.get('UserloginData')){
    if (!cookie.get("UserloginData").is_active) {
      toast.error("Verifica e intenta nuevamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      cookie.remove("Userlogin");
      cookie.remove("UserloginData");
      setLoging(cookie.get("Userlogin"));  
      window.location.href='/bannedPage';
      <ToastContainer />
       
    }else{
      return <LoggedIn handlelogout={handlelogout} />;
    }
  }
}

