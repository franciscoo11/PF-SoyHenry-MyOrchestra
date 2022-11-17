import Link from "next/link";
import styled from "styled-components";
import HomeCards from "./HomeCards";

export const StyledMain = styled.main`
  margin: 25px auto;
  width: 100%;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  padding: 0 80px;

  section {
    grid-column: 1/4;

    .more-btn {
      float: right;
      font-size: 0.7em;
      padding: 6px 12px;
      color: ${({ theme }) => theme.colors.secondary};
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 12px;
      :hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
      }
    }

    .orquestas {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }
  }

  aside {
    grid-column: 4/5;
    .temp-img {
      width: 100%;
    }
  }
`;

function HomeMainContent({ orchestra }: any) {
  const firstEntrys = () => {
    return orchestra.slice(0, 3);
  };

  return (
    <>
      <StyledMain>
        <section>
          <h2 className="section-title">
            Orquestas{" "}
            <span className="btn-container">
              <Link href={"/orchestra"} className="more-btn">
                Ver más
              </Link>
            </span>
          </h2>
          <div className="orquestas">
            {firstEntrys().map((orquesta: any, index: number) => (
              <HomeCards
                key={orquesta.id}
                id={orquesta.id}
                title={orquesta.name}
                subtitle={orquesta.location}
                content={orquesta.description.substr(0, 150)}
                image={orquesta.logo}
              />
            ))}
          </div>
        </section>
        <aside>
          <img
            className="temp-img"
            src="/aside_ref.png"
            alt="Campañas Solidarias"
          />
        </aside>
      </StyledMain>
    </>
  );
}

export default HomeMainContent;
