import SearchBar from "./SearchBar";
import Link from "next/link";
import styled from "styled-components";

const NavStyle = styled.header`
  width: 90%;
  max-width: 1300px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
    align-items: baseline;

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

export default function MainNavBar() {
  return (
    <NavStyle>
      <nav>
        <Link href="/">Inicio</Link>

        <Link href="/orquestas">Orquestas </Link>

        <Link href="/news">Noticias </Link>

        <Link href="/events">Eventos </Link>

        <Link href="/media">Multimedia </Link>

        <Link href="/campaign">Campañas </Link>

        <Link href="/about">Acerca de </Link>

        <div>
          <SearchBar />
        </div>
      </nav>
    </NavStyle>
  );
}
