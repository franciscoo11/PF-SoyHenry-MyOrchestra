import SearchBar from "./SearchBar";
import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";

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

export default function OrchestasNavBar(props: any) {
  return (
    <NavStyle>
      <div className="nav-container">
        <Nav />
        <div className="links-container">
          <div>
            <Link href="/orchestras/create" className="log">
              Crear Orquesta
            </Link>
          </div>
          <div>
            <Link href="/signup" className="log">
              Registrarse
            </Link>
          </div>
          <div></div>
          <SearchBar
            setCurrentPage={props.setCurrentPage}
            data={props.data}
            setData={props.setData}
            search={props.search}
            setSearch={props.setSearch}
          />
        </div>
      </div>
    </NavStyle>
  );
}
