import Link from "next/link";
import styled from "styled-components";

const StyledNav = styled.nav`
  width: 90%;
  margin: 0 auto;
  max-width: 1440px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 12px;
  position: sticky;
  top: 0;

  .container {
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 1.5em;
    }

    .links {
      display: flex;
      gap: 24px;
    }
  }
`;

export default function NavAdmin(propr: any) {
  return (
    <StyledNav>
      <div className="container">
        <div className="title">Dashboad</div>
        <div className="links">
          <div className="link-container">
            <Link href="/admin/">Orquestas</Link>
          </div>
          <div className="link-container">
            <Link href="/admin/users">Usuarios </Link>
          </div>
          <div className="link-container">
            <Link href="/admin/donations">Donaciones </Link>
          </div>
        </div>
      </div>
    </StyledNav>
  );
}
