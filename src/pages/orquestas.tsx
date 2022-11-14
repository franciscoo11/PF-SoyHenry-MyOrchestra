import Head from "next/head";
import MainNavBar from "../frontend/components/MainNavBar";
import HomeCards from "../frontend/components/HomeCards";
import styled from "styled-components";
import axios from "axios";
import Footer from "../frontend/components/Footer";

const StyledMain = styled.main`
  margin: 25px auto;
  width: 90%;
  max-width: 1300px;
  display: flex;
  gap: 20px;

  section {
    width: 100%;

    .filtros {
      margin: 15px 0;
      display: flex;
      justify-content: flex-end;
    }

    .orquestas {
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
  }
`;

export default function Orquestas({ orchestra }: any) {
  return (
    <>
      <Head>
        <title>Listado de Orquestas Populares de Música Latinoamericana</title>
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
          <div className="orquestas">
            {orchestra.map((orquesta: any, index: number) => (
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
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/orchestra");
  const orchestra = await res.data;

  return {
    props: {
      orchestra,
    },
  };
};
