import Link from "next/link";
import { FiUser } from "react-icons/fi";
import styled from "styled-components";

const StyledDiv = styled.div`
  .log {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export default function LoggedIn({ handlelogout }: any) {
  return (
    <>
      <StyledDiv>
        <div>
          <Link href="#" className="log">
            <span>Mi Perfil </span>
            <span>
              <FiUser />
            </span>
          </Link>
        </div>
      </StyledDiv>
      <div>
        <Link onClick={handlelogout} href="/api/auth/logout" className="log">
          Cerrar sesión
        </Link>
      </div>
    </>
  );
}
