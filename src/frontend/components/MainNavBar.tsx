import SearchBar from "./SearchBar";
import Link from "next/link";
import styled from "styled-components";

const logIcon =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668094650/kisspng-computer-icons-google-account-icon-design-login-5afc02dade3123.8372574215264652429101_shtgvv.png";
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

export default function MainNavBar() {
  return (
    <NavStyle>
      <nav>
        <Link href="/">Inicio</Link>

        <Link href="/orquestas">Orquestas </Link>

        <Link href="/news">Noticias </Link>

        <Link href="/events">Eventos </Link>

        <Link href="/media">Multimedia </Link>

        <Link href="/campaigns">Campañas </Link>

        <Link href="/about">Acerca de </Link>

        <Link href="/login" className="log">
          <img src={logIcon} alt="login" width="17px" height="17px" /> Iniciar
          Sesión
        </Link>

        <div>
          <SearchBar />
        </div>
      </nav>
    </NavStyle>
  );
}
