import SearchBar from "./SearchBar";
import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";

const logIcon =
  "https://res.cloudinary.com/dzup1ckpy/image/upload/v1668357018/empleado_ytyb9t.png";
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
        <div>
          <Link href="/orchestra/create" className="log">
            <img src={logIcon} alt="login" width="18px" height="18px" /> Crear
            Orquesta
          </Link>
        </div>

        <div>
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
