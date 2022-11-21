import styled from "styled-components";
import Nav from "./Nav";
import Auth from "./Auth";

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
  return (
    <NavStyle>
      <div className="nav-container">
        <Nav />
        <div className="links-container">
          <Auth />
        </div>
      </div>
    </NavStyle>
  );
}
