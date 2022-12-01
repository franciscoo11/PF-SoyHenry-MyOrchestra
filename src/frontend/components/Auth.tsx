import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

import {getUserEmail  } from "../utils/getUserEmail";
import Swal from "sweetalert2";

export default function Auth() {
  const { user, error, isLoading } = useUser();
  const cookie = new Cookies();
  cookie.set("Userlogin", user, { path: "/" });
  const [loging, setLoging] = useState();
  const { cookies }: any = cookie;

  useEffect(() => {
    getUserEmail(user);
    setLoging(cookie.get("Userlogin"));
  }, [cookies.Userlogin, user]);

  const handlelogout = () => {
    cookie.remove("Userlogin");
    cookie.remove("UserloginData");
    setLoging(cookie.get("Userlogin"));
  };
  if (loging === "undefined" || loging === undefined) {
    return <LoggedOut />;
  } else if (cookie.get("UserloginData")) {
    if (!cookie.get("UserloginData").is_active) {
      cookie.remove("Userlogin");
      cookie.remove("UserloginData");
      setLoging(cookie.get("Userlogin"));  
      Swal.fire({
        title: '<strong> <u>Estas Baneado</u></strong>',
        icon: 'error',
        allowOutsideClick:false,
        focusConfirm: true,
        timer:2500,
        confirmButtonText:
          '<a href="/bannedPage">Ok</a>',
      }).then(()=>{window.location.href="/bannedPage"})  
    }else if (cookie.get("UserloginData").first_time==true) {
      const emailUser=cookie.get("UserloginData").email
      Swal.fire({
        title: '<strong> <u>Aún no has completado tus datos</u></strong>',
        icon: 'info',
        timer:2500,
        allowOutsideClick:false,
        focusConfirm: true,
        confirmButtonText:
          `<a href="/users/${emailUser}/edit">Ok</a>`,
      }).then(()=>{window.location.href=`/users/${emailUser}/edit`}) 
      return <LoggedIn handlelogout={handlelogout} id={user?.email} />;
    }else{
      return <LoggedIn handlelogout={handlelogout} id={user?.email} />;
    }
  }else{
    return <LoggedIn handlelogout={handlelogout} id={user?.email} />;
  }
}
