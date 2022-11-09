import Head from "next/head";
import MainNavBar from "../../frontend/components/MainNavBar";
import * as fakeDB from "../../frontend/utils/fakeDB";
import HomeCards from "../../frontend/components/HomeCards";
import styled from "styled-components";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 90%;
  max-width: 1300px;
  display: flex;
  gap: 20px;

  section {
    width: 100%;
  }

  .filtros {
    margin: 15px 0;
    display: flex;
    justify-content: flex-end;
  }
  .campañas {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }
  .paginacion {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }
`;

const Campañas = () => {
  return (
    <>
      <Head>
        <title>
          Campañas benéficas para Orquestas Populares Latinoamericanas
        </title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        </style>
      </Head>
      <MainNavBar />
      <StyledMain>
        <section>
          <div className="filtros">
            <select name="orderBy" id="orderBy">
              <option value="Ordenar por:">Ordenar por:</option>
              <option value="Nombre">Nombre</option>
              <option value="Ciudad">Ciudad</option>
            </select>
          </div>
          <div className="campañas">
            {fakeDB.Campaigns.map((campaign, index) => (
              <HomeCards
                key={index}
                image={campaign.media}
                title={campaign.title}
                content={campaign.goal_amount}
              />
            ))}
          </div>
          <div className="paginacion">
            <button>Anterior</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>Siguiente</button>
          </div>
        </section>
      </StyledMain>
    </>
  );
};

export default Campañas;
