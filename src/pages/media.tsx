import Head from "next/head";
import MainNavBar from "../frontend/components/MainNavBar";
import HomeCards from "../frontend/components/HomeCards";
import styled from "styled-components";
import axios from "axios";
import Footer from "../frontend/components/Footer";
import { HOSTNAME } from "./_app";

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

const Media = ({ post }: any) => {
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
              <option value="Ordenar por:">Ordenar por</option>
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
            </select>
          </div>
          <div className="campañas">
            {post.map((post: any, index: number) => (
              <HomeCards
                key={index}
                image={post.url_file}
                title={post.title}
                content={post.content}
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
};

export default Media;

export const getServerSideProps = async () => {
  const res = await axios.get(`${HOSTNAME}/api/post`);
  const post = await res.data;

  return {
    props: {
      post,
    },
  };
};
