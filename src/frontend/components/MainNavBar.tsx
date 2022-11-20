import SearchBar from "./SearchBar";
import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend/use-user";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const NavStyle = styled.header`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  .nav-container {
    grid-column: 1/17;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
    align-items: baseline;

    nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      gap: 24px;
    }
    .links-container {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 24px;
    }
    img {
      margin-right: 5px;
    }
    a {
      &:hover,
      :focus,
      :active {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

export default function MainNavBar(props: any) {

  const { user, error, isLoading } = useUser()
  const cookie = new Cookies;
  cookie.set ("Userlogin",user,{path:"/"})
  const [loging,setLoging]=useState();
  const {cookies}:any=cookie

  useEffect(()=>{
    setLoging(cookie.get("Userlogin"))
  },[cookies.Userlogin])
 
  const handlelogout =()=>{
    cookie.remove("Userlogin")
    setLoging(cookie.get("Userlogin")) 
  }

  return (
    <NavStyle>
      <div className="nav-container">
        <Nav />
        <div className="links-container">
        {loging=="undefined"||undefined?<div>
          <Link href="/api/auth/login" className="log">
              Iniciar Sesion
          </Link> 
          <Link href="/signup" className="log">
              Registrarse
          </Link>
          </div>:
          <div>
          <Link onClick={handlelogout} href="/api/auth/logout" className="log">
              Desconectar
          </Link>
          </div>
          }
        </div>
      </div>
    </NavStyle>
  );
}