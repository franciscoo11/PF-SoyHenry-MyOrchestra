import { useRouter } from "next/router";
import Cover from "../../frontend/components/Cover";
import MainNavBar from "../../frontend/components/MainNavBar";
import { Orquestas, Posts } from "../../frontend/utils/fakeDB";
import styled from "styled-components";
import { StyledMain } from "../../frontend/components/HomeMainContent";
import OrchestraPosts from "../../frontend/components/OrchestraPosts";

const StyledNav = styled.nav`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto 100px;
  position: relative;

  .nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    position: absolute;
    left: 280px;
    font-size: 1.2em;
    top: 20px;
    gap: 20px;

    .nav-item {
      background-color: lightgray;
      padding: 5px 15px;
      border-radius: 10px;
    }
  }
`;

function OrchestraDetails(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainNavBar />
      <Cover
        cover={Orquestas[0].cover}
        title={Orquestas[0].name}
        pic={Orquestas[0].logo}
      />
      <StyledNav>
        <ul className="nav">
          <li className="nav-item">Inicio</li>
          <li className="nav-item">Información</li>
          <li className="nav-item">Noticias</li>
          <li className="nav-item">Multimedia</li>
          <li className="nav-item">Fotos</li>
        </ul>
      </StyledNav>
      <StyledMain>
        <section>
          <OrchestraPosts posts={Posts[0]} />
        </section>
        <aside>Aside</aside>
      </StyledMain>
    </>
  );
}

export default OrchestraDetails;
