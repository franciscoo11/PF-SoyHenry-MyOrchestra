import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import {getUserEmail  } from "../utils/getUserEmail";

export default function Auth() {
  const { user, error, isLoading } = useUser();
  const cookie = new Cookies();
  cookie.set("Userlogin", user, { path: "/" })
  const [loging, setLoging] = useState();
  const { cookies }: any = cookie;
 

  useEffect(() => {
    getUserEmail(user)
    setLoging(cookie.get("Userlogin"));
  }, [cookies.Userlogin,user]);

  console.log();
  
  const handlelogout = () => {
    cookie.remove("Userlogin");
    cookie.remove("UserloginData");
    setLoging(cookie.get("Userlogin"));   
  };
  if (loging === "undefined" || loging === undefined) {
    return <LoggedOut  />;
  } else {
    return <LoggedIn handlelogout={handlelogout} />;
  }
}
