import Link from "next/link";
// import { FiUser } from "react-icons/fi";
import styled from "styled-components";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import {getUserEmail  } from "../utils/getUserEmail";

const StyledDiv = styled.div`
  .log {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export default function Banned() {
  const { user, error, isLoading } = useUser();
  const cookie = new Cookies();
  cookie.set("Userlogin", user, { path: "/" })
  const [loging, setLoging] = useState();
  
  const handlelogout = () => {
    cookie.remove("Userlogin");
    cookie.remove("UserloginData");
    setLoging(cookie.get("Userlogin"));   
  };
  return (
    <>
      <StyledDiv>
        <div>
          <p>Temporalmente restringido del sitio.</p>
        </div>
        <Link onClick={handlelogout} href="/api/auth/logout" className="log">
          Cerrar sesión
        </Link>
      </StyledDiv>
    </>
  );
}
