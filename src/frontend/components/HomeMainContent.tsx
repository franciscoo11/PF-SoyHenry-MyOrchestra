import styled from "styled-components";
import HomeCards from "./HomeCards";

export const StyledMain = styled.main`
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

function HomeMainContent({ orchestra }: any) {
  return (
    <>
      <StyledMain>
        <section>
          <h2>Orquestas</h2>
          <div className="orquestas">
            {orchestra.map((orquesta: any, index: number) => (
              <HomeCards
                key={index}
                title={orquesta.name}
                subtitle={orquesta.location}
                content={orquesta.description.substr(0, 150)}
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
