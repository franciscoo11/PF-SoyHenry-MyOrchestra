import * as fakeDB from "../utils/fakeDB";
import styled from "styled-components";
import HomeCards from "./HomeCards";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 90%;
  max-width: 1300px;
  display: flex;
  gap: 20px;

  section {
    width: 75%;

    .orquestas {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
    }
  }

  aside {
    width: 25%;
  }
`;

function HomeMainContent() {
  return (
    <>
      <StyledMain>
        <section>
          <h2>Orquestas</h2>
          <div className="orquestas">
            {fakeDB.Orquestas.map((orquesta, index) => (
              <HomeCards
                key={index}
                title={orquesta.name}
                subtitle={orquesta.orchestra_type}
                content={orquesta.description}
                image={orquesta.logo}
              />
            ))}
          </div>
        </section>
        <aside>Aside</aside>
      </StyledMain>
    </>
  );
}

export default HomeMainContent;
