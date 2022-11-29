import Link from "next/link";
import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import styled from "styled-components";
import Cookies from "universal-cookie";
// import Banned from "./banned";

const StyledDiv = styled.div`
  .log {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export default function LoggedIn({ handlelogout }: any) {
  const cookie = new Cookies()
//   const data = cookie.get("UserloginData")
//   const isActive = data.is_active
//   const router = useRouter()
  
//  if(!isActive){
//   router.push("/bannedPage")
//  }
  return (
    <>
      <StyledDiv>
        <div>
          <Link href="/users/7" className="log">
            <span>Mi Perfil </span>
            <span>
              <FiUser />
            </span>
          </Link>
        </div>
      </StyledDiv>
      <div>
        <Link href={"/orchestras/create"}>Crear Orquesta</Link>
      </div>
      <div>
        <Link onClick={handlelogout} href="/api/auth/logout" className="log">
          Cerrar sesión
        </Link>
      </div>
    </>
  );
}

